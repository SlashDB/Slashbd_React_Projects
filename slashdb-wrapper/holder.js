import { useState, useEffect, createContext, useContext } from 'react';

export const slashdb = {
  setUp,
  get,
  post,
  put,
  delete: _delete,
  query,
  // useQuery,
};

let basePath = '';
let dataFormat = `.json`;

function setUp(basepath, dataformat) {
  basePath = basepath;
  dataformat && (dataFormat = `.${dataformat}`);
}

async function raw(httpMethod, url, body) {
  const requestOptions = {
    method: `${httpMethod}`,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  try {
    return await fetch(
      basePath  + url + dataFormat,
      requestOptions
    ).then(handleResponse);
  } catch (error) {
    console.log(error);
  }
}

async function get(url) {
  //path, querryString - object,
  return await raw('GET', url);
}

async function post(url, body) {
  return await raw('POST', url, body);
}

async function put(url, body) {
  return await raw('PUT', url, body);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(url) {
  try {
    return await raw('DELETE', url);
  } catch (error) {
    console.log(error.message);
  }
}

// helper functions for response handling
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

/**
 * Component is described here.
 *
 * @query ./extra.examples.md
 */
async function query(fields, fct, body) {
  let url = '';
  fields.map((field) => {
    return (url = url + '/' + field);
  });
  switch (fct) {
    case 'get':
      return await get(url);
    case 'post':
      return await post(url, body);
    case 'put':
      return await put(url, body);
    case 'delete':
      return await _delete(url);

    default:
      return await get(url);
  }
}
export const SlashDBContext = createContext({});
export const SlashDBProvider = ({ baseUrl, children }) => (
  <SlashDBContext.Provider value={{ baseUrl }}>
    {children}
  </SlashDBContext.Provider>
);
export function useQuery(fields, fct, body) {
  const { baseUrl } = useContext(SlashDBContext);

  console.log(baseUrl);

  const [data, setData] = useState([]);

  let url = '';

  fields.map((field) => {
    return (url = url + '/' + field);
  });

  useEffect(() => {
    switch (fct) {
      case 'get':
        get(url).then((result) => setData(result));
        break;
      case 'post':
        post(url, body).then((result) => setData(result));
        break;
      case 'put':
        put(url, body).then((result) => setData(result));
        break;
      case 'delete':
        _delete(url).then((result) => setData(result));
        break;

      default:
        get(url).then((result) => setData(result));
        break;
    }
  }, []);

  return data;
}
