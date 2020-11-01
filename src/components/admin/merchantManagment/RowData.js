import { Avatar } from '@material-ui/core';
import uuid from 'react-uuid';

export const columns = [
  { name: '#', id: uuid() },
  { name: '', id: uuid() },
  { name: 'نام پیشه ور', id: uuid() },
  { name: 'نام کاربری', id: uuid() },
  { name: 'نام فروشگاه', id: uuid() },
  { name: 'وضعیت پروفایل', id: uuid() },
  { name: 'وضعیت فروشگاه', id: uuid() },
  { name: '', id: uuid() },
  { name: 'عملیات', id: uuid() },
  { name: '', id: uuid() },
];
export const rows = [
  {
    number: '1',
    profileImage: <Avatar />,
    merchantName: 'صاحب',
    userName: 'ex@d.com',
    storeName: 'سخانخ',
    profileStatus: 'غیر فعال',
    storeStatus: 'فعال',
    id: uuid(),
    link : "#"
  },
  {
    number: '2',
    profileImage: <Avatar />,
    merchantName: 'صاحب',
    userName: 'ex@d.com',
    storeName: 'سخانخ',
    profileStatus: 'غیر فعال',
    storeStatus: 'فعال',
    id: uuid(),
    link : "#"
  },
  {
    number: '3',
    profileImage: <Avatar />,
    merchantName: 'صاحب',
    userName: 'ex@d.com',
    storeName: 'سخانخ',
    profileStatus: 'غیر فعال',
    storeStatus: 'فعال',
    id: uuid(),
    link : "#"
  },
  {
    number: '4',
    profileImage: <Avatar />,
    merchantName: 'صاحب',
    userName: 'ex@d.com',
    storeName: 'سخانخ',
    profileStatus: 'غیر فعال',
    storeStatus: 'فعال',
    id: uuid(),
    link : "#"
  },
  {
    number: '5',
    profileImage: <Avatar />,
    merchantName: 'صاحب',
    userName: 'ex@d.com',
    storeName: 'سخانخ',
    profileStatus: 'غیر فعال',
    storeStatus: 'فعال',
    id: uuid(),
    link : "#"
  },
  {
    number: '6',
    profileImage: <Avatar />,
    merchantName: 'صاحب',
    userName: 'ex@d.com',
    storeName: 'سخانخ',
    profileStatus: 'غیر فعال',
    storeStatus: 'فعال',
    id: uuid(),
    link : "#"
  },
  {
    number: '6',
    profileImage: <Avatar />,
    merchantName: 'صاحب',
    userName: 'ex@d.com',
    storeName: 'سخانخ',
    profileStatus: 'غیر فعال',
    storeStatus: 'فعال',
    id: uuid(),
    link : "#"
  },
];
