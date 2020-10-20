import React from 'react';
import uuid from 'react-uuid'
export const drawerListItems = [
  {
    text: 'محصولات',
    icon: <img src="/images/products.svg" alt="products" />,
    open: false,
    id: uuid(),
  },
  {
    text: 'سفارشات',
    icon: <img src="/images/orders.svg" alt="orders" />,
    open: false,
    id: uuid(),
  },
  {
    text: 'مالی',
    icon: <img src="/images/ic-ecommerce-money.svg" alt="e-commerce" />,
    open: false,
    id: uuid(),
  },
  {
    text: 'فروشگاه',
    icon: <img src="/images/store.svg" alt="store" />,
    open: false,
    id: uuid(),
  },

  {
    text: 'تنظیمات',
    icon: <img src="/images/settings.svg" alt="settings" />,
    open: false,
    id: uuid(),
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
    icon: <img src="/images/ic-layout-left-menu.png" alt="dashboard" />,
    id: uuid(),
  },
];
