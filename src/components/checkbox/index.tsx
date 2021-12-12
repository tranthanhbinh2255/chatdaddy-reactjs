
import React, { useState } from 'react'
import './style.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CheckboxProps {
  containerClass?: string;
  checkedValue?: (value: any) => void
}

const Checkbox: React.FC<CheckboxProps> = ({ 
  containerClass,
  checkedValue = () => void(0)
}) => {
  const [checked, setChecked] = useState(false)

  const toggleCheck = () => {
    setChecked(!checked)
    checkedValue(!checked)
  }

  return (
    <>
      <span 
        className={`checkbox ${containerClass} ${checked ? 'checked' : null}`} 
        onClick={toggleCheck}
      >
        <input type="checkbox" checked={checked} />
        <span></span>
      </span>
    </>
  )
}

export default Checkbox