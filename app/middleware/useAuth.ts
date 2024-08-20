// useAuth.ts
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUser } from '../../helpers/auth_helper';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser();

      if (!user) {
        router.replace('/login');
      }
    };

    checkAuth();
  }, [router]);
};

export default useAuth;
