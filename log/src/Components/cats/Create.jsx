import { useState, useContext } from 'react';
import Cats from '../../Contexts/Cats';
import Containers from '../Data/Conteiners';

function Create() {

    const [titl, setTitl] = useState(0);
    const { setCreateData, movies } = useContext(Cats);
    const [movie, setMovie] = useState(0);
    const [type, setType] = useState('0');


    const add = () => {
        setCreateData({
            titl,
            movie_id: parseInt(movie),
        });
        setTitl(0);
        setMovie(0);
    }

    return (
        <div className="card m-4">
            <h5 className="card-header">Container List</h5>
            <div className="card-body">
                <div className="mb-3">
                <select
          className="form-select mb-4"
          value={titl}
          onChange={(e) => setTitl(e.target.value)}
          aria-label="Default select example"
        >
          <option value={0} disabled>
            Choose container from list:
          </option>
          {Containers?.map((cl) => (
            <option key={cl.id} value={cl.type}>
            {cl.type}
            </option>
          ))}
        </select>
        <div className="mb-3">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={movie} onChange={e => setMovie(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                </div>
                </div>
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>
    );
}

export default Create;