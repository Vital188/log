import { useState, useContext } from 'react';
import Cats from '../../Contexts/Cats';
import Containers from '../Data/Conteiners';

function Create() {

    const [titl, setTitl] = useState(0);
    const { setCreateData, movies } = useContext(Cats);
    const [movie, setMovie] = useState(0);
    const [movie2, setMovie2] = useState(0);
    const [movie3, setMovie3] = useState(0);
    const [movie4, setMovie4] = useState(0);
    const [movie5, setMovie5] = useState(0);
    const [movie6, setMovie6] = useState(0);

console.log(movies)

    const add = () => {
        setCreateData({
            titl,
            movie_id: parseInt(movie),
            movie_id2: parseInt(movie2),
            movie_id3: parseInt(movie3),
            movie_id4: parseInt(movie4),
            movie_id5: parseInt(movie5),
            movie_id6: parseInt(movie6),
        });
        setTitl(0);
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

       {titl === 'M' ? 
        <div className="mb-3">
                    <label className="form-label">Box 1</label>
                    <select className="form-select" value={movie} onChange={e => setMovie(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                
                    <label className="form-label">Box 2</label>
                    <select className="form-select" value={movie2} onChange={e => setMovie2(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                    <label className="form-label">Box 3</label>
                    <select className="form-select" value={movie3} onChange={e => setMovie3(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                    <label className="form-label">Box 4</label>
                    <select className="form-select" value={movie4} onChange={e => setMovie4(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                </div>  : null}

                {titl === 'S' ? 
        <div className="mb-3">
                    <label className="form-label">Box 1</label>
                    <select className="form-select" value={movie} onChange={e => setMovie(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                
                    <label className="form-label">Box 2</label>
                    <select className="form-select" value={movie2} onChange={e => setMovie2(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                </div>  : null}

                {titl === 'L' ? 
        <div className="mb-3">
                    <label className="form-label">Box 1</label>
                    <select className="form-select" value={movie} onChange={e => setMovie(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                
                    <label className="form-label">Box 2</label>
                    <select className="form-select" value={movie2} onChange={e => setMovie2(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                    <label className="form-label">Box 3</label>
                    <select className="form-select" value={movie3} onChange={e => setMovie3(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                    <label className="form-label">Box 4</label>
                    <select className="form-select" value={movie4} onChange={e => setMovie4(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>

                    <label className="form-label">Box 5</label>
                    <select className="form-select" value={movie5} onChange={e => setMovie5(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                    <label className="form-label">Box 6</label>
                    <select className="form-select" value={movie6} onChange={e => setMovie6(e.target.value)}>
                        <option value={0} disabled>Choose from list</option>
                        {
                            movies?.map(m => <option key={m.id} value={m.id}>{m.title}</option>)
                        }
                    </select>
                </div>  : null}
                </div> 
                <button onClick={add} type="button" className="btn btn-outline-success">Add</button>
            </div>
        </div>
    );
}

export default Create;