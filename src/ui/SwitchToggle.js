import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Element from './Element';

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ toggle, color }) => (toggle ? color : "white")};
  border-radius: 15px;
  border: 1px solid gray;
  transition: 0.4s;

  &:before {
    content: "";

    position: absolute;
    left: 2px;
    bottom: 2px;

    width: 20px;
    height: 20px;
    border-radius: 100%;

    background-color: ${({ toggle, color }) => (toggle ? "white" : color)};

    transition: 0.4s;
  }
`;

const Input = styled.input`
  &:checked + ${Slider}:before {
    transform: translateX(23.4px);
  }
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  background-color: ${({ toggle, color }) => (toggle ? color : "white")};
  border-radius: 15px;
  transition: 0.4s;

  & ${Input} {
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

const SwitchToggle = ({ checked = false, color = "#ba0c2f", label, onClick }) => {
  const [toggle, setToggle] = useState(checked);

  const onClickCb = useCallback(() => {
    setToggle(!toggle);
    onClick(!toggle);
  }, [onClick, toggle]);

  return (
    <Element
      label={label}
    >
      <Switch>
        <Input {...{ color }} type="checkbox" defaultChecked={toggle} />
        <Slider {...{ toggle, color }} onClick={onClickCb} />
      </Switch>
    </Element>
  );
};

export default SwitchToggle;