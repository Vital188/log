import Home from "../../Contexts/Home";
import List from "./List";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRef } from "react";
import { authConfig } from '../../Functions/auth';

function Main() {

        const [lastUpdate, setLastUpdate] = useState(Date.now());
        const [movies, setMovies] = useState(null);
        const [rateData, setRateData] = useState(null);
        const filterOn = useRef(false);
        const filterWhat = useRef(null);

        const reList = data => {
            const d = new Map();
            data.forEach(line => {
                if (d.has(line.cid)) {
                    d.set(line.cid, [...d.get(line.cid), line]);
                } else {
                    d.set(line.cid, [line]);
                }
            });
            return [...d];
        }
        // READ for list
        useEffect(() => {
            axios.get('http://localhost:3003/server/movies', authConfig())
            .then(res => {
                setMovies(reList(res.data));
            })
    }, [lastUpdate]);

console.log(movies)
        useEffect(() => {
            if (null === rateData) {
                return;
            }
            axios.put('http://localhost:3003/server/movies/' + rateData.id, rateData, authConfig())
            .then(res => {
                setLastUpdate(Date.now());
            });
        }, [rateData]);

      return (
        <Home.Provider value={{
            movies,
            setRateData,
            setMovies,
            filterOn,
            filterWhat
        }}>
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <List/>
                </div>
            </div>
        </div>
        </Home.Provider>
    );
}

export default Main;