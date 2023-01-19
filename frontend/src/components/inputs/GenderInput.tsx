import React from 'react';

import GENDERS from '../../constants/genders';
import CustomRadioButton from './CustomRadioButton';

interface Props {
  value: string | number;
}

const GenderInput:React.FC<Props> = ({ value }) => {
  return (
    <div className="form-group d-flex flex-column py-2">
        <label htmlFor='gender'>Gender</label>
        <CustomRadioButton value={value} name='gender' buttonData={GENDERS} />
    </div>
  );
};

export default GenderInput;
