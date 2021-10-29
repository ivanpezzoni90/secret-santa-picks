import styled from 'styled-components';

import React, { useCallback, useState } from 'react';
import Element from '../ui/Element';

const NamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5em;
`;
const ElementWrapper = styled.div`
  padding-right: 0.5em;
  width: 10em;
`;
const Input = styled.input``;
const Button = styled.button`
  padding: 1em;
  border-radius: .5em;
  background-color: #ba0c2f;
  &:hover {
    background-color: #d4183e;
  }
  color: white;
  font-size: 14px;
  border: none;
`;

const NameComponent = (props) => {
  const {
    nameObject,
    onChangeName,
    index
  } = props;

  const {
    name,
    email,
    exceptions
  } = nameObject;

  const onChange = useCallback((nameKey) => {
    return (newValue) => {
      const newName = Object.assign({}, nameObject, {
        [nameKey]: newValue.target.value
      });
      onChangeName(newName, index);
    }
  }, [index, nameObject, onChangeName]);

  return (
    <NameWrapper>
      <ElementWrapper>
        <Element
        >
          <Input
            onBlur={onChange('name')}
            defaultValue={name}
          />
        </Element>
      </ElementWrapper>
      <ElementWrapper>
        <Element
        >
          <Input
            onBlur={onChange('email')}
            defaultValue={email}
          />
        </Element>
      </ElementWrapper>
      <ElementWrapper>
        <Element
        >
          <Input
            onBlur={onChange('exceptions')}
            defaultValue={exceptions}
          />
        </Element>
      </ElementWrapper>
    </NameWrapper>
  )
};

const NewBlankName = {
  name: '',
  email: '',
  exceptions: ''
};

const AddNameComponent = () => {
  const [names, setNames] = useState([]);

  const onAddNameCb = useCallback(() => {
    const newNames = names.concat(NewBlankName);
    setNames(newNames);
  },[names]);

  const onChangeName = useCallback((newName, nameIndex) => {
    const newNames = names.map((n, i) => {
      if (i === nameIndex) {
        return newName;
      }
      return newName;
    });
    setNames(newNames);
  }, [names]);

  return (
    <NamesWrapper>
      <NameWrapper>
        <ElementWrapper>
          Name
        </ElementWrapper>
        <ElementWrapper>
          Email
        </ElementWrapper>
        <ElementWrapper>
          Exceptions
        </ElementWrapper>
      </NameWrapper>
      {names.map((n, i) => {
        return (
          <NameComponent
            key={`${n.name}_${n.email}`}
            index={i}
            nameObject={n}
            onChangeName={onChangeName}
          />
        )
      })}
    <Element>
      <Button
        onClick={onAddNameCb}
      >
        Add name
      </Button>
    </Element>
    </NamesWrapper>
  );
};

export default AddNameComponent;