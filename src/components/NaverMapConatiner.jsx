import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';
import useGeolocation from '../hooks/useGeolocation.tsx';

const { naver } = window;

const NaverMapConatiner = () => {
  // const location = useGeolocation();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;

      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      setLat(crd.latitude);
      setLng(crd.longitude);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);

    const container = document.getElementById('map'); // 지도를 표시할 div

    // const position = new naver.maps.LatLng(37.3849483, 127.1229117);
    const position = new naver.maps.LatLng(
      lat === undefined ? 37.3849483 : lat,
      lng === undefined ? 127.1229117 : lng
    );

    // let markerList = [];
    // const HOME_PATH = window.HOME_PATH || '.';
    // Number(location.coordinates.lat.toFixed(4)),
    // Number(location.coordinates.lng.toFixed(4))
    const mapOptions = {
      center: position,
      zoom: 17,
      minZoom: 6,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new naver.maps.Map(container, mapOptions);

    const markerOptions = {
      position: position.destinationPoint(90, 15),
      map: map,
      icon: {
        url: 'https://navermaps.github.io/maps.js/docs/img/example/ico_pin.jpg',
        //size: new naver.maps.Size(50, 52),
        origin: new naver.maps.Point(0, 0),
        anchor: new naver.maps.Point(25, 26),
      },
    };

    const marker = new naver.maps.Marker(markerOptions);

    console.log('loading navermap');
  }, [refresh]);

  return (
    <div>
      <div
        id="map"
        onClick={() => {
          setRefresh(2);
        }}
        style={{ width: '100%', height: '300px' }}
      ></div>
    </div>

    //실제 코드
    // const location = useGeolocation();
    // const [lat2, setLat2] = useState(37.3595704);
    // const [lng2, setLng2] = useState(127.105399);

    // //테스트 예제
    // const navermaps = window.naver.maps;

    // // const [latlng, setLatlng] = useState(
    // //   new navermaps.LatLng(37.3595704, 127.105399)
    // // );
    // const locationMaps = new navermaps.LatLng(37.3595, 127.1053);

    // useEffect(() => {
    //   setLat2(location.coordinates.lat.toFixed(4));
    //   setLng2(location.coordinates.lng.toFixed(4));
    //   console.log(lat2, lng2);
    // }, []);

    // // useEffect(() => {
    // //   setLatlat(lat2);
    // //   setLnglng(lng2);

    // //   console.log(
    // //     '위도: ' + Number(lat2),
    // //     lng2 + 'state값: ' + typeof latlat + lnglng
    // //   );
    // // }, [latlat, lnglng]);

    // const buttonClick = () => {
    //   alert('위치 새로고침');
    //   setLat2(location.coordinates.lat.toFixed(4));
    //   setLng2(location.coordinates.lng.toFixed(4));
    // };
    // console.log(lat2, lng2);

    // return (
    //   <div>
    //     <NaverMap
    //       onClick={buttonClick}
    //       mapDivId={'maps-getting-started-uncontrolled'} // default: react-naver-map
    //       style={{
    //         width: '100%', // 네이버지도 가로 길이
    //         height: '30vh', // 네이버지도 세로 길이
    //       }}
    //       // defaultCenter={{
    //       //   lat: lat2,
    //       //   lng: lng2,
    //       // }} // 지도 초기 위치
    //       defaultZoom={15} // 지도 초기 확대 배율
    //       zoomControl={true}
    //     >
    //       <Marker
    //         key={1}
    //         position={{
    //           lat: lat2,
    //           lng: lng2,
    //         }}
    //         animation={2}
    //         clickable={true}
    //         onClick={buttonClick}
    //       />
    //     </NaverMap>
    //   </div>
  );
};

export default NaverMapConatiner;
