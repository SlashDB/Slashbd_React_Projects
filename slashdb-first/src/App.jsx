import React, { useState, useEffect } from 'react';
import Datatable from './datatable';


require('es6-promise').polyfill();
require('isomorphic-fetch');


export default function App() {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [searchColumns, setSearchColumns] = useState(['FirstName', 'LastName']);


  useEffect(() => {
    const url = 'https://beta.slashdb.com/db/Chinook/Customer.json';
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

  const container = {
    padding: '2rem',
    textAlign: 'center',
  };

  function search(rows) {
    return rows.filter((row) =>
      searchColumns.some((column) =>
        row[column] != null
          ? row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          : null
      )
    );
  }

  const styleLabelAndBox = {
    margin: '5px',
    padding: '2px',
    textAlign: 'center',
  };
  const columns = data[0] && Object.keys(data[0]);
  return (
    <div style={container}>
      <h1>SlashDb</h1>
      <h3>Simple React app for accessing data from SlashDb end point.</h3>
      <p>
        We will make an API call to the demo database and perform basic query.
        <br />
        url of dataset: https://beta.slashdb.com/db/Chinook/Customer.json
      </p>
      <div>
        <label htmlFor="search">Search:</label>
        <input
          name="search"
          type="text"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ margin: '20px' }}
        ></input>
        {columns &&
          columns.map((column, index) =>
            index > 1 && index < 15 ? (
              <label style={styleLabelAndBox} key={index}>
                <input
                  style={styleLabelAndBox}
                  type="checkbox"
                  checked={searchColumns.includes(column)}
                  onChange={(e) => {
                    const checked = searchColumns.includes(column);
                    setSearchColumns((old) =>
                      checked
                        ? old.filter(
                            (searchColumns) => searchColumns !== column
                          )
                        : [...old, column]
                    );
                  }}
                ></input>
                {column}
              </label>
            ) : null
          )}
      </div>
      <div>
        <Datatable data={search(data)}></Datatable>
      </div>
    </div>
  );
}
