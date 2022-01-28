import styled from 'styled-components';
import React, { Fragment, useCallback, useMemo } from 'react';
import { MultiSelect } from "react-multi-select-component";

const AddExceptionWrapper = styled.div`
  padding-bottom: 1em;
  display: flex;
`;
const NameWrapper = styled.div`
  padding: 0.5em 1.5em 0.5em 0.5em;
  display: flex;
  align-items: center;
  flex: 1;
`;
const SelectWrapper = styled.div`
  padding: 0.5em;
  min-width: 10em;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: .5em;
`;
const TitleWrapper = styled.div`
  padding-bottom: 1em;
`;

const AddException = ({ name, exc = [], names, onChange, index }) => {
  const availableNames = names
    .filter(n => n !== name)
    .map(n => ({
      label: n,
      value: n
    }));

  const onSelectChange = useCallback((options) => {
    const newValues = options.map(o => o.value);
    onChange(newValues, index);
  }, [onChange, index]);

  return (
    <AddExceptionWrapper>
      <NameWrapper>
        {name}
      </NameWrapper>
      <SelectWrapper>
        <MultiSelect
          options={availableNames}
          hasSelectAll={false}
          value={exc}
          onChange={onSelectChange}
        />
      </SelectWrapper>
    </AddExceptionWrapper>
  );
};

const ExceptionsComponent = (props) => {
  const {
    onUpdateExceptions,
    data
  } = props;

  const names = data.map(a => a.name);

  const onExeptionsChange = useCallback((exc, index) => {
    console.log(exc, index);
    onUpdateExceptions(exc, index);
  }, [onUpdateExceptions]);

  return (
    <Fragment>
      <TitleWrapper>
        Insert exceptions (optional)
      </TitleWrapper>
      <Container>
        {data.map((d, i) => (
          <AddException
            key={`${d.name}_${i}`}
            name={d.name}
            names={names}
            exc={d.exceptions}
            index={i}
            onChange={onExeptionsChange}
          />
        ))}
      </Container>
    </Fragment>
  )
};

ExceptionsComponent.defaultProps = {

};

export default ExceptionsComponent;