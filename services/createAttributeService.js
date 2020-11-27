import http from './httpServices';

const apiEndPoint = process.env.apiUrl + '/admin/attribute';

export const createAttribute = (attr) => {
  const {
    name,
    attribute_types_id,
    units_id,
    token,
  } = attr;
  const header = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const formData = new FormData();
  formData.append('name', name);
  formData.append('attribute_types_id', attribute_types_id);
  formData.append('units_id', units_id);

  return http.post(apiEndPoint, formData, header);
};
