import React from 'react';

import { Spinner } from 'react-bootstrap';

interface Props {
    height: string;
}

const Loading:React.FC<Props> = ({ height }) => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height }}>
        <Spinner />
    </div>
  );
};

export default Loading;
