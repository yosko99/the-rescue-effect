import React from 'react';

import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface IRadioButton {
    value: string
    label: string
}

interface Props {
    buttonData: IRadioButton[]
    name: string;
    value: string | number;
}

const CustomRadioButton: React.FC<Props> = ({ buttonData, name, value }) => {
  return (
    <ButtonGroup>
    {buttonData.map((button, index: number) => (
      <ToggleButton
        key={index}
        id={button.value}
        type="radio"
        variant={button.value === value ? 'primary' : 'light'}
        name={name}
        value={button.value}
        checked={button.value === value}
      >
        {button.label}
      </ToggleButton>
    ))}
  </ButtonGroup>
  );
};

export default CustomRadioButton;
