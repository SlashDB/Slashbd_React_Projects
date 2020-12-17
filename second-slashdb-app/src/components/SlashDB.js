import React, { useState, useEffect, useCallback } from 'react';
import './SlashDB.css';
import Datatable from '../datatable';
require('es6-promise').polyfill();
require('isomorphic-fetch');

export default function SlashDB(props) {
  const [base, setBase] = useState([]);
  const [addon, setAddon] = useState('');

  const [levelOne, setLevelOne] = useState([]);
  const [levelOneAddon, setLevelOneAddon] = useState('');

  const [levelTwo, setLevelTwo] = useState([]);

  const baseUrl = `https://beta.slashdb.com/db`;
  const urlEnd = `.json?href=false`;

  const [showB, setShowB] = useState(false);

  useEffect(() => {
    const url = baseUrl + urlEnd;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setBase(json));
  }, []);

  const baseDataOptions = base[0] && Object.keys(base[0]);

  const fetchRequestLevelOne = useCallback(() => {
    const url = baseUrl + `/${addon}` + urlEnd;
    // const url = 'https://beta.slashdb.com/db/Chinook.json?href=false';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setLevelOne(json));
    console.log(levelOne);
    setShowB(true);
  }, [addon]);

  const levelOneOptions = levelOne[addon] && Object.keys(levelOne[addon]);

  const fetchRequestLevelTwo = useCallback(() => {
    const url = baseUrl + `/${addon}` + `/${levelOneAddon}` + urlEnd;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setLevelTwo(json));
  }, [levelOneAddon]);

  return (
    <div className="app">
      <h1>SlashDB</h1>
      <div>
        <h2>Base data sets</h2>
        <Datatable data={base}></Datatable>
      </div>
      <div className="wrapper">
        {base.map((row, index) =>
          baseDataOptions.map(
            (dataSetOption, index) =>
              dataSetOption === 'db_id' && (
                <label key={index}>
                  <input
                    name="datasets"
                    value={row[dataSetOption]}
                    type="radio"
                    onChange={(e) => {
                      setAddon(e.target.value);
                      setShowB(false);
                      setLevelTwo([]);
                    }}
                  />
                  {row[dataSetOption]}
                </label>
              )
          )
        )}
        <button className="right" onClick={fetchRequestLevelOne}>
          Select base database
        </button>
      </div>
      <div className="sectionWrapper">
        <h2>Level one data sets</h2>
        {levelOne.hasOwnProperty(addon) &&
          levelOneOptions.map(
            (levelOneOption, index) =>
              levelOneOption !== '__href' && (
                <label key={index}>
                  <input
                    name="datasets"
                    value={levelOneOption}
                    type="radio"
                    onChange={(e) => {
                      setLevelOneAddon(e.target.value);
                    }}
                  />
                  {levelOneOption}
                </label>
              )
          )}
        {showB ? (
          <>
            <button className="right" onClick={fetchRequestLevelTwo}>
              Select base database
            </button>
            <div>
              <label>
                Serach: <input type="text"></input>
              </label>
              <button>Serach</button>
            </div>
          </>
        ) : null}
      </div>
      <Datatable data={levelTwo}></Datatable>
    </div>
  );
}
