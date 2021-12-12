import React from 'react'
import './App.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container } from 'react-bootstrap'
import Card from './components/card'

const App:React.FC = () => {
  return (
    <Container fluid>
      <Card />
    </Container>
  )
}

export default App
