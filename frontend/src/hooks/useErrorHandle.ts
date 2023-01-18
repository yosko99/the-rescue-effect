import React from 'react';

import { useNavigate } from 'react-router-dom';

const useErrorHandle = (error: Error | undefined) => {
  const navigate = useNavigate();

  if (error !== undefined) {
    localStorage.clear();
    navigate('/404', {
      state: {
        message: error?.message
      }
    });
  }
};

export default useErrorHandle;
