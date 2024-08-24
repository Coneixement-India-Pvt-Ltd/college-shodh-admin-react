import React from 'react'
import Sidebar from '../Admin_panel/Sidebar';
import Navbar from '../Admin_panel/Navbar';
import Card from './Card';
import Filter from './Filter';
import axios from 'axios';

const CollegesPage = () => {
  
  return (
    <div>
      {/* <Navbar />
      <Sidebar /> */}
      <Filter />
      <Card />
      
    </div>
  )
}

export default CollegesPage;
