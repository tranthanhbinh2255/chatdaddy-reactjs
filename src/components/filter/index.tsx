
import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Checkbox from '../checkbox'
import Input from '../input'
import Button from '../button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FilterProps { }

const includeTags = ['Greating', 'Greating', 'Greating', 'Greating', 'Greating']

const Filter: React.FC<FilterProps> = () => {
  return (
    <>
      <Row className='filter'>
        <Col className='filter__section'>
          <div className='filter__section--top'>
            <div className='filter__header'>
              <div className='logo'>
                <span><FontAwesomeIcon icon={faBars} /></span>
                <h4>Audience</h4>
              </div>
              <p>100 Contacts</p>
            </div>
            <div className='filter__content'>
              <div className='tags'>
                <h5>Include Tags: </h5>
                <div className='tags__items'>
                  {includeTags.map((e, i) => {
                    return (
                      <div key={i} className={`item ${i % 2 === 0 ? 'even' : 'odd'}`}>
                        <span>{e}</span>
                        <div className='icon'>
                          <span><FontAwesomeIcon icon={faTrash} color={'#E52A34'} /></span>
                          <Checkbox containerClass='custom-checkbox' />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='tags'>
                <h5>Exclude Tags: </h5>
                <div className='tags__items'>
                  {includeTags.map((e, i) => {
                    return (
                      <div key={i} className={`item ${i % 2 === 0 ? 'even' : 'odd'}`}>
                        <span>{e}</span>
                        <div className='icon'>
                          <span><FontAwesomeIcon icon={faTrash} color={'#E52A34'} /></span>
                          <Checkbox containerClass='custom-checkbox' />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='message'>
                <h5>Message Sent: </h5>
                <div className='message__content'>
                  <Input placeholder='Min' />
                  <Input placeholder='Max' />
                </div>
              </div>
              <div className='message'>
                <h5>Message Received: </h5>
                <div className='message__content'>
                  <Input placeholder='Min' />
                  <Input placeholder='Max' />
                </div>
              </div>
            </div>
          </div>
          <div className='filter__section--bottom'>
            <div className='filter__footer'>
              <Button containerClass='custom-button'>Save Filter</Button>
            </div>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default Filter