"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleCallback } from '../../helpers/auth_helper';

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

  return <div>
    <h1>
      Loading...please wait
    </h1>
  </div>;
};

export default CallbackPage;
