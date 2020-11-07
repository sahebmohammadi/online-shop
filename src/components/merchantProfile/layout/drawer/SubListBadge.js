import React, { useEffect, useState } from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import { getMerchantData } from 'services/getMerchantService';

const SubListBadge = ({ name, id }) => {
  const [isProfile, setIsProfile] = useState(null);
  const [isBusiness, setIsBusiness] = useState(null);
  //usEffect : decode token to get user Id
  useEffect(() => {
    getMerchant();
  }, [isProfile, isBusiness]);
  const getMerchant = async () => {
    try {
      const jwt = localStorage.getItem('token');
      const { data: responseData } = await getMerchantData(jwt);
      const { user } = responseData.data;
      const { profile, business } = user[0];
      setIsProfile(profile);
      setIsBusiness(business);
    } catch (error) {}
  };

  const condition = (id) => {
    if (id === 1) {
      return isProfile;
    }
    if (id === 2) {
      return isBusiness;
    }
  };
  return (
    <>
      <span>{name}</span>
      {!condition(id) ? <ErrorIcon color="error" /> : null}
    </>
  );
};

export default SubListBadge;
