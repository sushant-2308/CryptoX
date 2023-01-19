import React from "react";
import { Table,Container,ListGroup } from "react-bootstrap";


const TransactionDetails = () => {
    return(
        <div>
           <Container>
            <ListGroup horizontal>
  <ListGroup.Item>Total Balance <br /> 400000 </ListGroup.Item>
  <ListGroup.Item>Available Balance <br /> 297855 </ListGroup.Item>
        </ListGroup>

        <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Serial Number</th>
      <th>Coin/Asset</th>
      <th>Available Balance</th>
      
      <th>Total Value</th>
      <th>INR Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>BitCoin</td>
      <td>0.458975</td>
      
      <td>0.12455</td>
      <td>111.3 INR</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Ethereum</td>
      <td>0.003254</td>
      
      <td>0.002455</td>
      <td>121.38 INR</td>
    </tr>
    <tr>
      <td>3</td>
      <td>Tether</td>
      <td>0.000015</td>
      
      <td>0.102455</td>
      <td>326.11 INR</td>
    </tr>
    <tr>
      <td>4</td>
      <td>Binance USD</td>
      <td>0.04565</td>
      
      <td>0.000455</td>
      <td>125.94 INR</td>
    </tr>
    <tr>
      <td>5</td>
      <td>Cardano</td>
      <td>0.0558565</td>
      
      <td>0.00055</td>
      <td>118.3 INR</td>
    </tr>
    
  </tbody>
</Table>

        </Container> 

        </div>
    );
}

export default TransactionDetails;