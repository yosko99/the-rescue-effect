import React from 'react';

interface Props {
    label: string;
    name: string;
    type?: string;
    value: string | number;
}

const CustomInputWithLabel:React.FC<Props> = ({ label, name, type, value }) => {
  return (
        <div className="form-group py-2">
            <label htmlFor={name}>{label}</label>
            <input
                type={type !== undefined ? type : 'text'}
                required
                className="form-control"
                name={name}
                id={name}
                defaultValue={value}
                placeholder={label}
            />
        </div>
  );
};

export default CustomInputWithLabel;
