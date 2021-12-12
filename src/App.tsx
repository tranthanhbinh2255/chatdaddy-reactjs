import React, { useEffect, useState } from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import Card from './components/card'
import { Contact, getContacts } from './api/Contacts'

const App:React.FC = () => {
  const [contactList, setContactList] = useState<Contact[]>([])
  const [nextPageScroll, setNextPageScroll] = useState<string|null>(null)

  useEffect(()=> {
    const init = async () => {
      const { contacts, nextPage } = await getContacts()
      setContactList(contacts)
      setNextPageScroll(nextPage)
      console.log('api', contacts)
    }
    init()
  }, [])

  const loadMore = async () => {
    const { contacts, nextPage } = await getContacts({
      page: nextPageScroll
    })
    setContactList(contactList => [...contactList, ...contacts])
    setNextPageScroll(nextPage)
  }

  return (
    <Container fluid>
      <Card />
      <p> len: {contactList.length}</p>
      {contactList.map((contact, i) => {
        return (
          <div key={i}>
            <p>[{i}] {contact.name}</p>
          </div>
        )
      })}
      <div>
        <button onClick={loadMore}>Next: {nextPageScroll}</button>
      </div>
    </Container>
  )
}

export default App
