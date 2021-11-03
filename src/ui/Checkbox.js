import React from 'react'
import styled from 'styled-components'
import Element from './Element';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`

const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`;
const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

const StyledCheckbox = styled.div`
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  background: ${props => (props.checked ? '#ba0c2f' : '#fff')};
  border-radius: 3px;
  border: 1px solid #666;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px #dedede;
  }

  ${Icon} {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')}
  }
`;

const Checkbox = ({ className, checked, label, ...props }) => (
  <Element
    label={label}
  >
    <CheckboxContainer
      className={className}
    >
      <HiddenCheckbox
        checked={checked}
        {...props}
      />
      <StyledCheckbox
        checked={checked}
      >
        <Icon viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </Icon>
      </StyledCheckbox>
    </CheckboxContainer>
</Element>

)

export default Checkbox
