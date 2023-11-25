import React from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
import * as Components from './SignupSigninComponents.jsx';
import { Link } from "react-router-dom";


const C_PaymentHistory = () => {
  const [records, setRecords] = React.useState([]);
  const [paymenthistory, setPaymenthistory] = React.useState([]);



  React.useEffect(() => {
    axios.get('http://localhost:3001/GetPaymentHistory')
      .then(response => {
        setPaymenthistory(response.data);
        setRecords(response.data);
      })
      .catch(error => window.alert('Error fetching data:', error));
  }, []); 


  const columns = [
    {
      name: "Order ID",
      selector: row => row.OrderID,
      sortable: true,
    },
    {
      name: "Payed",
      selector: row => row.payed_amount,
      sortable: true,
    },
    {
      name: "Method",
      selector: row => row.payment_method,
      sortable: true,
    },
    {
      name: "Made on",
      selector: row => row.CreatedAT,
      sortable: true,
    },

  ];

  return (
    <div className="wishlist_tbl">
      <Components.Title style={{ textAlign: 'center',  }}>Past Payments</Components.Title>
      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        pagination
        paginationPerPage={5}
      />
    </div>
  );
};

export default C_PaymentHistory;

