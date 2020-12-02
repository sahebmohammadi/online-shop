import http from './httpServices';
const apiEndPoint = process.env.apiUrl + '/tag/get?type=';

export const getTags = (token, type) => {
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return http.get(apiEndPoint + type, header);
};
