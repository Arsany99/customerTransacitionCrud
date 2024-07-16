import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import 'primereact/resources/themes/saga-blue/theme.css';  // Include a theme
import 'primereact/resources/primereact.min.css';           // Core CSS
import 'primeicons/primeicons.css';                         // Icons

const CustomerTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  //const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const transactionsResponse = await axios.get('http://localhost:5000/transactions');
      setTransactions(transactionsResponse.data);
      setFilteredTransactions(transactionsResponse.data);

      const customersResponse = await axios.get('http://localhost:5000/customers');
      setCustomers(customersResponse.data);
      setFilteredCustomers(customersResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFilterByName = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = transactions.filter((transaction) => {
      const customer = customers.find((c) => c.id === transaction.customer_id);
      return customer && customer.name.toLowerCase().includes(value);
    });
    setFilteredTransactions(filtered);
  };

  const handleFilterByAmount = (e) => {
    const value = parseFloat(e.target.value);
    const filtered = transactions.filter((transaction) =>
      transaction.amount === value
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div className="datatable-filter-demo p-5 bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Customer Transaction Table</h2>
      <div className="input">
        <div className="p-input-icon-left  m-5 w-full">
          <i className="pi pi-search icon " />
          <InputText
            className="p-inputtext-lg  w-full mb-3 border-round-top p-3 text-xl"
            type="text"
            onChange={handleFilterByName}
            placeholder="Search by name"
          />
        </div>
        <div className="p-input-icon-left  w-full">
          <i className="pi pi-search icon" />
          <InputText
            className="p-inputtext-lg  w-full text-center p-3 mb-3 border-round-top text-xl"
            type="number"
            onChange={handleFilterByAmount}
            placeholder="Search by amount"
          />
        </div>
      </div>
      <DataTable value={filteredTransactions} className="p-datatable-custom mt-5 w-full">
        <Column field="id" header="ID" sortable className="text-center" />
        <Column field="customer_id" header="Customer ID" sortable className="text-center" />
        <Column field="date" header="Date" sortable className="text-center" />
        <Column field="amount" header="Amount" sortable className="text-center" />
        <Column
          field="customer_id"
          header="Customer Name"
          body={(rowData) => {
            const customer = customers.find((c) => c.id === rowData.customer_id);
            return customer ? customer.name : '';
          }}
          className="text-center"
        />
      </DataTable>
    </div>
  );
};

export default CustomerTable;
