import React from 'react';
import styled, { keyframes } from 'styled-components';

const OuterCircle = styled.div`
  height: 280px;
  width: 280px;
  border-radius: 50%;
  border: solid #763626;
  margin: auto;
  position: relative;
`;

const Info = styled.div`
  position: relative;
  top: 100px;
`;

const Time = styled.p`
  font-size: 60px;
`;

const Type = styled.p`
  font-size: 20px;
  color: #90AFC5;
`;

const FillContainer = styled.div`
  position: absolute;
  height: 270px;
  width: 270px;
  border-radius: 50%;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
`;

const Fill = keyframes`
  from {
    top: 270px;
  }
  to {
    top: 0px;
  }
`;

const Filler = styled.div`
  position: absolute;
  height: 270px;
  width: 270px;
  background-color: #336B87;
  top: 280px;
  animation-timing-function: linear;
`;

const Display = ({ time, title }) => {

  return (
    <OuterCircle>
      <FillContainer>
        <Filler id="filler"></Filler>
      </FillContainer>
      <Info>
        <Time>{ time }</Time>
        <Type>{ title }</Type>
      </Info>
    </OuterCircle>
  );
};

export default Display;
