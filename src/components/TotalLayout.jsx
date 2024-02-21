import React from 'react'
import { Outlet } from 'react-router-dom'

export default function TotalLayout() {
  return (
    <div>
      <div style={{height:"80px", backgroundColor:"white", width:"100%"}}>
        TotalLayout
      </div>
      <Outlet/>
    </div>
  )
}
