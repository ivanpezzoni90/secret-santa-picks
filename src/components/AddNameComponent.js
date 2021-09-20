import styled from 'styled-components';

import React, { useCallback, useState } from 'react';
import Element from '../ui/Element';

const NamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const NewNameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5em;
`;
const ElementWrapper = styled.div`
  padding-right: 0.5em;
`;
const Input = styled.input``;

const NewNameComponent = (props) => {
  return (
    <NewNameWrapper>
      <ElementWrapper>
        <Element
          label="Name"
        >
          <Input
            onBlur={(e) => {console.log(e)}}
          />
        </Element>
      </ElementWrapper>
      <ElementWrapper>
        <Element
          label="Email"
        >
          <Input
            onBlur={(e) => {console.log(e)}}
          />
        </Element>
      </ElementWrapper>
      <ElementWrapper>
        <Element
          label="Exceptions"
        >
          <Input
            onBlur={(e) => {console.log(e)}}
          />
        </Element>
      </ElementWrapper>
    </NewNameWrapper>
  )
};


const AddNameComponent = (props) => {
  return (
    <NamesWrapper>
      <NewNameComponent/>
    </NamesWrapper>
  );
};

export default AddNameComponent;