import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Select from 'react-select';
import classes from './storeManagmentHeader.module.scss';
import clx from 'classnames';
import { activateMerchantStore } from 'services/activateMerchantStoreService';
import { toast } from 'react-toastify';
import { merchantDetail } from '../../../../../../constants';
import FormDialog from '../FormDialog';
const { header, toasts } = merchantDetail;
const { error, warn, success } = toasts;
const {
  title,
  profile,
  storeSelectLabel,
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

const StoreManagmentHeader = ({ merchantId }) => {
  const [status, setStatus] = useState(null);
  // ? dialog state
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setStatus(e.value);
  };
  const handleMerchantStatus = async (newStatus) => {
    try {
      // newStatus === '0' && await handleClickOpen();
      if (newStatus === '0') {
        handleClickOpen();
      } else {
        const id = router.query.id;
        const token = localStorage.getItem('token');
        const { data: responseData } = await activateMerchantStore(token, id, newStatus);
        const { user } = responseData.data;
        const { store } = user;
        // console.log(profile.status);
        toastStatus(store.status);
      }
    } catch (error) {}
  };

  // ? handler for Dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteMerchant = async () => {
    try {
      const id = router.query.id;
      const token = localStorage.getItem('token');
      const { data: responseData } = await activateMerchantStore(token, id, '0', message);
      const { user } = responseData.data;
      const { store } = user;
      // console.log(profile.status);
      toastStatus(store.status);
    } catch (error) {}
    setOpen(false);
  };
  const handleRemoveMerchant = async () => {
    await handleMerchantStatus('0');
  };
  return (
    <div>
      <FormDialog
        open={open}
        onClose={handleClose}
        setMessage={setMessage}
        message={message}
        onDelete={handleDeleteMerchant}
      />
      <div className={classes.header}>
        <p>{title} </p>
        <div className={classes.buttonGroup}>
          <button
            onClick={handleRemoveMerchant}
            className={clx(classes.delete, classes.button)}
          >
            {remove}
          </button>

          <Link
            as={`/admin/merchant-profile/${merchantId}`}
            href="/admin/merchant-profile/[id]"
          >
            <a>
              <button className={classes.button}>{profile}</button>
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
          <label>{storeSelectLabel}</label>
          <Select
            instanceId={storeSelectLabel}
            styles={style}
            className={classes.select}
            placeholder={storeSelectLabel}
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

export default StoreManagmentHeader;
