import React, { useState, useEffect } from "react";
import axios from 'axios';
import Item from './C_Item.jsx';
import Select from 'react-select';
import * as Components from './SignupSigninComponents.jsx';

const C_Shop = () => {
  const [bikes, setBikes] = useState([]);
  const [sort, setSort] = useState();
  const [searchTerm, setSearchTerm] = useState('');

  const options = [
    { value: 'option1', label: 'By Name' },
    { value: 'option2', label: 'By Price' },
    { value: 'option3', label: 'By Units' },
    { value: 'option4', label: 'By Category' },
  ];

  useEffect(() => {
    axios.get('http://localhost:3001/GetBikes')
      .then(response => {
        setBikes(response.data);
      })
      .catch(error => window.alert('Error fetching data:', error));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const sortBikes = (bikesToSort, sortBy) => {
    const filteredBikes = bikesToSort.filter(bike => {
      const nameMatch = bike.name && bike.name.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = bike.category && bike.category.toLowerCase().includes(searchTerm.toLowerCase());
      const priceMatch = bike.price && bike.price.toString().toLowerCase().includes(searchTerm.toLowerCase());
      const unitsMatch = bike.availableQuantity && bike.availableQuantity.toString().toLowerCase().includes(searchTerm.toLowerCase());

      return nameMatch || categoryMatch || priceMatch || unitsMatch;
    });

    switch (sortBy) {
      case 'option1':
        return filteredBikes.sort((a, b) => a.name.localeCompare(b.name));
      case 'option2':
        return filteredBikes.sort((a, b) => b.price - a.price);
      case 'option3':
        return filteredBikes.sort((a, b) => b.availableQuantity - a.availableQuantity);
      case 'option4':
        return filteredBikes.sort((a, b) => a.category.localeCompare(b.category));
      default:
        return filteredBikes;
    }
  };

  const sortedAndFilteredBikes = sortBikes(bikes, sort);

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <Select
          value={options.find(option => option.value === sort)}
          onChange={(selectedOption) => setSort(selectedOption.value)}
          options={options}
          placeholder="Sort"
          styles={{
            container: (provided) => ({
              ...provided,
              position: 'relative',
              top: '30px',
              left: '630px',
              zIndex: 9999,
            }),
          }}
        />
      </div>

      <div style={{ position: 'relative' }}>
        <Components.Input
          type='text'
          placeholder='Search'
          value={searchTerm}
          onChange={handleSearch}
          style={{
            position: 'relative',
            top: '-15px',
            left: '10px',
            borderRadius: '5px',
            padding: '11px',
          }}
        />
      </div>

      {sortedAndFilteredBikes.map(bike => (
        <Item
          key={bike._id}
          id={bike._id}
          name={bike.name}
          price={bike.price}
          units={bike.availableQuantity}
          category={bike.category}
          image={bike.Image}
        />
      ))}
    </div>
  );
};

export default C_Shop;
