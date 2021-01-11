import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { slashDB } from './slashdb';
import { useDataDiscovery } from './hooks';

function App() {
  const isMountedRef = useRef(null);
  const [dataUseDD, getDataUseDD, postDataUseDD] = useDataDiscovery('Chinook', [
    'Artist',
    'Name',
    'A*',
  ]);

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      getDataUseDD(['Artist', 'Name', 'A*'], {
        href: false,
      });
    }
    return () => (isMountedRef.current = false);
  }, []);

  console.log('dataUseDD');
  console.log(dataUseDD);

  const [name, setName] = useState('');
  return (
    <div className="App">
      <h1>Slashdb-Wrapper</h1>
      <h2>Data Discovery useHook</h2>
      {dataUseDD.map((item, index) => (
        <p key={index}>{item.Name}</p>
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
