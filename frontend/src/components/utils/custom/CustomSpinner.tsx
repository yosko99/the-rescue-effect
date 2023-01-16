import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

const CustomSpinner = () => {
  return (
    <div className='d-flex justify-content-center py-2'>
        <Spinner animation="border" />
    </div>
  );
};

export default CustomSpinner;
