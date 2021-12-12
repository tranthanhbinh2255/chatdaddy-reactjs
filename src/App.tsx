import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import { Contact, getContacts, IGetContactParams } from './api/Contacts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Filter from './components/filter'
import Input from './components/input'
import Card from './components/card'
import Button from './components/button'
import Checkbox from './components/checkbox'
import InfiniteScroll from 'react-infinite-scroll-component'

const App: React.FC = () => {
  const [totalContactCount, setTotalContactCount] = useState<number>(0)
  const [contactListState, setContactListState] = useState<Contact[]>([])
  const [nextPageState, setNextPageState] = useState<string | null>(null)
  const [filterState, setFilterState] = useState<IGetContactParams>({})

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

    setNextPageState(nextPage)
    setTotalContactCount(totalCount)
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

  return (
    <Container fluid>
      <Row>
        <Col md={4} lg={4}>
          <Filter />
          <div>
            <label>tags: </label>
            <input type='text' onChange={
              (e) => {
                // Note: change to multiple tags later
                const tagsStr = e.target.value
                const tagsList = tagsStr ? tagsStr.split(',') : undefined
                updateFilter('tags', tagsList)
              }
            } />
          </div>

          <div>
            <label>notTags: </label>
            <input type='text' onChange={
              (e) => {
                // Note: change to multiple tags later
                const tagsStr = e.target.value
                const tagsList = tagsStr ? tagsStr.split(',') : undefined
                updateFilter('notTags', tagsList)
              }
            } />
          </div>

          <div>
            <label>minMessagesRecv: </label>
            <input type='number' onChange={
              (e) => updateFilter('minMessagesRecv', e.target.value)
            } />
          </div>

          <p> current Filter: {JSON.stringify(filterState)}</p>

        </Col>
        <Col md={8} lg={8}>
          <div className='contacts'>
            <div className='contacts__header'>
              <h4>All contacts ({totalContactCount})</h4>
              <Button containerClass='custom-button'>+</Button>
            </div>
            <Input icon={<FontAwesomeIcon color='#B4BFD3' icon={faSearch} />} placeholder='Search contacts' />
            <div className='contacts__sub--header'>
              <div className='select-all'>
                <div style={{margin: '0 10px'}}>
                  <Checkbox containerClass='custom-checkbox'/>
                </div>
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
            <div>
              <button onClick={loadMore} disabled={nextPageState === null}>Next: {nextPageState}</button>
            </div>
          </div>
        </Col>
      </Row>      
    </Container>
  )
}

export default App
