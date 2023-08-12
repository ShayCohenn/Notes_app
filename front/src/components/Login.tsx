import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectLogin, loginAsync, setLog } from '../redux/LoginSlicer';

const Login = () => {
  const loginStatus = useAppSelector(selectLogin);
  const dispatch = useAppDispatch();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  useEffect(() => {
    const access = localStorage.getItem('access');
    if (access) {
      dispatch(setLog());
    }
  }, [dispatch]);

  const handleLogin = () => {
    dispatch(loginAsync({ user, pwd }));
  };

  const handleLogout = () => {
    // Clear token from local storage
    localStorage.removeItem('access');
    dispatch(setLog());
  };

  return (
    <div>
      {loginStatus.status === 'logged' ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <div>
          Username:
          <input onChange={(e) => setUser(e.target.value)} />
          Password:
          <input type="password" onChange={(e) => setPwd(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
