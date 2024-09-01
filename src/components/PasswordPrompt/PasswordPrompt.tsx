import React, { useState, useEffect } from 'react';

const PasswordPrompt: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const env = process.env.REACT_APP_ENV;
    const password = process.env.REACT_APP_PASSWORD;

    console.log('Environment:', env); // Debugging line
    console.log('Password:', password); // Debugging line

    if (env !== 'dev') {
      console.log('Prompting for password'); // Debugging line
      const enteredPassword = window.prompt('Please enter the password to access this site:');
      console.log('Entered Password:', enteredPassword); // Debugging line
      if (enteredPassword === password) {
        setIsAuthenticated(true);
      } else {
        alert('Incorrect password!');
        window.location.reload();
      }
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default PasswordPrompt;