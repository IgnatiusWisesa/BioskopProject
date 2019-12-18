// import React from 'react';
// import { render } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

INITIAL_STATE = {
  id:'',
  jumlahnotif:0,
  totalharga:0,
  tanggal:''
}

ganti = {
  id:1,
  jumlahnotif:5,
  totalharga:50000,
  tanggal:'16/9/19'
}

console.log({...INITIAL_STATE,...ganti})