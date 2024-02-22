import React from 'react'
import { Outlet } from 'react-router-dom'
import TotalNavbar from './TotalNavbar/TotalNavbar'
import { Container } from 'react-bootstrap'

export default function TotalLayout() {
  return (
    <div>
      <TotalNavbar/>
      <Container className='min-vh-100'>
        <Outlet/>
      </Container>
    </div>
  )
}
