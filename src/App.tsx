import React, { useEffect } from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import Card from './components/card'
import { getContact } from './api/Contacts'

const App:React.FC = () => {

  useEffect(()=> {
    const init = async () => {
      const contacts = await getContact()
      console.log(contacts)
    }
    init()
  }, [])

  return (
    <Container fluid>
      <Card />
    </Container>
  )
}

export default App
