import { useContext } from 'react';
import Cats from '../../Contexts/Cats';

function Line({ cat}) {
    
    const { setDeleteData, setModalData, movies } = useContext(Cats);
console.log(movies)
    return (
        <li className="list-group-item">
            <div className="line">
                <div className="line__content">
                    <div className="line__content__title">
                        Container size {cat.titl}
                    </div>
                    
                       <div className="line__content__title">Number: {cat.numbers}</div>
                   
                    <div className="line__content__title"> Box:
                    {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}{m.image}{m.price}{m.tim}{m.sav}</option>)
                        }
                    </div>
                    <div className="line__content__title"> Box:
                    {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}{m.image}{m.price}{m.tim}{m.sav}</option>)
                        }
                    </div>
                </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(cat)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(cat)} type="button" className="btn btn-outline-danger">Delete</button> 
                </div>
            </div>
        </li>
    )
}

export default Line;