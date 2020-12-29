import React from 'react';

export default function Name(props) {
  let { style, fieldName, fieldValue, update } = props;
  return (
    <input
      type="textarea"
      style={style}
      className="field"
      value={fieldValue}
      onChange={(e) => {
        fieldValue = e.target.value;
        update({ [fieldName]: `${fieldValue}` });
      }}
    ></input>
  );
}
