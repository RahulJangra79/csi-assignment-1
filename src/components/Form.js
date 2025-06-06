import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

const countries = {
  India: ['Delhi', 'Mumbai', 'Chennai'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal']
};

const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
const validatePhone = (phone) => /^\+\d{1,3} \d{10}$/.test(phone);
const validatePan = (pan) => /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
const validateAadhar = (aadhar) => /^\d{12}$/.test(aadhar);
const validatePassword = (password) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    showPassword: false,
    phone: '',
    country: '',
    city: '',
    pan: '',
    aadhar: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.firstName) errs.firstName = 'First name is required';
    if (!formData.lastName) errs.lastName = 'Last name is required';
    if (!formData.username) errs.username = 'Username is required';
    if (!formData.email || !validateEmail(formData.email)) errs.email = 'Valid email required';
    if (!formData.password || !validatePassword(formData.password)) errs.password = 'Password must be at least 8 characters, include uppercase, lowercase, number, and special character';
    if (!formData.phone || !validatePhone(formData.phone)) errs.phone = 'Valid phone number required';
    if (!formData.country) errs.country = 'Country is required';
    if (!formData.city) errs.city = 'City is required';
    if (!formData.pan || !validatePan(formData.pan)) errs.pan = 'Valid PAN required';
    if (!formData.aadhar || !validateAadhar(formData.aadhar)) errs.aadhar = 'Valid Aadhar required';
    return errs;
  };

  useEffect(() => {
    const validationErrors = validate();
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setTouched({
      firstName: true,
      lastName: true,
      username: true,
      email: true,
      password: true,
      phone: true,
      country: true,
      city: true,
      pan: true,
      aadhar: true
    });
    if (Object.keys(validationErrors).length === 0) {
      navigate('/success', { state: formData });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>User Registration</h1>
      {['firstName', 'lastName', 'username', 'email', 'pan', 'aadhar'].map(field => (
        <div key={field} className="form-group">
          <input
            type="text"
            name={field}
            placeholder={field.replace(/([A-Z])/g, ' $1')}
            value={formData[field]}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched[field] && errors[field] && <span className="error">{errors[field]}</span>}
        </div>
      ))}

      <div className="form-group">
        <input
          type={formData.showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label>
          <input
            type="checkbox"
            onChange={() => setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }))}
          /> Show Password
        </label>
        {touched.password && errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="phone"
          placeholder="+91 1234567890"
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {touched.phone && errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <select name="country" value={formData.country} onChange={handleChange} onBlur={handleBlur}>
          <option value="">Select Country</option>
          {Object.keys(countries).map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        {touched.country && errors.country && <span className="error">{errors.country}</span>}
      </div>

      <div className="form-group">
        <select name="city" value={formData.city} onChange={handleChange} onBlur={handleBlur}>
          <option value="">Select City</option>
          {countries[formData.country]?.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        {touched.city && errors.city && <span className="error">{errors.city}</span>}
      </div>

      <button type="submit" disabled={!isFormValid}>
        Submit
      </button>
    </form>
  );
};

export default Form;