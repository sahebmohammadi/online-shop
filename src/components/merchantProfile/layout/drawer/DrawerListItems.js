import React from 'react';
import uuid from 'react-uuid';
import ListIcon from './ListIcon';
import SubListBadge from './SubListBadge';
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
    subListItems: [{text: 'فروشگاه', id: uuid(), link: '/merchant/store'}],
  },

  {
    text: 'تنظیمات',
    icon: <ListIcon iconName="settings.svg" />,
    isExpand: false,
    id: uuid(),
    subListItems: [
      {
        text: <SubListBadge name="اطلاعات کاربری" id={1} />,
        id: uuid(),
        link: '/merchant/profile',
      },
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
