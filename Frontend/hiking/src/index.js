import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ChakraProvider, theme } from "@chakra-ui/react"
import "bootstrap/dist/css/bootstrap.min.css";


import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
    <Switch>
        <Route path="/about">
            <ChakraProvider theme={theme}>
              <App />
            </ChakraProvider>
        </Route>
    </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
