import React from 'react'
const TextError = (props) => {
    return ( 
        <div className="error">
            {props.children}
        </div>
     );
}
 
export default TextError;