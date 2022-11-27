import { useEffect, useState } from 'react';
import './App.css';
import SeoulAveragePrice from './components/SeoulAveragePrice.jsx';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';
import NaverMapConatiner from './components/NaverMapConatiner.jsx';
import axios from 'axios';
import geolocation from 'geolocation';
import useGeolocation from './hooks/useGeolocation.tsx';
import imgIcon from './img/gasIcon.png';
import NaverMapLocation from './components/NaverMapLocation';
import { FiRefreshCcw } from 'react-icons/fi';

function App() {
  // 컴포넌트 안쪽에서 선언하면 에러 발생
  const location = useGeolocation();
  const [lat2, setLat2] = useState();
  const [lng2, setLng2] = useState();
  const [dataLocation, setDataLocation] = useState([]);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    setLat2(location.coordinates.lat.toFixed(4));
    setLng2(location.coordinates.lng.toFixed(4));
  }, [location]);

  return (
    <>
      <div className="mainTitleContainer">
        <div className="maintitle">위치기반 주유소</div>
        <img className="gasIcon" src={imgIcon} alt="주유소아이콘" />
        <FiRefreshCcw
          className="refreshIcon"
          onClick={() => {
            console.log('refresh');
            setRefresh(2);
          }}
        />
      </div>
      <RenderAfterNavermapsLoaded
        // submodules={["geocoder"]}
        ncpClientId={process.env.REACT_APP_NAVERMAP}
        error={<p>Maps Load Error</p>}
        // loading={<p>Maps Loading...</p>}

        loading={
          <NaverMapConatiner lat2={lat2} lng2={lng2} refresh={refresh} />
        }
      ></RenderAfterNavermapsLoaded>
      {/* 내위치 확인 위도 경도  */}
      <NaverMapLocation lat2={lat2} lng2={lng2} refresh={refresh} />
      <br />
      위도: {lat2}
      경도: {lng2}
      {/* 서울시 평균 가격 */}
      <SeoulAveragePrice />
    </>
  );
}

export default App;
