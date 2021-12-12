import React from 'react'
import { Image } from 'react-bootstrap'
import Checkbox from '../checkbox'
import Button from '../button'
import './style.scss'
import bgDefault from '../../assets/images/avatar.jpg'

interface CardProps { 
  style?: any;
  name: string,
  phone: string,
  tags: string[]
}

const Card: React.FC<CardProps> = ({name, phone, tags, style}) => {
  return (
    <>
      <div className='wrapper' style={style}>
        <div className='wrapper__header'>
          <Checkbox/>
        </div>
        <div className='wrapper__content'>
          <Image src={bgDefault} />
          <div className='wrapper__content--infor'>
            <p>{name}</p>
            <p>{phone}</p>
          </div>
        </div>
        <div className='wrapper__footer'>
          {tags.map((tag, i) => 
            <Button key={i}>{tag}</Button>
          )}
          <Button containerClass='btn-plus'>+</Button>
        </div>
      </div>
    </>
  )
}

export default Card