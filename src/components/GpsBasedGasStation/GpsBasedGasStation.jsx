import axios from "axios";
import React, { useEffect, useState } from "react";
import "./GpsBasedGasStation.css";

const GpsBasedGasStation = ({ katecX, katecY }) => {
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);

  let oilLength = 0;
  const oilArr = [];

  useEffect(() => {
    console.log("katec " + katecX, katecY);

    async function response() {
      const result = await axios
        .get(
          `https://cors-anywhere.herokuapp.com/www.opinet.co.kr/api/aroundAll.do?code=${process.env.REACT_APP_GASAPI}&x=${katecX}&y=${katecY}&radius=2000&sort=1&prodcd=D047&out=json`

          // `https://cors-anywhere.herokuapp.com/www.opinet.co.kr/api/aroundAll.do?code=F221123420&x=303981.50363080035&y=540560.4158811523&radius=2000&sort=1&prodcd=D047&out=json`
          // "/api/aroundAll.do?code?=F221123420&x=303981.50363080035&y=540560.4158811523&radius=5000&sort=1&prodcd=D047&out=json"
        )
        .then((rep) => {
          // setData((data) => {
          //   return [...data, JSON.stringify(rep.data.RESULT.OIL)];
          // });

          oilLength = JSON.stringify(rep.data.RESULT.OIL).length;

          for (let i = 0; i < 5; i++) {
            if (JSON.stringify(rep.data.RESULT.OIL[i].OS_NM) === undefined) {
              break;
            }
            setData((data3) => {
              return [...data3, JSON.stringify(rep.data.RESULT.OIL[i].OS_NM)];
            });

            setData((data3) => {
              return [...data3, JSON.stringify(rep.data.RESULT.OIL[i].PRICE)];
            });
            // setPrice((price) => {
            //   return [...price, JSON.stringify(rep.data.RESULT.OIL[i].PRICE)];
            // });
          }
          // console.log("금액과 같이 나와라!" + data[1]);
        });

      // console.log("주변 주유소 정보:" + result);
    }
    response();
  }, [katecX, katecY]);

  console.log("광연 데이터는 ??" + data.map((data2) => data2));

  return (
    <div className="gpsBasedGasStationContainer">
      <div className="gpsBasedTitle">주변 주유소 최저가 순</div>
      <div className="gpsBasedContainerBox">
        <ul>
          {data.map((data, idx) =>
            idx % 2 === 0 ? (
              <li className="gasDataLi">{data}</li>
            ) : (
              <div>금액: {data}</div>
            )
          )}
          {/* {price.map((data) => (
            <li>금액: {data}</li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

export default GpsBasedGasStation;
