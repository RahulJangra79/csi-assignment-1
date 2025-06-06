import React from 'react';
import { useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', fontFamily: 'Arial' }}>
      <h2 style={{ marginBottom: '20px' }}>Form Submitted Successfully</h2>
      <pre style={{ backgroundColor: '#f4f4f4', padding: '15px', borderRadius: '5px' }}>
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
};

export default Success;