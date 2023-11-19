import React from "react";
import DataTable from "react-data-table-component";
import axios from 'axios';
import * as Components from './SignupSigninComponents.jsx';
import ImageCell from './M_ImgCell.jsx';
import { Link } from "react-router-dom";


const M_Listings = () => {
  const [records, setRecords] = React.useState([]);
  const [bikes, setBikes] = React.useState([]);

  function tblsearch(event) {
    const newdata = bikes.filter(row => {
      return row.name.toLowerCase().includes(event.target.value.toLowerCase());
    });

    setRecords(newdata);
  }

  React.useEffect(() => {
    axios.get('http://localhost:3001/GetBikes')
      .then(response => {
        setBikes(response.data);
        setRecords(response.data);
      })
      .catch(error => window.alert('Error fetching data:', error));
  }, []); 

  const handleEdit = (row) => {
    // Implement your edit logic here
    console.log("Edit clicked for row:", row);
    console.log(bikes._id)
  };

  const handleDelete = (id) => {
    axios.delete('http://localhost:3001/DeleteBike/'+id)
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
      name: "Price",
      selector: row => row.price,
      sortable: true,
    },
    {
      name: "Quantity",
      selector: row => row.availableQuantity,
      sortable: true,
    },
    {
      name: "Category",
      selector: row => row.category,
      sortable: true,
    },
    {
      name: "Image",
      selector: row => row.Image,
      cell: row => <ImageCell value={row.Image} />,
    },

    {
      name: "Actions",
      cell: row => (
        <div>
          <button
            style={{
              borderRadius: '20px', 
              border: '#000', 
              padding: '5px 18px', 
              backgroundColor: '#d3d3d3',
              
            }}
            onClick={() => handleEdit(row)}
          >
            <Link to={`/M_update/${row._id}`} style={{ textDecoration: 'none', color: '#000' }}>
              Edit
            </Link>
          </button>
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
    <div className="bike_tbl">
      <Components.Title style={{ textAlign: 'center',  }}>Bike Listings</Components.Title>
      <div className="bike_tbl_srch" ><input type="text" placeholder="Search" onChange={tblsearch}></input></div>
      <DataTable
        columns={columns}
        data={records}
        //selectableRows
        fixedHeader
        pagination
        paginationPerPage={5}
      />
    </div>
  );
};

export default M_Listings;
