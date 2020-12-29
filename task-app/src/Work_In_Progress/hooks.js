// hooks.js
import { useState, useEffect } from 'react';

function useSlashDB(url) {
  const baseUrl = `http://localhost:8000/db/taskdatadb/`;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchUrl() {
    const endPoint = baseUrl + url;
    const response = await fetch(endPoint);
    const json = await response.json();

    setData(json);
    setLoading(false);
  }

  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading];
}

async function POST(url, name) {
  const baseUrl = `http://localhost:8000/db/taskdatadb/`;
  await fetch(baseUrl + url, {
    method: 'POST',
    header: { 'Content-Type': 'text/plain;charset=UTF-8' },
    body: JSON.stringify({
      Name: name,
    }),
  });
}

export { useSlashDB, POST };

//make useSlashDB
//to pull list of list items
//pulls a list
//pull item from list items

//getDataDiscovery
//request data discovery - POST, GET, PUT, DELETE
// executeDataDiscovery(http method, path, body){
//     request = await fetch(url+path, {
//     method: `http method`,
//     body: {body}
//     })
//
// }
