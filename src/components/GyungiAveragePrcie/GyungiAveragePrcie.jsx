import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GyungiAveragePrcie = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function response() {
      const result = await axios.get(
        `https://cors-anywhere.herokuapp.com/www.opinet.co.kr/api/avgSidoPrice.do?out=json&code=${process.env.REACT_APP_GASAPI}&sido=02`
        // '/api'
      );
      setData((data) => {
        return [...data, result.data.RESULT.OIL[0].PRICE];
      });
      setData((data) => {
        return [...data, result.data.RESULT.OIL[3].PRICE];
      });
    }
    response();
  }, []);

  // const onClick = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://cors-anywhere.herokuapp.com/www.opinet.co.kr/api/avgSidoPrice.do?out=json&code=${process.env.REACT_APP_GASAPI}&sido=01`
  //     );
  //     setData((data) => {
  //       return [...data, response.data.RESULT.OIL[0].PRICE];
  //     });
  //     setData((data) => {
  //       return [...data, response.data.RESULT.OIL[3].PRICE];
  //     });
  //     console.log(response);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <div className="seoulContainer">
      {/* <button className="apiClick" onClick={onClick}>
          서울 평균 기름값
        </button> */}
      <div className="seoulAverageTitle">경기도 평균 주유소 금액</div>
      <div className="gasPriceSeoul">
        휘발유: {Math.ceil(data[0])}, 경유: {Math.ceil(data[1])}
      </div>
    </div>
  );
};

export default GyungiAveragePrcie;
