import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import NaverMapConatiner from './components/NaverMapConatiner';
import React, { useEffect, useState } from 'react';
import GpsBasedGasStation from './components/GpsBasedGasStation/GpsBasedGasStation';
import NaverMapLocation from './components/NaverMapLocation';
import proj4 from 'proj4';
import useGeolocation from './hooks/useGeolocation.tsx';

const Home = () => {
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
    <div className={`appContainer`}>
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

      {/* 내 위치 근처 최대 5km 내 주유소 목록 */}
      <GpsBasedGasStation katecX={result[0]} katecY={result[1]} />
    </div>
  );
};

export default Home;
