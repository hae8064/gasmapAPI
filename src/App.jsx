import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import SeoulAveragePrice from "./components/SeoulAveragePrice.jsx";

function App() {
  //D047 경유
  return (
    <>
      <div className="App">주유소 검색</div>
      <SeoulAveragePrice />
    </>
  );
}

export default App;
