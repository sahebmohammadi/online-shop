import http from './httpServices';

const apiEndPoint = process.env.apiUrl + '/uploader/image';

export const imageUploader = (user) => {
  const { token, galleryImage } = user;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const formData = new FormData();
  formData.append('gallery', galleryImage);
  return http.post(apiEndPoint, formData, header);
};
