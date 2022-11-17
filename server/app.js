const express = require("express");
const app = express();
const port = 3003;
app.use(express.json({ limit: '10mb' }));
const cors = require("cors");
app.use(cors());
const md5 = require('js-md5');
const uuid = require('uuid');
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "log",
});

////////////////////LOGIN/////////////////

const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/server')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 10) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
        next();
    } else { // fron
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    }
}

app.use(doAuth);

// AUTH
app.get("/login-check", (req, res) => {
    const sql = `
         SELECT
         name, role
         FROM users
         WHERE session = ?
        `;
    con.query(sql, [req.headers['authorization'] || ''], (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error', status: 1 }); // user not logged
        } else {
            if ('admin' === req.query.role) {
                if (result[0].role !== 10) {
                    res.send({ msg: 'error', status: 2 }); // not an admin
                } else {
                    res.send({ msg: 'ok', status: 3 }); // is admin
                }
            } else {
                res.send({ msg: 'ok', status: 4 }); // is user
            }
        }
    });
});

app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND psw = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key });
        }
    });
});

///////////////////END////////////////////

//CREATE
app.post("/server/cats", (req, res) => {
    const sql = `
    INSERT INTO cats (titl, movie_id)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.titl, req.body.movie_id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.post("/server/movies", (req, res) => {
    const sql = `
    INSERT INTO movies (title, price, tim, sav, image)
    VALUES (?, ?, ?, ?, ?)
    `;
    con.query(sql, [req.body.title, req.body.price, req.body.tim, req.body.sav, req.body.image,], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// READ (all)
app.get("/server/cats", (req, res) => {
    const sql = `
    SELECT c.*, m.id AS mid, m.title
    FROM cats AS c
    INNER JOIN movies AS m
    ON c.movie_id = m.id
    ORDER BY c.titl
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
// READ (all)
app.get("/server/movies", (req, res) => {
    const sql = `
    SELECT *
    FROM movies
    ORDER BY id DESC
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/home/movies", (req, res) => {
    const sql = `
    SELECT m.*, c.titl AS catTitl, c.id AS cid
    FROM movies AS m
    INNER JOIN cats AS c
    ON m.cat_id = c.id
    ORDER BY m.title
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


//DELETE
app.delete("/server/cats/:id", (req, res) => {
    const sql = `
    DELETE FROM cats
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.delete("/server/movies/:id", (req, res) => {
    const sql = `
    DELETE FROM movies
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


//EDIT
app.put("/server/cats/:id", (req, res) => {
    const sql = `
    UPDATE cats
    SET title = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.title, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.put("/home/movies/:id", (req, res) => {
    const sql = `
    UPDATE movies
    SET 
    rating_sum = rating_sum + ?, 
    rating_count = rating_count + 1, 
    rating = rating_sum / rating_count
    WHERE id = ?
    `;
    con.query(sql, [req.body.rate, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.put("/server/movies/:id", (req, res) => {
    let sql;
    let r;
    if (req.body.deletePhoto) {
        sql = `
        UPDATE movies
        SET title = ?, price = ?, cat_id = ?, image = null
        WHERE id = ?
        `;
        r = [req.body.title, req.body.price, req.body.cat_id, req.params.id];
    } else if (req.body.image) {
        sql = `
        UPDATE movies
        SET title = ?, price = ?, cat_id = ?, image = ?
        WHERE id = ?
        `;
        r = [req.body.title, req.body.price, req.body.cat_id, req.body.image, req.params.id];
    } else {
        sql = `
        UPDATE movies
        SET title = ?, price = ?, cat_id = ?
        WHERE id = ?
        `;
        r = [req.body.title, req.body.price, req.body.cat_id, req.params.id]
    }
    con.query(sql, r, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(port, () => {
    console.log(`Filmus rodo per ${port} portą!`)
});






// // READ
// // SELECT column1, column2, ...
// // FROM table_name;

// // app.get("/trees/:tipas", (req, res) => {

// //     // console.log(req.query.sort);

// //     const sql = `
// //     SELECT id, type, title, height
// //     FROM trees
// //     WHERE type = ? OR type = ?
// //     `;
// //     con.query(sql, [req.params.tipas, req.query.sort], (err, result) => {
// //         if (err) throw err;
// //         res.send(result);
// //     });
// // });

// // INNER JOIN
// // SELECT column_name(s)
// // FROM table1
// // INNER JOIN table2
// // ON table1.column_name = table2.column_name;
// app.get("/get-it/inner-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     INNER JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/left-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     LEFT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/right-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     RIGHT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });





// // READ (all)
// app.get("/trees", (req, res) => {
//     const sql = `
//     SELECT id, type, title, height
//     FROM trees
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// //CREATE
// // INSERT INTO table_name (column1, column2, column3, ...)
// // VALUES (value1, value2, value3, ...);
// app.post("/trees", (req, res) => {
//     const sql = `
//     INSERT INTO trees (title, height, type)
//     VALUES (?, ?, ?)
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //DELETE
// // DELETE FROM table_name WHERE condition;
// app.delete("/trees/:id", (req, res) => {
//     const sql = `
//     DELETE FROM trees
//     WHERE id = ?
//     `;
//     con.query(sql, [req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //EDIT
// // UPDATE table_name
// // SET column1 = value1, column2 = value2, ...
// // WHERE condition;
// app.put("/trees/:id", (req, res) => {
//     const sql = `
//     UPDATE trees
//     SET title = ?, height = ?, type = ?
//     WHERE id = ?
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type, req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });