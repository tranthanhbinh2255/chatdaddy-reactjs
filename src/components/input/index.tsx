import React, { useState } from 'react'
import './style.scss'

interface InputProps {
  contnainerClass?: string;
  icon?: any;
  styles?: any;
  placeholder?: string;
  inputType?: any;
  onChange?: (value: string) => void
}

const Input: React.FC<InputProps> = ({ onChange = () => null, ...props }) => {
  const [value, setValue] = useState('')

  const handleChange = (value: string) => {
    setValue(value)
    onChange(value)
  }

  return (
    <>
      <div className={`input-container  ${props.contnainerClass}`} style={props.styles}>
        <span>{props.icon ?? null}</span>
        <input 
          type={props.inputType ? props.inputType : 'text'} placeholder={props.placeholder ?? ''} 
          value={value} 
          onChange={(e) => handleChange(e.target.value)} 
        />
      </div>
    </>
  )
}

export default Input