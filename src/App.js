import React, { Component } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import VehicleSelectionForm from "./views/components/vehicleSelectionForm/vehicleSelectionForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<VehicleSelectionForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
