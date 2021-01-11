import React from 'react';
import './App.css';
import Header from './components/Header';
import Lists from './components/Lists';
import NewListArea from './components/NewListArea';
import { useDataDiscovery } from './hooks';

function App() {
  const [
    lists,
    getList,
    postList,
    putList,
    deleteList,
  ] = useDataDiscovery('taskdatadb', ['TaskList']);

  return (
    <div>
      <Header />
      <NewListArea postLists={postList} getLists={getList} />
      {lists && (
        <Lists
          lists={lists}
          getList={getList}
          putList={putList}
          deleteList={deleteList}
        />
      )}
    </div>
  );
}

export default App;
