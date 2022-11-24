import React from "react";
import { RenderAfterNavermapsLoaded, NaverMap, Marker } from "react-naver-maps";

const NaverMapConatiner = ({ lat, lng }) => {
  return (
    <div>
      <NaverMap
        mapDivId={"maps-getting-started-uncontrolled"} // default: react-naver-map
        style={{
          width: "100%", // 네이버지도 가로 길이
          height: "30vh", // 네이버지도 세로 길이
        }}
        defaultCenter={{ lat: 37.5408428, lng: 126.9458903 }} // 지도 초기 위치
        defaultZoom={16} // 지도 초기 확대 배율
        zoomControl={true}
      >
        <Marker
          key={1}
          position={{ lat: lat, lng: lng }}
          animation={2}
          clickable={true}
          onClick={() => {
            alert("현재 위치입니다.");
          }}
        />
      </NaverMap>
    </div>
  );
};

export default NaverMapConatiner;
