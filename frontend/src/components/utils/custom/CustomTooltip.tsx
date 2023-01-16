import React, { useRef, useState } from 'react';

import { Button, Overlay, Tooltip } from 'react-bootstrap';
import { Placement } from 'react-bootstrap/esm/types';

interface Props {
    buttonText: string;
    body: React.ReactNode;
    placement: Placement;
    buttonClassName?: string;
}

const CustomTooltip:React.FC<Props> = ({ body, buttonText, placement, buttonClassName }) => {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  return (
    <>
        <Button className={buttonClassName} ref={target} onClick={() => setShow(!show)}>
            {buttonText}
        </Button>
        <Overlay target={target.current} show={show} placement={placement}>
            <Tooltip>
                {body}
            </Tooltip>
        </Overlay>
    </>
  );
};

export default CustomTooltip;
