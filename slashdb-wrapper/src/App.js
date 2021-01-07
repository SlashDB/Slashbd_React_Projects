import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { slashDB } from './slashdb';
import { useDataDiscovery } from './hooks';

function App() {
  // const [dataQuery, setDataQuery] = useState([]);
  // const [dataDiscovery, setDataDiscovery] = useState([]);

  const isMountedRef = useRef(null);

  // function getDataQuery() {
  //   return slashDB
  //     .executeQuery('get', 'customers-in-city', { city: 'London' })
  //     .then((data) => setDataQuery(data));
  // }

  // function getDataDataDiscovery() {
  //   return slashDB
  //     .dataDiscovery('get', 'Chinook', ['Artist', 'Name', 'A*'], {
  //       href: false,
  //     })
  //     .then((data) => setDataDiscovery(data));
  // }
  const [dataUseDD, getDataUseDD, postDataUseDD] = useDataDiscovery('Chinook', [
    'Artist',
    'Name',
  ]);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      // getDataQuery();
      // getDataDataDiscovery();
      getDataUseDD(['Artist', 'Name', 'A*'], {
        href: false,
      });
    }
    return () => (isMountedRef.current = false);
  }, []);

  // console.log('dataQuery');
  // console.log(dataQuery);
  // console.log('dataDiscovery');
  // console.log(dataDiscovery);
  console.log('dataUseDD');
  console.log(dataUseDD);

  const [name, setName] = useState('');
  return (
    <div className="App">
      <h1>Slashdb-Wrapper</h1>
      {/* <h2>SQL Pass-thru - Query Execute</h2>
      {dataQuery.map((item) => (
        <p key={item.FirstName}>{item.FirstName}</p>
      ))}
      <h2>Data Discovery</h2>
      {dataDiscovery.map((item) => (
        <p key={item.ArtistId}>{item.Name}</p>
      ))} */}
      <h2>Data Discovery useHook</h2>
      {dataUseDD.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
      <input
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button
        onClick={() => {
          console.log(name);
          postDataUseDD(['Artist'], { Name: name });
          setName('');
        }}
      >
        POST
      </button>
    </div>
  );
}

export default App;
