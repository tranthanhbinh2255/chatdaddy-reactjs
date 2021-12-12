
import React, { useState } from 'react'
import './style.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CheckboxProps {
  containerClass?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ ...props }) => {
  const [checked, setChecked] = useState(false)

  const toggleCheck = () => {
    setChecked(!checked)
  }

  return (
    <>
      <span className={`checkbox ${props.containerClass} ${checked ? 'checked' : null}`} onClick={toggleCheck}>
        <input type="checkbox" checked={checked} />
        <span></span>
      </span>
    </>
  )
}

export default Checkbox