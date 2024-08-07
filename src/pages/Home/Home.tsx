import React from 'react';
import logo from '../../logo.svg';
import HouseholdForm from '../../components/HouseholdForm/HouseholdForm';

const Home: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        Rewiring Aotearoa
      </header>
      
      
      <HouseholdForm/>
      
    </div>
  );
};

export default Home;