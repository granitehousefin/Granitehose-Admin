import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import RouteList from "./Routes/RouteList";
import { store } from "./Redux/store";
import { Provider } from "react-redux";

function App() {
  if (
    localStorage.getItem("login") === null ||
    JSON.parse(localStorage.getItem("login")).value === false
  ) {
    localStorage.setItem("login", JSON.stringify({ value: false }));
  }

  return (
    <div className="App" style={{ height: "fit-content" }}>
      <Provider store={store}>
        <BrowserRouter>
          <RouteList />
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
