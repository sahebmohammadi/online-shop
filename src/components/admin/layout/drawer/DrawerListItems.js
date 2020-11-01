import React from 'react';
import uuid from 'react-uuid';
import ListIcon from './ListIcon';

export const drawerListItems = [
  {
    text: 'محصولات',
    icon: <ListIcon iconName="products.svg" />,
    isExpand: false,
    id: uuid(),
    subListItems: null,
  },
  {
    text: 'سفارشات',
    icon: <ListIcon iconName="orders.svg" />,
    isExpand: false,
    id: uuid(),
    subListItems: null,
  },
  {
    text: 'مدیریت کاربران',
    icon: <ListIcon iconName="userManagment.svg" />,
    isExpand: false,
    id: uuid(),
    subListItems: null,
  },
  {
    text: 'مدیریت پیشه وران',
    icon: <ListIcon iconName="merchantManagment.svg" />,
    isExpand: false,
    id: uuid(),
    subListItems: null,
  },
  {
    text: 'مالی',
    icon: <ListIcon iconName="ic-ecommerce-money.svg" />,
    isExpand: false,
    id: uuid(),
    subListItems: null,
  },
  {
    text: 'تنظیمات',
    icon: <ListIcon iconName="settings.svg" />,
    isExpand: false,
    id: uuid(),
    subListItems: [
      { text: 'مدیریت دسته بندی ها', id: uuid(), link: '/merchant/profile' },
      { text: 'تنظیمات لندیگ', id: uuid(), link: '/merchant/businessProfile' },
    ],
  },
  {
    text: 'پشتیبانی',
    icon: <ListIcon iconName="support.svg" />,
    isExpand: false,
    id: uuid(),
    subListItems: null,
  },
];

export const decoojIcons = [
  {
    text: '',
    icon: <img src="/images/merchantCI/decooj.svg" alt="dashboard" />,
    id: uuid(),
  },
  {
    text: 'داشبورد',
    icon: <ListIcon iconName="dashboard.svg" />,
    id: uuid(),
  },
];
