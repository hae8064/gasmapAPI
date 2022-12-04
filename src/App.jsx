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
import GyungiAveragePrcie from './components/GyungiAveragePrcie/GyungiAveragePrcie';
import IncheonAveragePrice from './components/IncheonAveragePrice/IncheonAveragePrice';
import { GiHamburgerMenu } from 'react-icons/gi';
import proj4 from 'proj4'; //katec 좌표로 바꿔주는 라이브러리
import GpsBasedGasStation from './components/GpsBasedGasStation/GpsBasedGasStation';
import Sidebar from './components/SidebarMenu/Sidebar';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';

function App() {
  // 컴포넌트 안쪽에서 선언하면 에러 발생
  const location = useGeolocation();
  const [lat2, setLat2] = useState();
  const [lng2, setLng2] = useState();
  const [dataLocation, setDataLocation] = useState([]);
  const [refresh, setRefresh] = useState(1);
  const [display, setDisplay] = useState('off');

  useEffect(() => {
    setLat2(location.coordinates.lat.toFixed(4));
    setLng2(location.coordinates.lng.toFixed(4));
  }, [location]);

  //테스트 좌표 변환 Katec 좌표로 변환
  const from = 'WGS84';
  const to = 'TM128';

  proj4.defs('WGS84', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs');
  proj4.defs(
    'TM128',
    '+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43'
  );

  let katecX;
  let katecY;
  {
    katecX = lat2 === undefined ? 37.3849483 : Number(lat2);
    katecY = lng2 === undefined ? 127.1229117 : Number(lng2);
  }

  const xy = [katecY, katecX];

  const result = proj4(from, to, xy);

  console.log(result[0], result[1]);

  const hamburgerOnclick = () => {
    setDisplay('on');
    console.log(display);
  };

  const hamburgerCloseclick = () => {
    setDisplay('off');
  };

  return (
    <>
      <div className="mainTitleContainer">
        <GiHamburgerMenu
          className="hamburgerbar"
          onClick={hamburgerOnclick}
          // display={display}
        />
        <Sidebar display={display} hamburgerOnclick={hamburgerCloseclick} />
        <div className="mainTitleCenter">
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="maintitle">위치기반 주유소</div>
          </Link>
          <img className="gasIcon" src={imgIcon} alt="주유소아이콘" />
        </div>
        <FiRefreshCcw
          className="refreshIcon"
          onClick={() => {
            console.log('refresh');
            setRefresh(2);
          }}
        />
      </div>
      <Routes>
        <Route path="/seoulPrice" element={<SeoulAveragePrice />}></Route>
        <Route path="/gyungiPrice" element={<GyungiAveragePrcie />}></Route>
        <Route path="/incheonPrice" element={<IncheonAveragePrice />}></Route>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </>
  );
}

export default App;
