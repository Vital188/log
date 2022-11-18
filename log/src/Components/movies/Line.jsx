import { useContext } from 'react';
import Movies from '../../Contexts/Movies';

function Line({ movie }) {

    const { setDeleteData, setModalData} = useContext(Movies);

    return (
        <li className="list-group-item">
            <div className="line">
                <div className="line__content">
                    <div className="line__content__info">
                        {movie.image ? <div className='img-bin'>
                            <img src={movie.image} alt={movie.title}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                        {movie.title}
                    </div>
                    <div className="line__content__info">
                        {movie.price}
                    </div>
                    <div className="line__content__info">
                        {movie.tim}
                    </div>
                    <div className="line__content__info">
                        {movie.sav}
                    </div>
                    <div className="line__content__info">
                        {movie.cid}
                    </div>
                    
                     </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(movie)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(movie)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;