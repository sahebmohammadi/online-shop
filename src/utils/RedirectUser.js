import { getMerchantData } from 'services/getMerchantService';

const RedirectUser = async (router, pageLink, notAuthorized = null) => {
  try {
    const jwt = localStorage.getItem('token');
    if (jwt) {
      const { data: responseData } = await getMerchantData(jwt);
      const { user } = responseData.data;
      const { type } = user[0];
      if (type === 'admin') {
        router.push(`/admin/${pageLink}`);
      } else {
        router.push(`/merchant/${pageLink}`);
      }
    } else {
      if (notAuthorized) {
        router.push(notAuthorized);
      }
    }
  } catch (error) {}
};
export default RedirectUser;
