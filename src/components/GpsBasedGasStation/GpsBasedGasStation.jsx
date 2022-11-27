import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './GpsBasedGasStation.css';

const GpsBasedGasStation = ({ katecX, katecY }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('katec ' + katecX, katecY);

    async function response() {
      const result = await axios.get(
        `https://cors-anywhere.herokuapp.com/www.opinet.co.kr/api/aroundAll.do?code=${process.env.REACT_APP_GASAPI}&x=${katecX}&y=${katecY}&radius=2000&sort=1&prodcd=D047&out=json`
        // '/api'
      );
      //   setData((data) => {
      //     return [...data, result.data.RESULT.OIL[0].PRICE];
      //   });
      //   setData((data) => {
      //     return [...data, result.data.RESULT.OIL[3].PRICE];
      //   });

      console.log('주변 주유소 정보:' + result);
    }
    response();
  }, []);

  return (
    <div className="gpsBasedGasStationContainer">
      <div className="gpsBasedTitle">주변 주유소 최저가 순</div>
      <div className="gpsBasedContainerBox"></div>
    </div>
  );
};

export default GpsBasedGasStation;
