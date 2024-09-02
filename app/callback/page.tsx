"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleCallback } from '../../helpers/auth_helper';
import { Spin } from 'antd';

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    handleCallback()
      .then(() => {
        router.push('/u');
      })
      .catch((error) => {
        console.error('Callback handling failed:', error);
      });
  }, [router]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spin tip="Loading...please wait" />
    </div>
  );
};

export default CallbackPage;
