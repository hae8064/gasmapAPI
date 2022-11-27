import React, { useEffect, useState } from 'react';
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from 'react-naver-maps';

const NaverMapLocation = ({ lat2, lng2, refresh }) => {
  const { naver } = window;

  // let myLocation = [];
  const [myLocation, setMyLocation] = useState([]);

  useEffect(() => {
    console.log(lat2, lng2);
    naver.maps.Service.reverseGeocode(
      {
        location: new naver.maps.LatLng(
          lat2 === undefined ? 37.3849483 : lat2,
          lng2 === undefined ? 127.1229117 : lng2
        ),
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) {
          return alert('Something wrong!');
        }

        var result = response.result; // 검색 결과의 컨테이너
        setMyLocation(result.items[0].address); // 검색 결과의 배열

        // do Something
        console.log(myLocation);
      }
    );

    console.log(lat2, lng2);
  }, [refresh]);

  return <>현재 주소는: {myLocation}</>;
};

export default NaverMapLocation;
