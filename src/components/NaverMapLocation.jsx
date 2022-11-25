import axios from 'axios';
import React, { useEffect, useState } from 'react';

const NaverMapLocation = () => {
  const data = axios.post(
    'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=126.9124,37.4612&orders=addr&output=json',
    {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': process.env.REACT_APP_NAVERMAP, //앱 등록 시 발급받은 Client ID
        'X-NCP-APIGW-API-KEY': process.env.REACT_APP_NAVER_SECRET, //앱 등록 시
      },
    }
  );

  return <>현재 도로명주소: {data}</>;
};

export default NaverMapLocation;
