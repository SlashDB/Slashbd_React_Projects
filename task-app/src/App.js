import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Lists from './components/Lists';
import NewListArea from './components/NewListArea';
import { fetchWrapper } from './slashDBwrapper';
import { useQuery } from './slashDBwrapper';

function App() {
  const [lists, setLists] = useState(null);

  fetchWrapper.setUp(`http://localhost:8000/db`, '/taskdatadb', `json`);

  function getLists() {
    return fetchWrapper.get('/TaskList').then((data) => setLists(data));
  }

  useEffect(() => {
    getLists();
  }, []);

  // const [a, setA] = useState(null);

  // function getA() {

  //   return fetchWrapper
  //     .query(['TaskList', 'TaskListId', '1'], 'get')
  //     .then((data) => setA(data));

  // }

  // a && console.log(a);

  const b = useQuery(['TaskList'], `get`);
  b && console.log(b);

  // useEffect(() => {
  //   getA();
  // }, []);

  return (
    <div>
      <Header />
      <NewListArea getLists={getLists} />
      {lists && <Lists lists={lists} getLists={getLists} />}
    </div>
  );
}

export default App;
