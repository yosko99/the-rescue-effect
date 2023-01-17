import React from 'react';

const Footer = () => {
  return (
    <div className='bg-black text-center text-white m-0 mt-3'>
        <p className='p-2 m-0'>
            Copyiright
            <span
              role={'button'}
              className='ms-2'
              onClick={() => { window.location.href = 'https://github.com/yosko99'; }}
            >
                @yosko99
            </span>
        </p>
    </div>
  );
};

export default Footer;
