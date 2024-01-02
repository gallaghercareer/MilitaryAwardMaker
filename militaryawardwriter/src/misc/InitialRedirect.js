import React, { useEffect } from 'react';

const InitialRedirect = () => {
  useEffect(() => {
    window.location.href = 'https://www.externaldomain.com';
  }, []);

  return (
    <div>Loading...</div>
  );
};

export default InitialRedirect;
