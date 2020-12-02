import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from 'src/components/admin/layout/Layout';
import AttributeEdit from 'src/components/admin/attributes/AttributeEdit';
import axios from 'axios';

const AttributeEditPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [attributeData, setAttributeData] = useState(null);

  const getAttributeInfo = async () => {
    try {
      const res = await axios.get(`${process.env.apiUrl}/attribute/${id}`);
      const stateData = res.data.data.attribute;
      setAttributeData(stateData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAttributeInfo();
  }, []);

  return (
    <Layout>
      <AttributeEdit attribute={attributeData} />
    </Layout>
  );
};

export default AttributeEditPage;
