import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import Button from '@mui/material/Button';

function App() {
  const [productDetails, setProductDetails] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalCost, updateTotalCost] = useState(0);
  const [shopping, setShopping] = useState(true);

  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setProductDetails(data);
      }
    )
  }, []);

  function addToCart(e) {
    let toUpdate = cart;
    cart.push(productDetails[e.target.id])
    setCart(toUpdate);
    updateTotalCost(totalCost + productDetails[e.target.id].price)
  }

  function removeFromCart(e) {
    let toUpdate = [...cart.slice(0, e.target.id), ...cart.slice(e.target.id + 1)]
    console.log('after ',toUpdate);
    // setCart(toUpdate);
    // console.log(cart);
    }

  return (
    <div>
      {shopping ? (
      <div>
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Total Items" />
                <ListItemText primary={cart.length} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Total Cost" />
                <ListItemText primary={totalCost} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableBody>
              {Object.entries(productDetails).map(([key, product]) => (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">${product.price}</TableCell>

                  <TableCell align="right">
                  <Button id={key} variant="contained" onClick={(e) => (addToCart(e))}>Add to Basket</Button>
                  </TableCell>
                </TableRow> 
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
        <Button sx={{ margin: '10px' }} variant="contained" onClick={() => setShopping(!shopping)}>Proceed to checkout</Button>
      </div>
      ) : (
        <div>
          <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Total Items" />
                <ListItemText primary={cart.length} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Quantity</TableCell>
                <TableCell align="right"> Unit Price</TableCell>
                <TableCell align="right">Total Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(cart).map(([key, product]) => (
                <TableRow
                  key={key}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">1</TableCell>
                  <TableCell align="right">${product.price}</TableCell>
                  <TableCell align="right">${product.price}</TableCell>
                  <TableCell align="right">
                  <Button id={key} variant="contained" onClick={(e) => (removeFromCart(e))}>Remove</Button>
                  </TableCell>
                </TableRow> 
              ))} 
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ margin: '10px', width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Basket Total Cost" />
                <ListItemText primary={totalCost} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Button sx={{ margin: '10px' }} variant="contained" onClick={() => setShopping(!shopping)}>Continue Shopping</Button>
        </div>

      )}
    </div>
  );
}

export default App;
