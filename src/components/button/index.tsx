import React from 'react'
import './style.scss'

interface ButtonProps {
  containerClass?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: any;
}

const Button: React.FC<ButtonProps> = ({
  containerClass = '',
  disabled = false,
  children = null,
  onClick = () => void (0),
}) => {

  const handleClick = () => {
    if(!disabled) {
      onClick()
    }
  }

  return (
    <>
      <div
        className={`button ${containerClass} ${disabled ? 'disabled' : null}`}
        onClick={handleClick}
      >
        <span>{children}</span>
      </div>
    </>
  )
}

export default Button