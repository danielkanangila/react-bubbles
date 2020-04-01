import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import {axiosWithAuth, API_URL} from "./../utils";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    axiosWithAuth().get(`${API_URL}/colors`)
    .then(res => setColorList(res.data))
    .then(err =>  console.error(err));

  }, []);

  const updateColors = colors => {
    console.log(colors);
  }

  if (!colorList.length) {
    return <Loading>Loading...</Loading>
  }

  return (
    <Wrapper>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </Wrapper>
  );
};

const Loading = styled.h1`
  color: grey;
  font-size: 2.5rem;
  text-align: center;
  padding: 180px 0;
`;

const Wrapper = styled.div`
  margin: 30px 0;
`

export default BubblePage;
