import { useState, useEffect, createContext, useContext, useRef } from 'react';
import { slashDB } from './slashdb';

export const SlashDBContext = createContext({});

export const SlashDBProvider = ({ baseUrl, children }) => (
  <SlashDBContext.Provider value={{ baseUrl }}>
    {children}
  </SlashDBContext.Provider>
);

export const useDataDiscovery = (database, parameters, queryStrParameters) => {
  const { baseUrl } = useContext(SlashDBContext);
  slashDB.setUp(baseUrl);

  const isMountedRef = useRef(null);

  const [data, setData] = useState([]);
  const [didUpdate, setDidUpdate] = useState(new Date());

  const _get = async (parameters, queryStrParameters, headers) => {
    await slashDB
      .dataDiscovery(
        'get',
        database,
        parameters,
        queryStrParameters,
        undefined,
        headers
      )
      .then((data) => setData(data));
  };

  const _post = async (parameters, body, queryStrParameters, headers) => {
    await slashDB
      .dataDiscovery(
        'post',
        database,
        parameters,
        queryStrParameters,
        body,
        headers
      )
      .then(setDidUpdate(new Date()));
  };

  const _put = async (parameters, body, queryStrParameters, headers) => {
    await slashDB
      .dataDiscovery(
        'put',
        database,
        parameters,
        queryStrParameters,
        body,
        headers
      )
      .then(setDidUpdate(new Date()));
  };

  const _delete = async (parameters, queryStrParameters, headers) => {
    await slashDB
      .dataDiscovery(
        'delete',
        database,
        parameters,
        queryStrParameters,
        undefined,
        headers
      )
      .then(setDidUpdate(new Date()));
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      _get(parameters, queryStrParameters);
    }
    return () => (isMountedRef.current = false);
  }, [didUpdate]);

  return [data, _get, _post, _put, _delete];
};

export const useExecuteQuery = (queryID, parameters, queryStrParameters) => {
  const { baseUrl } = useContext(SlashDBContext);
  slashDB.setUp(baseUrl);

  const isMountedRef = useRef(null);

  const [data, setData] = useState([]);

  const _executeQuery = async (
    httpMethod,
    parameters,
    queryStrParameters,
    headers
  ) => {
    await slashDB
      .executeQuery(
        httpMethod,
        queryID,
        parameters,
        queryStrParameters,
        headers
      )
      .then((data) => setData(data));
  };

  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
      _executeQuery(parameters, queryStrParameters);
    }
    return () => (isMountedRef.current = false);
  }, []);

  return [data, _executeQuery];
};
