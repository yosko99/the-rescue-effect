import React, { useState } from 'react';

import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface IRadioButton {
    value: string
    label: string
}

interface Props {
    buttonData: IRadioButton[]
    name: string;
}

const CustomRadioButton: React.FC<Props> = ({ buttonData, name }) => {
  const [radioValue, setRadioValue] = useState(buttonData[0].value);

  return (
    <ButtonGroup>
    {buttonData.map((button, index: number) => (
      <ToggleButton
        key={index}
        id={button.value}
        type="radio"
        variant={button.value === radioValue ? 'primary' : 'info'}
        name={name}
        value={button.value}
        checked={radioValue === button.value}
        onChange={(e) => setRadioValue(e.currentTarget.value)}
      >
        {button.label}
      </ToggleButton>
    ))}
  </ButtonGroup>
  );
};

export default CustomRadioButton;
