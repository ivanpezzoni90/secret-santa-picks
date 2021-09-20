import styled from 'styled-components';

const ElementLabel = styled.label``;
const ElementWrapper = styled.div`
  padding: 0.5em;
`;
const LabelTextWrapper = styled.span`
  padding-right: 0.5em;
`;

const Element = ({ label, children }) => {
  return (
    <ElementWrapper>
      <ElementLabel>
        <LabelTextWrapper>
          { label }
        </LabelTextWrapper>
        { children }
      </ElementLabel>
    </ElementWrapper>
  );
};

export default Element;