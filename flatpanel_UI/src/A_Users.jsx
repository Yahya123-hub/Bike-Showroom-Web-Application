import React from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
import * as Components from './SignupSigninComponents.jsx';
import { Link } from "react-router-dom";


const A_Users = () => {
  const [records, setRecords] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  function tblsearch(event) {
    const newdata = users.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newdata);
  }

  React.useEffect(() => {
    axios.get('http://localhost:3001/GetUsers')
      .then(response => {
        setUsers(response.data);
        setRecords(response.data);
      })
      .catch(error => window.alert('Error fetching data:', error));
  }, []); 

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/DeleteUser/'+id)
    .then(res => {console.log(res)
      window.location.reload()})
    .catch(error => window.alert('Error deleting data:', error));
  };

  const columns = [
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: row => row.email,
      sortable: true,
    },
    {
      name: "Password",
      selector: row => row.password,
      sortable: true,
    },
    {
      name: "Role",
      selector: row => row.role,
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
            onClick={(e) => handleDelete(row._id)}
          >
            <span style={{ color: '#000' }}>Delete</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="user_tbl">
      <Components.Title style={{ textAlign: 'center',  }}>Users</Components.Title>
      <div className="user_tbl_srch" ><input type="text" placeholder="Search" onChange={tblsearch}></input></div>
      <DataTable
        columns={columns}
        data={records}
        fixedHeader
        pagination
        paginationPerPage={5}
      />
      <Components.UButton>
      <Link to={`/A_AddUser`} style={{ textDecoration: 'none', color: '#000' }}>
      Add
      </Link>
      </Components.UButton>
    </div>
  );
};

export default A_Users;
