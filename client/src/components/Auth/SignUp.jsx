import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { GoogleLogin } from '@react-oauth/google';
import api from '../../utils/axios';
import './Auth.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/signup', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/dashboard');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Error during signup');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post('/auth/google', {
        credential: credentialResponse.credential
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (error) {
      setError('Google signup failed. Please try again.');
    }
  };

  const handleGoogleError = () => {
    setError('Google signup failed. Please try again.');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Sign Up</h2>
          <p>Create your account to get started</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="input-icon">
              <MdPerson />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <MdEmail />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <MdLock />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-icon">
              <MdLock />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength="6"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        <div className="google-auth-container">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap={false}
            type="standard"
            theme="filled_blue"
            size="large"
            width="250"
          />
        </div>

        <div className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp; 