import React, { useState } from 'react';

import { Button, Toast } from 'react-bootstrap';

interface Props {
    buttonText: string;
    title: string;
    body: string;
}

const CustomToast:React.FC<Props> = ({ buttonText, title, body }) => {
  const [showA, setShowA] = useState(false);

  const toggleShowA = () => setShowA(!showA);

  return (
    <>
        <Button onClick={toggleShowA} className="mb-2">
            {buttonText}
        </Button>
        <Toast show={showA} onClose={toggleShowA}>
            <Toast.Header>
                {title}
            </Toast.Header>
            <Toast.Body>
                {body}
            </Toast.Body>
        </Toast>
    </>
  );
};

export default CustomToast;
