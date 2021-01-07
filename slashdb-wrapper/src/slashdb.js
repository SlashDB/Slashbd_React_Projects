export const slashDB = {
  setUp,
  get,
  post,
  put,
  delete: _delete,
  executeQuery,
  executeQuery: dataDiscovery,
};

let baseUrl = '';
let dataFormat = `.json`;

function setUp(baseUrlPath, dataFormatExt) {
  baseUrl = baseUrlPath;
  dataFormatExt && (dataFormat = `.${dataFormatExt}`);
}

async function raw(httpMethod, urlPath, body, queryStrParams, headers) {
  //request paramiters
  const queryStrParameters =
    queryStrParams !== undefined
      ? queryStrParamsConstructor(queryStrParams)
      : '';
  const url = baseUrl + urlPath + dataFormat + queryStrParameters;

  const requestOptions = {
    method: `${httpMethod}`,
    headers: { 'Content-Type': 'application/json', ...headers },
    body: body !== undefined ? JSON.stringify(body) : null,
  };

  try {
    return await fetch(url, requestOptions).then(handleResponse);
  } catch (error) {
    console.log(error);
  }
}

async function get(urlPath, queryStrParameters, headers) {
  //path, querryString - object,
  return await raw('GET', urlPath, undefined, queryStrParameters, headers);
}

async function post(urlPath, body, queryStrParameters, headers) {
  return await raw('POST', urlPath, body, queryStrParameters, headers);
}

async function put(urlPath, body, queryStrParameters, headers) {
  return await raw('PUT', urlPath, body, queryStrParameters, headers);
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(urlPath, queryStrParameters, headers) {
  try {
    return await raw('DELETE', urlPath, undefined, queryStrParameters, headers);
  } catch (error) {
    console.log(error.message);
  }
}

//Function to utalize SQLpassthrough - for executing a query
async function executeQuery(
  httpMethod,
  queryID,
  parameters,
  queryStrParameters,
  headers
) {
  const queryUrlParametersStr = `/query/${queryID}${queryParamsConstructor(
    parameters
  )}`;
  switch (httpMethod) {
    case 'get':
      return await get(queryUrlParametersStr, queryStrParameters, headers);
    case 'post':
      return await post(
        queryUrlParametersStr,
        undefined,
        queryStrParameters,
        headers
      );
    case 'put':
      return await put(
        queryUrlParametersStr,
        undefined,
        queryStrParameters,
        headers
      );
    case 'delete':
      return await _delete(queryUrlParametersStr, queryStrParameters, headers);

    default:
      return await get(queryUrlParametersStr, queryStrParameters, headers);
  }
}

//Function to utalize data discovery
async function dataDiscovery(
  httpMethod,
  database,
  parameters,
  queryStrParameters = {},
  body = undefined,
  headers
) {
  const dataDiscoveryUrlParametersStr = `/db/${database}${dataDiscoveryParamsConstructor(
    parameters
  )}`;
  switch (httpMethod) {
    case 'get':
      return await get(
        dataDiscoveryUrlParametersStr,
        queryStrParameters,
        headers
      );
    case 'post':
      return await post(
        dataDiscoveryUrlParametersStr,
        body,
        queryStrParameters,
        headers
      );
    case 'put':
      return await put(
        dataDiscoveryUrlParametersStr,
        body,
        queryStrParameters,
        headers
      );
    case 'delete':
      return await _delete(
        dataDiscoveryUrlParametersStr,
        queryStrParameters,
        headers
      );

    default:
      return await get(
        dataDiscoveryUrlParametersStr,
        queryStrParameters,
        headers
      );
  }
}

//helper functions

//handles the requests responce
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

//help construct url path from array for data discovery
function dataDiscoveryParamsConstructor(queryParamsArr) {
  let pathStr = '';
  if (queryParamsArr) {
    queryParamsArr.map((param) => {
      return (pathStr += `/${param}`);
    });
  }
  return pathStr;
}
//help construct string url path from object for ease of use
function queryParamsConstructor(queryParamsObj) {
  let pathStr = '';
  Object.keys(queryParamsObj).forEach(function eachKey(key) {
    pathStr += `/${key}/${queryParamsObj[key]}`;
  });
  return pathStr;
}
//help construct string options for url
function queryStrParamsConstructor(queryStrParamsObj) {
  let queryStrParams = '?';
  Object.keys(queryStrParamsObj).forEach(function eachKey(key) {
    queryStrParams += `${key}=${queryStrParamsObj[key]}&`;
  });
  return queryStrParams;
}
