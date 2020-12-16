import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

import Datatable from './datatable';

require('es6-promise').polyfill();
require('isomorphic-fetch');

export default function App() {
  const [datasets, setDatasets] = useState([]);
  const [data, setData] = useState([]);
  const [addon, setAddon] = useState('');
  const baseUrl = `https://beta.slashdb.com/db`;
  const baseUrlend = `.json?href=false`;
  const [baseDatabase, setBaseDatabase] = useState('');

  useEffect(() => {
    const url = baseUrl + baseUrlend;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDatasets(json));
  }, []);

  const fetchRequestBase = useCallback(() => {
    const url = baseUrl + `/${baseDatabase}` + baseUrlend;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setDatasets(json));
  }, [baseDatabase]);

  const fetchRequest = useCallback(() => {
    const url = baseUrl + `/${addon}` + baseUrlend;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json));
    console.log(data);
  }, [addon]);

  const dataSetOptions = datasets.Chinook && Object.keys(datasets.Chinook);

  return (
    <div>
      <div className="top">
        <div>
          <label>
            Enter name of data set
            <br />
            <input
              name="baseDatabase"
              onChange={(e) => {
                setBaseDatabase(e.target.value);
              }}
            ></input>
            <button className="right" onClick={fetchRequestBase}>
              Select base database
            </button>
          </label>
        </div>
        <div>
          {datasets.Chinook &&
            dataSetOptions.map(
              (option, index) =>
                option !== '__href' && (
                  <label key={index} className="dataSets">
                    <input
                      name="dataset"
                      value={option}
                      type="radio"
                      onChange={(e) => {
                        setAddon(e.target.value);
                      }}
                    />
                    {option}
                  </label>
                )
            )}
        </div>
        <button className="right" onClick={fetchRequest}>
          Select data set
        </button>
      </div>
      <div>
        <Datatable data={data}></Datatable>
      </div>
    </div>
  );
}
