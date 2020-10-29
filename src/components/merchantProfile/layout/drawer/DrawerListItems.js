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
    text: 'مالی',
    icon: <ListIcon iconName="ic-ecommerce-money.svg" />,
    isExpand: false,
    id: uuid(),
    subListItems: null,
  },
  {
    text: 'فروشگاه',
    icon: <ListIcon iconName="merchantManagment.svg" />,
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
      { text: 'اطلاعات کاربری', id: uuid(), link: '/merchant/profile' },
      { text: 'اطلاعات تجاری', id: uuid(), link: '/merchant/businessProfile' },
    ],
  },
];

export const decoojIcons = [
  {
    text: '',
    icon: <img src="/images/decooj.svg" alt="decoojIcon" />,
    id: uuid(),
  },
  {
    text: 'داشبورد',
    icon: <ListIcon iconName="dashboard.svg" />,
    id: uuid(),
  },
];
