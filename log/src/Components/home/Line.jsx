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
                        <h1> {movie.cats_id}</h1>
                        <h2>{movie.title}</h2>
                        {movie.image ? <div className='img-bin'>
                            <img src={movie.image} alt={movie.title}>
                            </img>
                        </div> : null}
                    </div>
                    <div className="home__content__price">
                        {movie.price} Eur
                    </div>

                    

                    
                    
                    
                </div>
            </div>
        </li>
    )
}

export default Line;