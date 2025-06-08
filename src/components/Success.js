import { useLocation } from 'react-router-dom';
import './Success.css';

const Success = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div className="success-container">
      <h2>Form Submitted Successfully</h2>
      <div className="success-box">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
};

export default Success;
