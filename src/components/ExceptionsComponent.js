import styled from 'styled-components';
import React, { Fragment, useCallback, useMemo } from 'react';
import Select from 'react-select';

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
    min-width: 20em;
    max-width: 20em;
`;
const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: .5em;
`;
const TitleWrapper = styled.div`
    padding: 1em 0;
    font-weight: 600;
    color: #666;
`;

const mapArrayToLabelValue = a => a.map(n => ({
    label: n,
    value: n
}));

const AddException = ({ value, names, onChange, index }) => {
    const {
        name,
        exceptions,
        id
    } = value;

    const filteredNames = names.filter(n => n !== name);
    const availableNames = mapArrayToLabelValue(
        filteredNames
    );
    const mappedExceptions = mapArrayToLabelValue(exceptions);

    const onSelectChange = useCallback((options) => {
        const newValues = options.map(o => o.value);
        onChange(newValues, index);
    }, [onChange, index]);

    return (
        <AddExceptionWrapper>
            <NameWrapper>
        Exceptions for {name}:
            </NameWrapper>
            <SelectWrapper>
                <Select
                    className="basic-multi-select"
                    classNamePrefix="select"
                    options={availableNames}
                    isMulti
                    defaultValue={mappedExceptions}
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
                        key={`${d.id}_${i}`}
                        names={names}
                        value={d}
                        index={i}
                        onChange={onExeptionsChange}
                    />
                ))}
            </Container>
        </Fragment>
    );
};

ExceptionsComponent.defaultProps = {

};

export default ExceptionsComponent;