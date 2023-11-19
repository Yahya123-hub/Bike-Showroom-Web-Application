import React from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
import * as Components from './SignupSigninComponents.jsx';
import { Link } from "react-router-dom";


const C_Wishlist = () => {
  const [records, setRecords] = React.useState([]);
  const [wishlist, setWishlist] = React.useState([]);

  function tblsearch(event) {
    const newdata = wishlist.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newdata);
  }

  React.useEffect(() => {
    axios.get('http://localhost:3001/GetWishlist')
      .then(response => {
        setWishlist(response.data);
        setRecords(response.data);
      })
      .catch(error => window.alert('Error fetching data:', error));
  }, []); 

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/DeleteWishlist/'+id)
    .then(res => {console.log(res)
      window.location.reload()})
    .catch(error => window.alert('Error deleting data:', error));
  };

  const columns = [
    {
      name: "BikeID",
      selector: row => row.BikeID,
      sortable: true,
    },
    {
      name: "Name",
      selector: row => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: row => row.price,
      sortable: true,
    },
    {
      name: "Available Quantity",
      selector: row => row.availableQuantity,
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
    <div className="wishlist_tbl">
      <Components.Title style={{ textAlign: 'center',  }}>Wishlist</Components.Title>
      <div className="wishlist_tbl_srch" ><input type="text" placeholder="Search" onChange={tblsearch}  style={{ width: '60px' }}></input></div>
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

