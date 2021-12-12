import React, { useEffect, useState } from 'react'
import './style.scss'

interface InputProps {
  contnainerClass?: string;
  icon?: any;
  styles?: any;
  placeholder?: string;
  inputType?: any;
  value?: any;
  onChange?: (value: string) => void
}

const Input: React.FC<InputProps> = ({ onChange = () => null, value, ...props }) => {
  const [valueState, setValueState] = useState('')

  useEffect(()=>{
    setValueState(value)
  }, [value])

  const handleChange = (newValue: string) => {
    setValueState(newValue)
    onChange(newValue)
  }

  return (
    <>
      <div className={`input-container  ${props.contnainerClass}`} style={props.styles}>
        <span>{props.icon ?? null}</span>
        <input 
          type={props.inputType ? props.inputType : 'text'} placeholder={props.placeholder ?? ''} 
          value={valueState} 
          onChange={(e) => handleChange(e.target.value)} 
        />
      </div>
    </>
  )
}

export default Input