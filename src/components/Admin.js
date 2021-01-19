import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux';
import {orderProducts} from '../actions/orderAction';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


function createData(ID, Email, Name, Address, Total) {
  return {ID, Email, Name, Address, Total };
}



const  Admin = (props)  =>  {


  const classes = useStyles();
    let orderInLocal = localStorage.getItem('orderProduct');
    let orderArray = JSON.parse(orderInLocal);
    let rows = [];
     rows = orderArray.slice().reverse().map(item => (
      createData(item.id ,item.email , item.name , item.address , item.total)
    ));
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.ID}>
              <TableCell component="th" scope="row">
                {row.ID}
              </TableCell>
              <TableCell align="right">{row.Email}</TableCell>
              <TableCell align="right">{row.Name}</TableCell>
              <TableCell align="right">{row.Address}</TableCell>
              <TableCell align="right">{row.Total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
export default connect((state) => ({
    cartItems: state.cart.cartItems,
    orderProducts: state.order.orderProduct,
    currentOrder: state.order.currentOrder
}),
    {orderProducts}
)(Admin);