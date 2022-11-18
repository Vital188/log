import { useContext } from 'react';
import Movies from '../../Contexts/Movies';

function Line({ movie }) {

    const { setDeleteData, setModalData} = useContext(Movies);

    return (
        <li className="list-group-item" >
            <div className="line">
                <div className="line__content" style={{
                alignItems: 'center'
                }}>
                    <div className="line__content__info" style={{
                        alignItems: 'center',
                        
                        
                    }}>
                        {movie.image ? <div className='img-bin'>
                            <img src={movie.image} alt={movie.title}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div> 
                    <div className="line__content__title">
                    Name:    {movie.title}
                    </div>
                    <div className="line__content__info">
                    Weight:    {movie.price}
                    </div>
                    <div className="line__content__info">
                    Save:    {movie.tim}
                    </div>
                    <div className="line__content__info">
                     Shelf Life:   {movie.sav}
                    </div>
                    <div className="line__content__info">
                    Container:    {movie.cid}
                    </div>
                    
                     </div>
                <div className="line__buttons" style={{
                    flexDirection: 'column',
                    alignItems: 'stretch'
                }}>
                    <button onClick={() => setModalData(movie)} type="button" className="btn btn-outline-success" style={{
                            marginBottom: '10px'
                    }}>Edit</button>
                    <button onClick={() => setDeleteData(movie)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;