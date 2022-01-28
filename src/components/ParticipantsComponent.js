import styled from 'styled-components';
import React, { Fragment, useCallback, useMemo } from 'react';
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

const namesPlaceholder = [''];

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

const ParticipantsComponent = (props) => {
  const {
    onUpdateNames,
    data
  } = props;

  const names = useMemo(() => {
    return data.length === 0
      ? namesPlaceholder
      : data.map(a => a.name);
  }, [data]);

  const onUpdateNamesCb = useCallback((newNames) => {
    onUpdateNames(newNames);
  }, [onUpdateNames]);

  const onBlurCb = useCallback((index, value) => {
    const newNames = [...names];
    newNames[index] = value;
    onUpdateNamesCb(newNames);
  }, [names, onUpdateNamesCb]);

  const onDeleteCb = useCallback((index) => {
    const newNames = [...names];
    newNames.splice(index, 1);
    onUpdateNamesCb(newNames);
  }, [names, onUpdateNamesCb]);

  const onAddCb = useCallback(() => {
    onUpdateNamesCb(names.concat(''));
  }, [names, onUpdateNamesCb]);

  return (
    <Fragment>
      <TitleWrapper>
        Insert participants names
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

ParticipantsComponent.defaultProps = {
};

export default ParticipantsComponent;