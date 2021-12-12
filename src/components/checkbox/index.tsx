
import React, { useState } from 'react'
import './style.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CheckboxProps { }

const Checkbox: React.FC<CheckboxProps> = () => {
  const [checked, setChecked] = useState(false)

  const toggleCheck = () => {
    setChecked(!checked)
  }

  return (
    <>
      <span className='checkbox' onClick={toggleCheck}>
        <input type="checkbox" checked={checked} />
        <span></span>
      </span>
    </>
  )
}

export default Checkbox