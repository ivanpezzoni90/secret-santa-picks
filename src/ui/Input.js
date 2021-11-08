import styled from 'styled-components';
import React, { useState, useMemo, useCallback, useRef } from 'react';
import '../style/InputStyle.css';
import { generateID } from '../helpers';


const calculateInputLength = (length) => ({
  s: '8em',
  m: '16em',
  l: '32em',
  full: '100%'
}[length]);

const InputElement = styled.input`
`;

const InputWrapper = styled.div`
  width: ${props => calculateInputLength(props.length)};
  height: 3.5em;
  position: relative;
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  border-bottom: 1px solid #666;
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;
`;

const Input = (props) => {
  const {
     locked,
     active: activeFromProps,
     error,
     value: valueFromProps,
     label,
     onBlur,
     onChange,
     length
  } = props;

  const [active, setActive] = useState((locked && activeFromProps) || false);
  const [value, setValue] = useState(valueFromProps);

  const id = useRef(generateID());

  const fieldClassName = useMemo(() => (
    `field ${(locked ? active : active || value)
      && 'active'} ${locked && !active && "locked"}`
  ),[active, locked, value]);

  const onChangeValue = useCallback((event) => {
    const newValue = event.target.value;
    setValue(newValue);
    onChange(newValue);
  }, [onChange]);

  const onFocusCb = useCallback(() => {
    if (!locked) setActive(true)
  }, [locked]);

  const onBlurCb = useCallback((event) => {
    if (!locked) setActive(false);
    const newValue = event.target.value;
    onBlur(newValue);
  }, [locked, onBlur]);

  return (
    <InputWrapper
      className={fieldClassName}
      length={length}
    >
      <InputElement
        id={id.current}
        type="text"
        value={value}
        placeholder={label}
        onChange={onChangeValue}
        onFocus={onFocusCb}
        onBlur={onBlurCb}
      />
      <label
        htmlFor={id.current}
        className={error && "error"}
      >
        {error || label}
      </label>
    </InputWrapper>
  );
}

Input.defaultProps = {
  onChange: () => {},
  onBlur: () => {},
  locked: false,
  active: false,
  error: '',
  value: '',
  label: 'Label',
  length: 'full' // One of [s,m,l,full]
}

export default Input;
