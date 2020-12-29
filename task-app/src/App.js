import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Lists from './components/Lists';
import NewListArea from './components/NewListArea';
import { fetchWrapper } from './slashDBwrapper';

function App() {
  const [lists, setLists] = useState(null);

  fetchWrapper.setUp(`http://localhost:8000/db/`, 'taskdatadb');

  function getLists() {
    return fetchWrapper
      .get('/TaskList.json?href=false')
      .then((data) => setLists(data));
  }

  useEffect(() => {
    getLists();
  }, []);

  return (
    <div>
      <Header />
      <NewListArea getLists={getLists} />
      {lists && <Lists lists={lists} getLists={getLists} />}
    </div>
  );
}

export default App;
