//Will need this later whe nwe turn the functions in to useGet, usePost.... hooks
// import React, { createContext, useContext, useState, useCallback } from 'react';
// export const SlashDBContext = createContext({});

// export const SlashDBProvider = ({ baseUrl, children }) => (
//   <SlashDBContext.Provider value={{ baseUrl }}>
//     {children}
//   </SlashDBContext.Provider>
// );

// const { baseUrl } = useContext(SlashDBContext);

export const fetchWrapper = {
  setUp,
  get,
  post,
  put,
  delete: _delete,
};

let baseURL = '';
let dataSet = '';

function setUp(basePath, dataBase) {
  baseURL = basePath;
  dataSet = dataBase;
}

async function dataDiscovery(httpMethod, url, body) {
  const requestOptions = {
    method: `${httpMethod}`,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  return await fetch(baseURL + dataSet + url, requestOptions).then(handleResponse);
}

async function get(url) {
  return await dataDiscovery('GET', url);
}

async function post(url, body) {
  return await dataDiscovery('POST', url, body);
}

async function put(url, body) {
  return await dataDiscovery('PUT', url, body);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url) {
  return await dataDiscovery('DELETE', url);
}

// helper functions

async function handleResponse(response) {
  return await response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
