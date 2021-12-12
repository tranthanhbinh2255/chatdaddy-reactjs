
import React, { useState } from 'react'
import './style.scss'

interface CheckboxProps {
  containerClass?: string
  disabled?: boolean
  checkedValue?: (value: boolean) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  containerClass = '',
  disabled = false,
  checkedValue = () => void(0)
}) => {
  const [checked, setChecked] = useState(false)

  const toggleCheck = () => {
    if (!disabled) {
      setChecked(!checked)
      checkedValue(!checked)
    }
  }

  return (
    <div style={{ margin: '0 10px' }}>
      <span 
        className={`checkbox ${containerClass} ${checked ? 'checked' : null}`} 
        onClick={toggleCheck}
      >
        <input type="checkbox" checked={checked}/>
        <span></span>
      </span>
    </div>
  )
}

export default Checkbox