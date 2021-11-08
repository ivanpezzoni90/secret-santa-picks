import styled from 'styled-components';

import React, { useMemo } from 'react';

import Input from '../ui/Input';

const EMPTY_OBJECT = {};

const InputWrapper = styled.div`
  padding-bottom: 1em;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: .5em;
`;

const InputComponent = ({ label, onBlur, value }) => {
  return (
    <InputWrapper>
      <Input
        label={label}
        onBlur={onBlur}
        value={value}
      />
    </InputWrapper>
  );
};

const ParticipantsComponent = (props) => {
  const {
    addressMap = EMPTY_OBJECT
  } = props;

  const onBlurCb = () => {};

  const names = useMemo(() => (
    Object.keys(addressMap)
  ), [addressMap]);

  return (
    <Container>
      {names.map((n, i) => (
        <InputComponent
          key={`${n}_${i}`}
          label={`Name ${i+1}`}
          onBlur={onBlurCb}
          value={n}
        />
      ))}
    </Container>
  )
};

export default ParticipantsComponent;