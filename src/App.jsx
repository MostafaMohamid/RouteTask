import { useState, useEffect } from 'react';
import './App.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import axios from 'axios';
import TableData from './TableData/TableData';
import 'bootstrap/dist/css/bootstrap.min.css';
import BarChart from './BarChart/BarChart';

function App() {
  const [customerData, setCustomerData] = useState([]);
  const [transactionsData, setTransactionsData] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [searchAmount, setSearchAmount] = useState('');

 
 

  return (
    <>
      <TableData> </TableData>
      <BarChart></BarChart>
    </>
  );
}

export default App;
