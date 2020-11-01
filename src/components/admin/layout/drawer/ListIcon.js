import React, { useState } from 'react';

const ListIcon = ({ iconName }) => {
  const [over, setOver] = useState(false);
  const buttonStyle = {
    width: '37px',
    height: '37px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#052971',
    borderRadius: '100%',
  };
  const iconStyle = {
    height: '24px',
    width: '24px',
    display: 'inline-block',
    backgroundImage: `url('/images/merchantCI/${iconName}')`,
    backgroundSize: 'cover',
  };
  if (over) {
    buttonStyle.backgroundColor = '#f99300';
    iconStyle.backgroundImage = `url('/images/${iconName}')`;
  }
  return (
    <div
      onMouseOver={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      onClick={() => setOver(true)}
      // onFocus = {()=>setOver(true)}
      style={buttonStyle}
    >
      <div style={iconStyle}></div>
    </div>
  );
};

export default ListIcon;
