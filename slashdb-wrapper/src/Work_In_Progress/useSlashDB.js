import React, { createContext, useContext, useState, useCallback } from 'react';
import useAsyncEffect from 'use-async-effect';

export const SlashDBContext = createContext({});

export const SlashDBProvider = ({ baseUrl, children }) => (
  <SlashDBContext.Provider value={{ baseUrl }}>
    {children}
  </SlashDBContext.Provider>
);

export const useSlashDB = ({ httpMethod, path, body }) => {
  const { baseUrl } = useContext(SlashDBContext);
  const [result, setResult] = useState({ error: false, data: [{Name: 'x'}] });
  const url = `${baseUrl}${path}`;

  const requestDataDiscovery = useCallback(async () => {
    const request = await fetch(`${url}`, {
      method: `${httpMethod}`,
      header: { 'Content-Type': 'application/json;charset=UTF-8' },
      body: JSON.stringify(body),
    });
    const json = await request.json();
    const response = json.body || json;
    console.log('This is the response before return in reqData' + response);
    return { data: response };
  }, [url, httpMethod, body]);

  useAsyncEffect(async () => {
    setResult({ ...result });
    console.log(
      'This is the result before await requestDataDiscovery(url)' + result
    );
    const response = await requestDataDiscovery(url);
    console.log(
      'This is the response after await requestDataDiscovery(url)' + response
    );
    setResult({ ...result, ...response });
  }, [path, body]);

  console.log('result.data before final return' + result.data);
  return [result.data];
};

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
