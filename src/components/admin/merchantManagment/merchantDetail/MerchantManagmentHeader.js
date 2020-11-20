import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Select from 'react-select';
import classes from './merchantManagmentHeader.module.scss';
import clx from 'classnames';
import { activateMerchantProfile } from 'services/activateMerchantProfileService';
import { toast } from 'react-toastify';
import { merchantDetail } from '../../../../../constants';

const { header, toasts } = merchantDetail;
const { error, warn, success } = toasts;
const {
  title,
  selectLabel,
  pending,
  active,
  inActive,
  remove,
  back,
  store,
  confirm,
} = header;
const options = [
  { value: '0', label: inActive },
  { value: '1', label: pending },
  { value: '2', label: active },
];
const toastStatus = (status) => {
  switch (status) {
    case 0:
      return toast.error(error);
      break;
    case 1:
      return toast.warn(warn);
      break;
    case 2:
      return toast.success(success);
      break;
    default:
      return '';
      break;
  }
};
const style = {
  control: (base) => ({
    ...base,
    border: 0,
    outline: 'none',
    borderRadius: 0,
    width: '200px',
    height: '37px',
    backgroundColor: 'none',
    // This line disable the blue border
    boxShadow: 'none',
  }),
};

const MerchantManagmentHeader = () => {
  const [status, setStatus] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setStatus(e.value);
  };
  const handleMerchantStatus = async (newStatus) => {
    try {
      const id = router.query.id;
      const token = localStorage.getItem('token');
      const { data: responseData } = await activateMerchantProfile(token, id, newStatus);
      const { user } = responseData.data;
      const { profile } = user;
      console.log(profile.status);
      toastStatus(profile.status);
    } catch (error) {}
  };
  const handleDeteleMerchant = async () => {
    try {
      const id = router.query.id;
      const token = localStorage.getItem('token');
      const { data: responseData } = await activateMerchantProfile(token, id, '0');
      const { profile } = responseData.data;
      toastStatus(profile.status);
    } catch (error) {}
  };

  return (
    <div>
      <div className={classes.header}>
        <p>{title} </p>
        <div className={classes.buttonGroup}>
          <button
            onClick={handleDeteleMerchant}
            className={clx(classes.delete, classes.button)}
          >
            {remove}
          </button>
          <Link href="#">
            <a>
              <button className={classes.button}>{store}</button>
            </a>
          </Link>
          <Link href="/admin/merchant-managment">
            <a>
              <button className={classes.button}>{back}</button>
            </a>
          </Link>
        </div>
      </div>
      <div className={classes.merchantOperations}>
        <div className={classes.formControl}>
          <label>{selectLabel}</label>
          <Select
            instanceId={selectLabel}
            styles={style}
            className={classes.select}
            placeholder={selectLabel}
            options={options}
            onChange={handleChange}
          />
        </div>
        <button className={classes.verify} onClick={() => handleMerchantStatus(status)}>
          {confirm}
        </button>
      </div>
    </div>
  );
};

export default MerchantManagmentHeader;
