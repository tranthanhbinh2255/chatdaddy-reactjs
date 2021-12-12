
import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import Checkbox from '../checkbox'
import Input from '../input'
import Button from '../button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
interface FilterProps {
  showFilter?: boolean;
  onClose?: () => void;
  onExclude?: (value: string[]) => void;
  onInclude?: (value: string[]) => void;
  minMessagesSent?: (value: string) => void;
  maxMessagesSent?: (value: string) => void;
  minMessagesRecv?: (value: string) => void;
  maxMessagesRecv?: (value: string) => void;
  contactCount?: number;
}

const Filter: React.FC<FilterProps> = (
  { 
    showFilter, 
    onClose = () => null ,
    onExclude = () => void(0),
    onInclude = () => void(0),
    minMessagesSent = () => void(0),
    maxMessagesSent = () => void(0),
    minMessagesRecv = () => void(0),
    maxMessagesRecv = () => void(0),
    contactCount = 0,
  }) => {

  const [includeTags, setIncludeTags] = useState(['friend', 'vaskhji'])
  const [excludeTags, setExcludeTags] = useState(['friend', 'vaskhji'])
  const [includeCheck, setIncludeCheck] = useState<string[]>([])
  const [excludeCheck, setExcludeCheck] =  useState<string[]>([])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const delElementArr = (element: string, obj: any) => {
    const newArr = [...obj]
    if (newArr.indexOf(element) !== -1) {
      newArr.splice(newArr.indexOf(element), 1)
    }
    return(newArr)
  }

  const deleteTag = (tagId: string, nameTags: string) => {
    if (nameTags === 'includeTags') {
      setIncludeTags(delElementArr(tagId, includeTags))
    }
    else {
      setExcludeTags(delElementArr(tagId, excludeTags))
    }
  }

  const includeCheckBox = (nameTags: string, tagChecked: boolean) => {
    if (includeCheck.includes(nameTags)) {
      if (tagChecked === false) {
        setIncludeCheck(delElementArr(nameTags, includeCheck))
      }
    } else {
      if (tagChecked === true) {
        const newChecked = [...includeCheck]
        newChecked.push(nameTags)
        setIncludeCheck(newChecked)
      }
    }
  }
  
  const excludeCheckBox = (nameTags: string, tagChecked: boolean) => {
    if (excludeCheck.includes(nameTags)) {
      if (tagChecked === false) {
        setExcludeCheck(delElementArr(nameTags, excludeCheck))
      }
    } else {
      if (tagChecked === true) {
        const newChecked = [...excludeCheck]
        newChecked.push(nameTags)
        setExcludeCheck(newChecked)
      }
    }
  }

  useEffect(() => {
    onInclude(includeCheck)
  }, [includeCheck])

  useEffect(() => {
    onExclude(excludeCheck)
  }, [excludeCheck])

  return (
    <>
      <Row className={`filter ${showFilter ? 'show' : ''}`}  >
        <Col className='filter__section'>
          <div className='filter__section--top'>
            <div className='filter__header'>
              <div className='logo'>
                <span><FontAwesomeIcon icon={faBars} onClick={onClose} /></span>
                <h4>Audience</h4>
              </div>
              <p>{contactCount} Contacts</p>
            </div>
            <div className='filter__content'>
              <div className='tags'>
                <h5>Include Tags: </h5>
                <div className='tags__items'>
                  {includeTags && includeTags.map((e, i) => {
                    return (
                      <div key={i} className={`item ${i % 2 === 0 ? 'even' : 'odd'}`}>
                        <span>{e}</span>
                        <div className='icon'>
                          <span onClick={() => deleteTag(e, 'includeTags')} >
                            <FontAwesomeIcon icon={faTrash} color={'#E52A34'} />
                          </span>
                          <Checkbox
                            checkedValue={(value) => includeCheckBox(e, value)}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='tags'>
                <h5>Exclude Tags: </h5>
                <div className='tags__items'>
                  {excludeTags && excludeTags.map((e, i) => {
                    return (
                      <div key={i} className={`item ${i % 2 === 0 ? 'even' : 'odd'}`}>
                        <span>{e}</span>
                        <div className='icon'>
                          <span onClick={() => deleteTag(e, 'excludeTags')} >
                            <FontAwesomeIcon icon={faTrash} color={'#E52A34'} />
                          </span>
                          <Checkbox 
                            containerClass='custom-checkbox' 
                            checkedValue={(value) => excludeCheckBox(e, value)}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className='message'>
                <h5>Message Sent: </h5>
                <div className='message__content'>
                  <Input placeholder='Min' inputType="number" onChange={(value) => minMessagesSent(value)}/>
                  <Input placeholder='Max' inputType="number" onChange={(value) => maxMessagesSent(value)}/>
                </div>
              </div>
              <div className='message'>
                <h5>Message Received: </h5>
                <div className='message__content'>
                  <Input placeholder='Min' inputType="number" onChange={(value) => minMessagesRecv(value)}/>
                  <Input placeholder='Max' inputType="number" onChange={(value) => maxMessagesRecv(value)}/>
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