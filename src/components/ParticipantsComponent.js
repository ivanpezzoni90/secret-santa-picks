import styled from 'styled-components';
import React, { Fragment, useCallback } from 'react';
import Input from '../ui/Input';
import { FaTrashAlt } from "react-icons/fa";
import Button from '../ui/Button';
import { generateID } from '../helpers';

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
const Spacer = styled.div`
  padding: 0 0.5em;
`;

const getEmailLabel = (name, email, label) => {
  const lbl = `Email for ${name !== ''
      ? name
      : label
    } ${email !== ''
      ? ''
      : '(optional)'
    }`;
  // Truncate string and add ellipsis
  return lbl.length > 30
    ? `${lbl.substring(0, 27)}...`
    : lbl;
}

const InputComponent = ({ label, onBlur, value, index, onDelete }) => {
  const {
    id,
    name,
    email
  } = value;

  const onIconClick = useCallback(() => {
    onDelete(id);
  }, [id, onDelete]);

  const onInputBlur = useCallback((type) => {
    return (val) => {
      onBlur(id, val, type);
    }
  }, [id, onBlur]);

  return (
    <InputWrapper>
      <Spacer>
        <Input
          label={label}
          onBlur={onInputBlur('name')}
          value={name}
          length="m"
        />
      </Spacer>
      <Spacer>
        <Input
          label={getEmailLabel(name, email, label)}
          onBlur={onInputBlur('email')}
          value={email}
          length="m"
        />
      </Spacer>
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
    onUpdateParticipants,
    data
  } = props;

  const onUpdateParticipantsCb = useCallback((newNames) => {
    onUpdateParticipants(newNames);
  }, [onUpdateParticipants]);

  const onBlurCb = useCallback((id, value, type) => {
    const newData = data.map(d => {
      if (d.id === id) {
        return Object.assign({}, d, {
          [type]: value
        })
      }
      return d;
    });
    onUpdateParticipantsCb(newData);
  }, [data, onUpdateParticipantsCb]);

  const onDeleteCb = useCallback((id) => {
    const newData = data.filter(d => d.id !== id);
    onUpdateParticipantsCb(newData);
  }, [data, onUpdateParticipantsCb]);

  const onAddCb = useCallback(() => {
    onUpdateParticipantsCb(data.concat({
      id: generateID(),
      name: '',
      email: ''
    }));
  }, [data, onUpdateParticipantsCb]);

  return (
    <Fragment>
      <TitleWrapper>
        Insert participants names
      </TitleWrapper>
      <Container>
        {data.map((d, i) => (
          <InputComponent
            key={`${d.id}_${i}`}
            label={`Name ${i+1}`}
            value={d}
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