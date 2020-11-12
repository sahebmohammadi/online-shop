import uuid from 'react-uuid';

export const columns = [
  { name: '#', id: uuid() },
  { name: 'نام ویژگی', id: uuid() },
  { name: 'نوع ویژگی', id: uuid() },
  { name: 'واحد', id: uuid() },
  { name: 'عملیات', id: uuid() },
];

export const rows = [
  {
    number: '1',
    name: 'test',
    type: 'test',
    unit: 'test'
  },
  {
    number: '2',
    name: 'test-2',
    type: 'test-2',
    unit: 'test-2'
  },
  {
    number: '3',
    name: 'test-3',
    type: 'test-3',
    unit: 'test-3'
  },
  {
    number: '4',
    name: 'test-4',
    type: 'test-4',
    unit: 'test-4'
  },
];
