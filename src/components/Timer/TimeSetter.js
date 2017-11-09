import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: inline-block;
  margin-right: 52px;
  margin-left: 52px;
  margin-bottom: 20px;
  font-size: 30px;
`;

const Title = styled.p`
  font-size: 15px;
  color: #90AFC5;
`;

const TimeSetterButton = styled.div`
  height: 20px;
  width: 20px;
  cursor: pointer;
  display: inline-block;
  -webkit-user-select: none; /* Chrome/Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+ */

  &:hover {
    color: #336B87;
  }
`;

const TimeDisplay = styled.div`
  height: 32px;
  width: 35px;
  display: inline-block;
`;

const TimeSetter = ({ title, timeLength, onMinusClick, onPlusClick }) => (
  <Wrapper>
    <Title>{ title }</Title>
    <TimeSetterButton
      onClick={onMinusClick}
    >
      -
    </TimeSetterButton>
    <TimeDisplay>{ timeLength }</TimeDisplay>
    <TimeSetterButton
      onClick={onPlusClick}
    >
      +
    </TimeSetterButton>
  </Wrapper>
);

export default TimeSetter;
