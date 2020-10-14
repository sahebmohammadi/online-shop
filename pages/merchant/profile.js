// import
import { useRouter } from 'next/router';
import { useEffect } from 'react';
const Profile = () => {
  // Route :
  const router = useRouter();
  // useEffect :
  useEffect(() => {
    getUser();
  }, []);
  const getUser = () => {
    try {
      const jwt = localStorage.getItem('token');
      console.log('Token', jwt);
      if (!jwt) {
        router.push('/merchant/signUp');
      }
    } catch (error) {}
  };
  return (
    <>
      <h1>
        Congrats, You have already registered successfully, Let's complete your profile
      </h1>
    </>
  );
};

export default Profile;
