import React from 'react';

export default function Datatable({ data }) {
  const columns = data[0] && Object.keys(data[0]);

  const styleTable = {
    width: '90%',
    margin: 'auto',
    border: '1px solid black',
    textAlign: 'center',
  };

  return (
    <table cellPadding={10} cellSpacing={0} style={styleTable}>
      <thead>
        <tr>
          {data[0] &&
            columns.map((heading, index) =>
              index > 1 && index < 15 ? (
                <th key={index} style={styleTable}>
                  {heading}
                </th>
              ) : null
            )}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column, index) =>
              index > 1 && index < 15 ? (
                <th key={index} style={styleTable}>
                  {row[column] != null ? row[column] : ' '}
                </th>
              ) : null
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
