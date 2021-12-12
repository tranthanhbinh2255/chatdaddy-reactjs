import React, { useEffect, useState } from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import Card from './components/card'
import { Contact, getContacts, IGetContactParams } from './api/Contacts'
import Input from './components/input'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const App:React.FC = () => {
  const [totalContactCount, setTotalContactCount] = useState<number>(0)
  const [contactListState, setContactListState] = useState<Contact[]>([])
  const [nextPageState, setNextPageState] = useState<string|null>(null)
  const [filterState, setFilterState] = useState<IGetContactParams>({})

  useEffect(()=> {
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

  const updateFilter = (key:string, value:unknown) => {
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
      <Card />
      <Input icon={<FontAwesomeIcon color='#B4BFD3' icon={faSearch} />} placeholder='Search contacts' />

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
      <p> Showing: {contactListState.length} / {totalContactCount}</p>
      {contactListState.map((contact, i) => {
        return (
          <div key={i}>
            <p style={{marginBottom: 0}}>[{i}] {contact.name}</p>
            <ul>
              <li>Sent: {contact.messagesSent}</li>
              <li>Received: {contact.messagesReceived}</li>
              <li>Tags: {JSON.stringify(contact.tags)}</li>
            </ul>
          </div>
        )
      })}
      <div>
        <button onClick={loadMore} disabled={nextPageState===null}>Next: {nextPageState}</button>
      </div>
    </Container>
  )
}

export default App
