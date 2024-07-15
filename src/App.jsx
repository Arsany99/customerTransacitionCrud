import React from 'react';
import CustomerTable from '../src/components/customerTable';
import TransactionGraph from '../src/components/TransactionGraph';
import AnimatedBackground from '../src/components/AnimatedBackground';
import './App.css';

function App() {
  return (
    <div className="App">
      <AnimatedBackground />
      
        <h1>Customer Transactions App</h1>
        <CustomerTable />
        <TransactionGraph customerId={1} /> 
    </div>
  );
}

export default App;


