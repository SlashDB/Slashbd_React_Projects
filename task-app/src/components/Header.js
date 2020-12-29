import React from 'react';

export default function Header() {
  const wrapper = {
    height: '80px',
    backgroundColor: 'rgb(0,175,239)',
    color: '#fff',
    padding: '16px 32px',
    margin: '0px',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)',
  };
  const h1 = {
    color: '#fff',
    fontFamily: 'McLaren, cursive',
    fontWeight: '200',
  };
  return (
    <div style={wrapper}>
      <h1 style={h1}>Task Lists App</h1>
    </div>
  );
}
