import React, { useEffect, useState } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import { getMerchantData } from 'services/getMerchantService';

const SubListBadge = ({ name, id }) => {
  const [isProfile, setIsProfile] = useState(null);
  //usEffect : decode token to get user Id
  useEffect(() => {
    getMerchant();
  }, [isProfile]);
  const getMerchant = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data: responseData } = await getMerchantData(token);
      const { user } = responseData.data;
      const { profile } = user;
      setIsProfile(profile);
    } catch (error) {}
  };

  return (
    <>
      <span>{name}</span>
      {!isProfile ? <ErrorIcon color="error" /> : null}
    </>
  );
};

export default SubListBadge;
