import React from 'react'
import './home.css'
import Sidebar from '../../component/sidebar/Sidebar'
import  Topbar from '../../component/topbar/Topbar'
import Feed from '../../component/feed/Feed'
import Rightbar from '../../component/rightbar/Rightbar'
export default function () {
  return (
    <>
   <Topbar/>
   <div className="homeContainer">
   <Sidebar/>
   <Feed/>
   <Rightbar/>
   
   </div>
   
   </>
  )
}

