// import
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Drawer from '../../src/components/merchantProfile/drawer/Drawer';
const Profile = () => {
  // Route :
  // const router = useRouter();
  // useEffect :
  // useEffect(() => {
  //   getUser();
  // }, []);
  // const getUser = () => {
  //   try {
  //     const jwt = localStorage.getItem('token');
  //     console.log('Token', jwt);
  //     if (!jwt) {
  //       router.push('/merchant/signUp');
  //     }
  //   } catch (error) {}
  // };
  return (
    <>
      <Drawer/>
    </>
  );
};

export default Profile;
