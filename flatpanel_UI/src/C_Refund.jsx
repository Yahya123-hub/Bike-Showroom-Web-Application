import React from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
import * as Components from './SignupSigninComponents.jsx';
import { DateTime } from 'luxon';

const C_Refund = () => {
  const [records, setRecords] = React.useState([]);
  const [paymenthistory, setPaymenthistory] = React.useState([]);

  React.useEffect(() => {
    axios.get('http://localhost:3001/GetPaymentHistory')
      .then(response => {
        const nonrefundedOrders = response.data.filter(order => order.status !== true);
        setPaymenthistory(nonrefundedOrders);
        setRecords(nonrefundedOrders);
      })
      .catch(error => window.alert('Error fetching data:', error));
  }, []); 

  const handleRefund = (id) => {
    axios.get(`http://localhost:3001/PaymentHistory/${id}`)
      .then(response => {
        const paymentDetails = response.data;
        const createdAt = new Date(paymentDetails.CreatedAT);
        const currentDate = new Date();
        const timeDifference = currentDate - createdAt;
        const hoursDifference = timeDifference / (1000 * 3600);
  
        if (hoursDifference <= 2) {
          axios.put(`http://localhost:3001/Refund/${id}`)
            .then(() => {
              const updatedpaymenthistory = paymenthistory.map(paymenthistory =>
                paymenthistory._id === id ? { ...paymenthistory, refunded: true } : paymenthistory
              );
              setPaymenthistory(updatedpaymenthistory);
              setRecords(updatedpaymenthistory);
            })
            .catch(error => window.alert('Error In Refunding:', error));
        } else {
          window.alert('Refund is only allowed within two hours of the payment.');
        }
      })
      .catch(error => window.alert('Error fetching payment details:', error));
  };
  
  
  
  
  
  
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
      name: "Refunded",
      selector: row => row.refunded.toString(),
      sortable: true,
    },
    {
      name: "Made on",
      selector: row => row.CreatedAT,
      sortable: true,
    },
    {
      name: "Actions",
      cell: row => (
        <div>
          <button
            style={{
              borderRadius: '20px', 
              border: '#000', 
              padding: '5px 10px',
              backgroundColor: '#d3d3d3',
              
            }}
            onClick={(e) => handleRefund(row._id)}
            disabled={row.refunded === true}
          >
            <span style={{ color: '#000' }}>Refund</span>
          </button>
        </div>
      ),
    },

  ];

  return (
    <div className="wishlist_tbl">
      <Components.Title style={{ textAlign: 'center',  }}>Apply For Refunds</Components.Title>
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

export default C_Refund;

