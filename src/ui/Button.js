import styled from 'styled-components';

const ButtonElement = styled.button`
  padding: ${props => props.padding};
  border-radius: ${props => props.borderRadius};
  background-color: ${props => props.color};
  &:hover {
    background-color: ${props => props.hoverColor};
  }
  color: ${props => props.textColor};
  font-size: ${props => props.fontSize};
  border: none;
  ${props => props.disabled
    ? (`
      opacity: 0.5;
      pointer-events: none,
      cursor: not-allowed
    `)
    : ''
  }
`;

const Button = ({
  padding,
  borderRadius,
  color,
  hoverColor,
  textColor,
  fontSize,

  disabled,
  label,
  onClick
}) => {
  return (
    <ButtonElement
      padding={padding}
      borderRadius={borderRadius}
      color={color}
      hoverColor={hoverColor}
      textColor={textColor}
      fontSize={fontSize}

      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </ButtonElement>
  );
};

Button.defaultProps = {
  padding: '1em',
  borderRadius: '.5em',
  color: '#ba0c2f',
  hoverColor: '#d4183e',
  textColor: 'white',
  fontSize: '18px'
}

export default Button;