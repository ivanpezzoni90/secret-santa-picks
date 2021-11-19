import styled from 'styled-components';
import React, { Fragment, useCallback, useState } from 'react';
import Input from '../ui/Input';
import { FaTrashAlt } from "react-icons/fa";
import Button from '../ui/Button';

const InputWrapper = styled.div`
  padding-bottom: 1em;
  display: flex;
`;
const IconWrapper = styled.div`
  padding-left: 0.5em;
  display: flex;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: .5em;
`;
const ButtonWrapper = styled.div`
  padding: 1em 0 2em 0;
`;

const TitleWrapper = styled.div`
  padding-bottom: 1em;
`;

const InputComponent = ({ label, onBlur, value, index, onDelete }) => {
  const onIconClick = useCallback(() => {
    onDelete(index);
  }, [index, onDelete]);

  const onInputBlur = useCallback((value) => {
    onBlur(index, value);
  }, [index, onBlur]);

  return (
    <InputWrapper>
      <Input
        label={label}
        onBlur={onInputBlur}
        value={value}
        length="m"
      />
      {index !== 0 ? (
        <IconWrapper>
          <FaTrashAlt
            className="button-icon"
            color="#666"
            onClick={onIconClick}
          />
        </IconWrapper>
      ) : null}
    </InputWrapper>
  );
};

const ExceptionsComponent = (props) => {
  const [names, setNames] = useState(['']);

  const onBlurCb = useCallback((index, value) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  }, [names]);

  const onDeleteCb = useCallback((index) => {
    const newNames = [...names];
    newNames.splice(index, 1);
    setNames(newNames);
  }, [names]);

  const onAddCb = useCallback(() => {
    setNames(names.concat(''));
  }, [names]);

  console.log('Names ', names);

  return (
    <Fragment>
      <TitleWrapper>
        Insert exceptions (optional)
      </TitleWrapper>
      <Container>
        {names.map((n, i) => (
          <InputComponent
            key={`${n}_${i}`}
            label={`Name ${i+1}`}
            value={n}
            index={i}
            onBlur={onBlurCb}
            onDelete={onDeleteCb}
          />
        ))}
      </Container>
      <ButtonWrapper>
        <Button
          label="Add participant"
          onClick={onAddCb}
        />
      </ButtonWrapper>
    </Fragment>
  )
};

ExceptionsComponent.defaultProps = {

};

export default ExceptionsComponent;