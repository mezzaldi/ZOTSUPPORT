// SignInPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleStudentClick = () => {
    // Redirect to the student dashboard
    navigate('/SignIn/dashboard/student');
  };

  const handleAdminClick = () => {
    // Redirect to the admin dashboard
    navigate('/SignIn/dashboard/admin');
  };

  return (
    <div className='pageContent'>
      <h1>Sign in</h1>
      <h2>I am a...</h2>
      <button onClick={handleStudentClick}>Student</button>
      <button onClick={handleAdminClick}>Administrator</button>
    </div>
  );
};

export default SignInPage;
