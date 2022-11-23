import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  const onClick = async () => {
    try {
      const response = await axios.get(
        'http://www.opinet.co.kr/api/areaAvgRecentPrice.do?out=json&code=${process.env.REACT_APP_GASAPI}&area=11'
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  // const getData = async () => {
  //   const res = await fetch(
  //     //서울 기준 json형식으로 데이터 받기 원한다.
  //     `http://www.opinet.co.kr/api/areaAvgRecentPrice.do?out=json&code=${process.env.REACT_APP_GASAPI}&area=11`
  //   ).then((res) => res.json());
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return (
    <>
      <div className="App">주유소 검색</div>
      <button className="apiClick" onClick={onClick}>
        api버튼
      </button>
      데이터 가져오기: {data}
    </>
  );
}

export default App;
