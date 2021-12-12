import React from 'react'

interface InputProps {
    icon?: any;
}

const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <>
      <div className='input-container'>
        <span>{props.icon ? props.icon : null}</span>
        <input type="text" />
      </div>
    </>
  )
}

export default Input