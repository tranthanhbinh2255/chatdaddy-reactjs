import React, { useCallback, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Contact, getContacts, IGetContactParams } from './api/Contacts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons'
import Filter from './components/filter'
import Input from './components/input'
import Card from './components/card'
import Button from './components/button'
import Checkbox from './components/checkbox'
import InfiniteScroll from 'react-infinite-scroll-component'
import debounce from 'lodash.debounce'

const App: React.FC = () => {
  const [totalContactCount, setTotalContactCount] = useState<number>(0)
  const [contactListState, setContactListState] = useState<Contact[]>([])
  const [nextPageState, setNextPageState] = useState<string | null>(null)
  const [filterState, setFilterState] = useState<IGetContactParams>({})
  const [showFilter, setShowFilter] = useState(false)
  const [query, setQuery] = useState<string | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async (filter?: IGetContactParams, loadMore?: boolean) => {
    const { contacts, nextPage, totalCount } = await getContacts(filter)

    if (loadMore) {
      setContactListState([...contactListState, ...contacts])
    } else {
      setContactListState(contacts)
    }

    setTotalContactCount(totalCount)
    setNextPageState(nextPage)
  }

  const loadMore = async () => {
    const newFilter = {
      ...filterState,
      page: nextPageState
    }
    setFilterState(newFilter)
    loadData(newFilter, true)
  }

  const updateFilter = (key: string, value: unknown) => {
    const newFilter = {
      ...filterState,
      [key]: value ? value : undefined,
      page: undefined
    }
    setFilterState(newFilter)
    loadData(newFilter)
  }

  const debounceDropDown = useCallback(debounce((nextValue) => updateFilter('q', nextValue), 700), [])

  const handleQuery = (value: string) => {
    setQuery(value)
    debounceDropDown(value)
  }

  return (
    <Container fluid>
      <Row className='custom-row'>
        <Col md={4} lg={3} className={`custom-col ${showFilter ? 'overlay': ''}`}>
          <Filter 
            showFilter={showFilter} 
            onClose={() => { setShowFilter(false) }} 
            onInclude={(value) => updateFilter('tags', value)}
            onExclude={(value) => updateFilter('notTags', value)}
            minMessagesRecv={(value) => updateFilter('minMessagesRecv', value)}
            maxMessagesRecv={(value) => updateFilter('maxMessagesRecv', value)}
            minMessagesSent={(value) => updateFilter('minMessagesSent', value)}
            maxMessagesSent={(value) => updateFilter('maxMessagesSent', value)}
          />
        </Col>
        <Col md={8} lg={9} className='custom-col'>
          <div className='contacts'>
            <div className='contacts__header'>
              <div className='contacts__header--logo'>
                <span><FontAwesomeIcon icon={faBars} onClick={() => { setShowFilter(true) }} /></span>
                <h4>All contacts ({totalContactCount})</h4>
              </div>
              <Button containerClass='custom-button'>+</Button>
            </div>
            <Input 
              icon={<FontAwesomeIcon color='#B4BFD3' icon={faSearch} />} 
              placeholder='Search contacts' 
              onChange={(value) => handleQuery(value)}
            />
            <div className='contacts__sub--header'>
              <div className='select-all'>
                <Checkbox/>
                <h4>Select all</h4>
              </div>
              <Button >Export All</Button>
            </div>
            <InfiniteScroll
              dataLength={contactListState.length}
              next={() => {
                setTimeout(() => {
                  loadMore()
                }, 700)
              }}
              hasMore={nextPageState != null}
              loader={<p>Loading... {contactListState.length} / {totalContactCount}</p>}
              height={'80vh'}
            >
              {contactListState.map((contact, i) => {
                return (
                  <Card
                    key={i}
                    name={contact.name}
                    phone={contact.phoneNumber}
                    tags={contact.tags.map(item => item.name)}
                  />
                )
              })}
            </InfiniteScroll>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default App
