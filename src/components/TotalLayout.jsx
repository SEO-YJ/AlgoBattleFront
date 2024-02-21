import React from 'react'
import { Outlet } from 'react-router-dom'
import TotalNavbar from './TotalNavbar/TotalNavbar'

export default function TotalLayout() {
  return (
    <div>
      <TotalNavbar/>
      <Outlet/>
    </div>
  )
}
