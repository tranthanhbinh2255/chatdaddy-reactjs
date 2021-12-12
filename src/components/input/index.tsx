import React, { useEffect, useState } from 'react'
import './style.scss'

interface InputProps {
  containerClass?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styles?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value?: any;
  inputType?: string;
  placeholder?: string;
  onChange?: (value: string) => void
}

const Input: React.FC<InputProps> = ({
  onChange = () => null,
  value = '',
  icon = null,
  containerClass = '',
  styles = {},
  inputType = 'text',
  placeholder = '',
}) => {
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
      <div className={`input-container  ${containerClass}`} style={styles}>
        <span>{icon ?? null}</span>
        <input 
          type={inputType} placeholder={placeholder} 
          value={valueState} 
          onChange={(e) => handleChange(e.target.value)} 
        />
      </div>
    </>
  )
}

export default Input