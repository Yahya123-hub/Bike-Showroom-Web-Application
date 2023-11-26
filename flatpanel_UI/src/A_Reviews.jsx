import React from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
import * as Components from './SignupSigninComponents.jsx';
import { Link } from "react-router-dom";


const C_Wishlist = () => {
  const [records, setRecords] = React.useState([]);
  const [feedback, setFeedback] = React.useState([]);


  React.useEffect(() => {
    axios.get('http://localhost:3001/GetFeedback')
      .then(response => {
        setFeedback(response.data);
        setRecords(response.data);
      })
      .catch(error => window.alert('Error fetching data:', error));
  }, []); 



  const columns = [
    {
      name: "MechanicID",
      selector: row => row.mechanicID,
      sortable: true,
    },
    {
      name: "Comment",
      selector: row => row.comment,
      sortable: true,
    },
    
  ];

  return (
    <div className="feedback_tbl">
      <Components.Title style={{ textAlign: 'center',  }}>Customer Reviews</Components.Title>
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

export default C_Wishlist;

