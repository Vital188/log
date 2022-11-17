import { useContext, useEffect, useState, useRef } from 'react';
import Movies from '../../Contexts/Movies';
import getBase64 from '../../Functions/getBase64';

function Edit() {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [cat, setCat] = useState(0);
    const fileInput = useRef();
    const [photoPrint, setPhotoPrint] = useState(null);
    const [deletePhoto, setDeletePhoto] = useState(false);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint(photo))
            .catch(_ => {
                // tylim
            })
    }

    const { setEditData, cats, modalData, setModalData } = useContext(Movies);

    const edit = () => {
        setEditData({
            title,
            price: parseFloat(price),
            cat_id: parseInt(cat),
            id: modalData.id,
            deletePhoto: deletePhoto ? 1 : 0,
            image: photoPrint
        });
        setModalData(null);
        setDeletePhoto(false);
    }

    useEffect(() => {
        if (null === modalData) {
            return;
        }
        setTitle(modalData.title);
        setPrice(modalData.price);
        setCat(modalData.cat_id);
        setPhotoPrint(modalData.image);
        setDeletePhoto(false);
    }, [modalData])

    if (null === modalData) {
        return null;
    }

    return (

        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Movie</h5>
                        <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="card m-4">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Movie Title</label>
                                <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Movie Price</label>
                                <input type="text" className="form-control" value={price} onChange={e => setPrice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Cats</label>
                                <select className="form-select" value={cat} onChange={e => setCat(e.target.value)}>
                                    <option value={0} disabled>Choose from list</option>
                                    {
                                        cats?.map(c => <option key={c.id} value={c.id}>{c.title}</option>)
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Movie Image</label>
                                <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                            </div>
                            {photoPrint ? <div className='img-bin'>
                                <label htmlFor="image-delete">X</label>
                                <input id="image-delete" type="checkbox" checked={deletePhoto} onChange={() => setDeletePhoto(d => !d)}></input>
                                <img src={photoPrint} alt="upload"></img>
                            </div> : null}
                            <button onClick={edit} type="button" className="btn btn-outline-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;