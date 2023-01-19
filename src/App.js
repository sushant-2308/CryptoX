import { makeStyles } from "@material-ui/core";
import Homepage from "./Pages/HomePage";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CoinPage from "./Pages/CoinPage";
// import Header from "./components/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./routes/Login";
import Logout from "./routes/Logout";
import Register from "./routes/Register";
import transactiondetails from "./Pages/TransactionDetails";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        {/* <Header /> */}
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/Register" component={Register} exact />
        <Route path="/logout" component={Logout} exact />
        <Route path="/Pages/TransactionDetails" component={transactiondetails} exact />

      </div>
    </BrowserRouter>
  );
}

export default App;
