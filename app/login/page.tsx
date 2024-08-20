// app/login/page.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../../helpers/auth_helper';

const LoginPage = () => {
  const router = useRouter();
  const [infoMessage, setInfoMessage] = useState('Initializing...');

  useEffect(() => {
    setInfoMessage('Redirecting to login...');
    login();
  }, []);

  return (
    <div>
      <p>{infoMessage}</p>
    </div>
  );
};

export default LoginPage;
