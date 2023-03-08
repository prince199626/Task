import { useEffect, useRef, useState } from "react";
import { Form, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import BaseRoutes from "./routes/BaseRoutes";
import { Provider } from 'react-redux';
import store from "./store/store";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <BaseRoutes />
        </BrowserRouter>
      </Provider>
    </div >
  );
}

export default App;