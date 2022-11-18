import { useContext } from 'react';
import Home from '../../Contexts/Home';

import { useState } from "react";

function Line({ movie }) {

    const { setRateData, setMovies, filterOn, filterWhat } = useContext(Home);

    const [rate, setRate] = useState(5);

    const doRating = () => {
        setRateData({
            id: movie.id,
            rate
        });
        setRate(5);
    }

    const filter = () => {
        if (filterOn.current) {
            setMovies(m => m.map(mo => ({ ...mo, show: true })));
            filterWhat.current = null;
        } else {
            setMovies(m => m.map(mo => mo.cat_id === movie.cat_id ? { ...mo, show: true } : { ...mo, show: false }));
            filterWhat.current = movie.cat_id;
        }
        filterOn.current = !filterOn.current;
    }

    return (
        <li className="list-group-item">
            <div className="home">
                <div className="home__content">
                    <div className="home__content__info">
                        <h1>Container Nr. {movie[1][0].cats_id}</h1>
                        <h2>Size: {movie[1][0].titl}</h2> 
                        <h3>Boxes:{movie[1][0].box}</h3>
                    </div>
                    <div className="home__content__price">
                       
                    </div>

                    <ul className="list-group">
                    {
                        movie[1]?.map(c => c.cat_id !== null ? <li key={c.cid} className="list-group-item"><h2>{c.title}</h2><div>{c.image}{c.price}{c.tim}</div></li> : null)
                    }
                </ul>

                    
                    
                    
                </div>
            </div>
        </li>
    )
}

export default Line;