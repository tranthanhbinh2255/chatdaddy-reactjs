import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Checkbox from '../checkbox'
import Button from '../button'
import './style.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CardProps { 
  
}

const Card: React.FC<CardProps> = () => {
  return (
    <>
      <Row className={'card'}>
        <Col xs={1} lg={1} md={2}>
          <div className='card__header'>
            <Checkbox containerClass='custom-checkbox'/>
          </div>
        </Col>
        <Col xs={9} lg={9} md={7}>
          <div className='card__content'>
            <img src='https://cdn1.vectorstock.com/i/1000x1000/51/05/male-profile-avatar-with-brown-hair-vector-12055105.jpg' alt="avatar" />
            <div className='card__content--infor'>
              <p>Anilly Moon</p>
              <p>+0268519451</p>
            </div>
          </div>
        </Col>
        <Col xs={2} lg={2} md={3}>
          <div className='card__footer'>
            <Button>Tags</Button>
            <Button containerClass='btn-plus'>+</Button>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Card