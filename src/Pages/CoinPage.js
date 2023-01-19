import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Chart from "../components/Chart";
import { SingleCoin } from "../config/api";
import { numberWithCommas } from "../components/CoinsTable";
import { CryptoState } from "../CryptoContext";
import { Accordion, ListGroup, InputGroup, FormControl, Button } from "react-bootstrap";



const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
  }));

  const classes = useStyles();
  const [QPstate, setQPstate] = useState(
    {
      quantity : 0.0,
      price :0.0
    }
  );
  // const [quantity, setQuantity] = useState(0);
  function handleChangeQuantityPrice(evt, type) {
    const value = evt.target.value;

   if (type == "quantity"){
    setQPstate({
      quantity: Number(value),
      price  :  Number(value) * Number(
        coin?.market_data.current_price[currency.toLowerCase()])
      })
    }
    else {
      setQPstate({
        // ...QPstate,
        price  : Number(value),
        quantity:  Number(value) / Number(
          coin?.market_data.current_price[currency.toLowerCase()])
        })
    }
    
  }
  function CreateOrder(evt, orderType) {
    // const value = evt.target.value;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({
        coin : coin?.symbol,
        limit_price: Number(
          coin?.market_data.current_price[currency.toLowerCase()]),
        order_type : orderType,
        quantity : QPstate.quantity,
        total_INR : QPstate.price
      }),
      mode: 'cors'
    };
    fetch('http://localhost:3002/orders', requestOptions)
      .then(response => response.json())
      .catch((err) => console.log(err))
  }
  

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          <div>
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>BUY Coins!</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    <ListGroup.Item>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="inputGroup-sizing-default">Price </InputGroup.Text>
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          value={numberWithCommas(
                            coin?.market_data.current_price[currency.toLowerCase()]
                          )}
                        />
                        <Button variant="success">Lowest Price</Button>
                      </InputGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="inputGroup-sizing-default">Quantity</InputGroup.Text>
                        <FormControl
                          aria-label="Default"
                          presicion={2} 
                          min="0.00"
                          step="0.001"
                          max="1.00"
                          autocomplete="off"
                          pattern="[+-]?\d+(?:[.,]\d+)?"
                          placeholder="0.0"
                          aria-describedby="inputGroup-sizing-default"
                          onChange={(e) => {
                           
                            console.log(
                              coin?.market_data.current_price[currency.toLowerCase()])
                            
                            handleChangeQuantityPrice(e,"quantity")
                          
                          }
                        }
                        value = {QPstate.quantity}

                        />
                      </InputGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="inputGroup-sizing-default">INR</InputGroup.Text>
                        <FormControl
                          aria-label="Default"
                          presicion={2} 
                          min="0.00"
                          step="0.001"
                          max="1.00"  
                          pattern="[+-]?\d+(?:[.,]\d+)?"
                          placeholder="0.0"
                          aria-describedby="inputGroup-sizing-default"
                          autocomplete="off"
                          onChange={(e) => {
                          
                            console.log(
                              coin?.market_data.current_price[currency.toLowerCase()])
                            handleChangeQuantityPrice(e,"price")
                          }}
                        value={QPstate.price}
                        />
                      </InputGroup>
                    </ListGroup.Item>
                  </ListGroup>
                  <Button variant="warning" onClick={(e) => {
                          CreateOrder(e)
                        }}>BUY</Button>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>SELL Coins!</Accordion.Header>
                <Accordion.Body>
                  <ListGroup>
                    <ListGroup.Item>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="inputGroup-sizing-default">Price</InputGroup.Text>
                        <FormControl
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          value={numberWithCommas(
                            coin?.market_data.current_price[currency.toLowerCase()]
                          )}
                        />
                        <Button variant="danger">Highest Price</Button>
                      </InputGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="inputGroup-sizing-default">Quantity</InputGroup.Text>
                        <FormControl
                          aria-label="Default"
                          presicion={2} 
                          min="0.00"
                          step="0.001"
                          max="1.00"
                          autocomplete="off"
                          pattern="[+-]?\d+(?:[.,]\d+)?"
                          placeholder="0.0"
                          aria-describedby="inputGroup-sizing-default"
                          onChange={(e) => {
                           
                            console.log(
                              coin?.market_data.current_price[currency.toLowerCase()])
                            
                            handleChangeQuantityPrice(e,"quantity")
                          
                          }
                        }
                        value = {QPstate.quantity}

                        />
                      </InputGroup>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <InputGroup className="mb-3">
                        <InputGroup.Text className="inputGroup-sizing-default">INR</InputGroup.Text>
                        <FormControl
                          aria-label="Default"
                          presicion={2} 
                          min="0.00"
                          step="0.001"
                          max="1.00"  
                          pattern="[+-]?\d+(?:[.,]\d+)?"
                          placeholder="0.0"
                          aria-describedby="inputGroup-sizing-default"
                          autocomplete="off"
                          onChange={(e) => {
                          
                            console.log(
                              coin?.market_data.current_price[currency.toLowerCase()])
                            handleChangeQuantityPrice(e,"price")
                          }}
                        value={QPstate.price}
                        />
                      </InputGroup>
                    </ListGroup.Item>
                  </ListGroup>
                  <Button variant="warning" onClick={(e) => {
                          CreateOrder(e)
                        }}>SELL</Button>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

          </div>
        </div>
      </div>
      <div style={{ display: "flex", width: "70%", height: "55REM" }}><Chart coin={coin} /></div>
    </div>
  );
};

export default CoinPage;
