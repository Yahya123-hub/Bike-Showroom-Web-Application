import React from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
import * as Components from './SignupSigninComponents.jsx';
import { Link } from "react-router-dom";

const A_Mi = () => {
  const [records, setRecords] = React.useState([]);
  const [mechanics, setMechanics] = React.useState([]);

  function tblsearch(event) {
    const newdata = mechanics.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newdata);
  }

  React.useEffect(() => {
    axios.get('http://localhost:3001/GetMechanics')
      .then(response => {
        //console.log(response.data)
        setMechanics(response.data);
        setRecords(response.data);
      })
      .catch(error => window.alert('Error fetching data:', error));
  }, []); 

  const handleApproval = (id) => {
    axios.put(`http://localhost:3001/ApproveMechanic/${id}`)
      .then(response => {
        const updatedMechanics = mechanics.map(mechanic => 
          mechanic._id === id ? { ...mechanic, isApproved: true } : mechanic
        );
        setMechanics(updatedMechanics);
        setRecords(updatedMechanics);
      })
      .catch(error => window.alert('Error approving mechanic:', error));
  };

  const handleDisapproval = (id) => {
    axios.put(`http://localhost:3001/DisapproveMechanic/${id}`)
      .then(response => {
        const updatedMechanics = mechanics.map(mechanic => 
          mechanic._id === id ? { ...mechanic, isApproved: false } : mechanic
        );
        setMechanics(updatedMechanics);
        setRecords(updatedMechanics);
      })
      .catch(error => window.alert('Error disapproving mechanic:', error));
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Contact",
      selector: row => row.contact,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true,
    },
    {
      name: "IsApproved",
      selector: row => row.isApproved.toString(),
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
            onClick={(e) => handleApproval(row._id)}
          >
            <span style={{ color: '#000' }}>Approve</span>
          </button>

          <button
            style={{
              borderRadius: '20px', 
              border: '#000', 
              padding: '5px 10px',
              backgroundColor: '#d3d3d3',
              
            }}
            onClick={(e) => handleDisapproval(row._id)}
          >
            <span style={{ color: '#000' }}>Disapprove</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="user_tbl">
      <Components.Title style={{ textAlign: 'center',  }}>Mechanics</Components.Title>
      <div className="user_tbl_srch" ><input type="text" placeholder="Search" onChange={tblsearch}></input></div>
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

export default A_Mi;
