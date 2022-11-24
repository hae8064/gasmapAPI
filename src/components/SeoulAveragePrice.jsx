import axios from "axios";
import React, { useState } from "react";

function SeoulAveragePrice() {
  const [data, setData] = useState([]);

  const onClick = async () => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/www.opinet.co.kr/api/avgSidoPrice.do?out=json&code=${process.env.REACT_APP_GASAPI}&sido=01`
      );
      setData((data) => {
        return [...data, response.data.RESULT.OIL[0].PRICE];
      });
      setData((data) => {
        return [...data, response.data.RESULT.OIL[3].PRICE];
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button className="apiClick" onClick={onClick}>
        서울 평균 기름값
      </button>
      <br />
      데이터 가져오기: 휘발유: {data[0]}, 경유: {data[1]}
    </div>
  );
}

export default SeoulAveragePrice;
