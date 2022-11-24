import { useEffect, useState } from "react";
import "./App.css";
import SeoulAveragePrice from "./components/SeoulAveragePrice.jsx";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";
import NaverMapConatiner from "./components/NaverMapConatiner";
import axios from "axios";
import geolocation from "geolocation";
import useGeolocation from "./hooks/useGeolocation.tsx";

function App() {
  // 컴포넌트 안쪽에서 선언하면 에러 발생
  const location = useGeolocation();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    setLat(location.coordinates.lat);
    setLng(location.coordinates.lng);
  }, [location]);

  return (
    <>
      <div className="mainTitle">위치기반 주유소</div>
      <RenderAfterNavermapsLoaded
        // submodules={["geocoder"]}
        ncpClientId={process.env.REACT_APP_NAVERMAP}
        error={<p>Maps Load Error</p>}
        // loading={<p>Maps Loading...</p>}
        loading={<NaverMapConatiner lat={lat} lng={lng} />}
      ></RenderAfterNavermapsLoaded>
      {/* 내위치 확인 위도 경도  */}
      위도: {lat}
      경도: {lng}
      {/* 서울시 평균 가격 */}
      <SeoulAveragePrice />
    </>
  );
}

export default App;
