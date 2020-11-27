import http from './httpServices';

const apiEndPoint = process.env.apiUrl + '/admin/attribute/value';

export const addAttributeValue = (attr) => {
  const {
    name,
    main_attribute_id,
    value,
    image_id,
    token,
  } = attr;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const formData = new FormData();
  formData.append('name', name);
  formData.append('main_attribute_id', main_attribute_id);
  formData.append('value', value);
  formData.append('image_id', image_id);

  return http.post(apiEndPoint, formData, header);
};
