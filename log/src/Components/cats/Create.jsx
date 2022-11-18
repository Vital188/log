import { useState, useContext } from 'react';
import Cats from '../../Contexts/Cats';
import Containers from '../Data/Conteiners';
import rand from "../../Functions/rand";
import Box from '../Data/Box';

function Create() {

    const [titl, setTitl] = useState(0);
    const { setCreateData, movies } = useContext(Cats);
    const [movie, setMovie] = useState(0);
    const [movie2, setMovie2] = useState(0);
    const [movie3, setMovie3] = useState(0);
    const [movie4, setMovie4] = useState(0);
    const [movie5, setMovie5] = useState(0);
    const [movie6, setMovie6] = useState(0);
    const [box, setBox] = useState(0);
    const [numbers, setNumbers] = useState ('')

console.log(movies)

    const add = () => {
        setCreateData({
            titl,
            numbers: rand(100, 999),
            box,
            movie_id: parseInt(movie),
            movie_id2: parseInt(movie2),
            movie_id3: parseInt(movie3),
            movie_id4: parseInt(movie4),
            movie_id5: parseInt(movie5),
            movie_id6: parseInt(movie6),
        });
        setTitl(0);
        setNumbers('');
        setBox(0)
        setMovie(0);
        setMovie2(0);
        setMovie3(0);
        setMovie4(0);
        setMovie5(0);
        setMovie6(0);
    }

    return (
        <div className="card m-4">
            <h5 className="card-header">Container List</h5>
            <div className="card-body">
                        <label className="form-label">Container size</label>
                <div className="mb-3">
                <select
          className="form-select mb-4"
          value={titl}
          onChange={(e) => setTitl(e.target.value)}
          aria-label="Default select example"
        >
          <option value={0} disabled>
            Choose size from list:
          </option>
          {Containers?.map((cl) => (
            <option key={cl.id} value={cl.type}>
            {cl.type}
            </option>
          ))}
        </select>
        <div className="mb-3">
                <select
          className="form-select mb-4"
          value={box}
          onChange={(e) => setBox(e.target.value)}
          aria-label="Default select example"
        >
          <option value={0} disabled>
            Choose box number:
          </option>
          {Box?.map((b) => (
            <option key={b.id} value={b.nm}>
            {b.nm}
            </option>
          ))}
        </select>
                </div> 
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
            </div>
        </div>
    );
}

export default Create;