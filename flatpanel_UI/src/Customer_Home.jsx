import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import { RiMotorbikeLine } from "react-icons/ri";
 import { TbJewishStar } from "react-icons/tb";
 import { MdBorderColor } from "react-icons/md";
 import { RiRefundLine } from "react-icons/ri";
 import React from 'react';
 import axios from 'axios';




function Home() {

  const [bikeCount, setBikeCount] = React.useState(0);
  const [wishlist, setWishlist] = React.useState(0);
  const [deliveredorders, setDeliveredorders] = React.useState(0);
  const [refunds, setRefunds] = React.useState(0);

  React.useEffect(() => {
      axios.get('http://localhost:3001/BikeCount')
      .then(response => {
        setBikeCount(response.data.count);
      })
      .catch(error => console.error('Error fetching data:', error));

      axios.get('http://localhost:3001/WishlistCount')
      .then(response => {
        setWishlist(response.data.count);
      })
      .catch(error => console.error('Error fetching data:', error));

      axios.get('http://localhost:3001/DeliveredOrdersCount')
      .then(response => {
        setDeliveredorders(response.data.count);
      })
      .catch(error => console.error('Error fetching data:', error));

      axios.get('http://localhost:3001/RefundsCount')
      .then(response => {
        setRefunds(response.data.count);
      })
      .catch(error => console.error('Error fetching data:', error));


  }, []);

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     

  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>CUSTOMER DASHBOARD</h3>
        </div> 

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>BIKES</h3>
                    <RiMotorbikeLine className='card_icon'/>
                </div>
                <h1>{bikeCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>WISHLIST</h3>
                    <TbJewishStar className='card_icon'/>
                </div>
                <h1>{wishlist}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>DELIVERED ORDERS</h3>
                    <MdBorderColor className='card_icon'/>
                </div>
                <h1>{deliveredorders}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>REFUNDS</h3>
                    <RiRefundLine className='card_icon'/>
                </div>
                <h1>{refunds}</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="black" />
                <Bar dataKey="uv" fill="gray" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="black" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="gray" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home