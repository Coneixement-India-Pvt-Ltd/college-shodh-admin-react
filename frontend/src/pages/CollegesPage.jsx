// import React from 'react'
// import Sidebar from '../Admin_panel/Sidebar';
// import Navbar from '../Admin_panel/Navbar';
// import Card from './Card';
// import Filter from './Filter';
// import axios from 'axios';

// const CollegesPage = () => {
  
//   return (
//     <div>
//       {/* <Navbar />
//       <Sidebar /> */}
//       <Filter />
//       <Card />
      
//     </div>
//   )
// }

// export default CollegesPage;

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Card from '../components/Colleges/Card';
import Filter from '../components/Colleges/Filter';
import axios from 'axios';

const CollegesPage = () => {
  const [naacFilter, setNaacFilter] = useState([]);
  const [stateFilter, setStateFilter] = useState([]);
  const [nbaFilter, setNbaFilter] = useState([]);

  const onNaacChange = (selectedNaac) => {
    setNaacFilter((prevFilter) => {
      if (prevFilter.includes(selectedNaac)) {
        return prevFilter.filter((naac) => naac !== selectedNaac);
      } else {
        return [...prevFilter, selectedNaac];
      }
    });
  };

  const onStateChange = (selectedState) => {
    setStateFilter((prevFilter) => {
      if (prevFilter.includes(selectedState)) {
        return prevFilter.filter((state) => state !== selectedState);
      } else {
        return [...prevFilter, selectedState];
      }
    });
  };

  const onNbaFilter = (selectedNba) => {
    setNbaFilter((prevFilter) => {
      if (prevFilter.includes(selectedNba)) {
        return prevFilter.filter((nba) => nba !== selectedNba);
      } else {
        return [...prevFilter, selectedNba];
      }
    });
  };

  return (
    <div>
      {/* <Navbar />
      <Sidebar /> */}
      <Filter 
        onNaacChange={onNaacChange}
        onStateChange={onStateChange}
        onNbaFilter={onNbaFilter}
      />
      <Card 
        naacFilter={naacFilter}
        stateFilter={stateFilter}
        nbaFilter={nbaFilter}
      />
    </div>
  );
};

export default CollegesPage;
