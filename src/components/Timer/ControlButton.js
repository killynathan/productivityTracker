import React from 'react';
import styled from 'styled-components';

const Icon = styled.i`
  font-size: 20px;
  margin-left: 40px;
  margin-right: 40px;
  margin-top: 30px;
  cursor: pointer;

  &:hover {
    color: #336B87;
  }
`;

const ControlButton = ({ type, onClick }) => (
  <Icon
    className={"fa fa-" + type}
    onClick={onClick}
  ></Icon>
);

export default ControlButton;
