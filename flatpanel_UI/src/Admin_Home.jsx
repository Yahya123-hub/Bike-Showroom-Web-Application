import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import React from 'react';
 import axios from 'axios';
 import { GiMechanicGarage } from "react-icons/gi";
 import { AiOutlineStock } from "react-icons/ai";
 import { RiPassValidFill } from "react-icons/ri";





function Home() {

  const [mechanicsCount, setMechanicCount] = React.useState(0);
  const [stock, setStock] = React.useState(0);
  const [users, setUsers] = React.useState(0);
  const [approvedmechanics, setApprovedmechanics] = React.useState(0);

  React.useEffect(() => {
      axios.get('http://localhost:3001/MechanicsCount')
      .then(response => {
        setMechanicCount(response.data.count);
      })
      .catch(error => console.error('Error fetching data:', error));

      axios.get('http://localhost:3001/BikeCount')
      .then(response => {
        setStock(response.data.count);
      })
      .catch(error => console.error('Error fetching data:', error));

      axios.get('http://localhost:3001/Users')
      .then(response => {
        setUsers(response.data.count);
      })
      .catch(error => console.error('Error fetching data:', error));

      axios.get('http://localhost:3001/Approvedmechanics')
      .then(response => {
        setApprovedmechanics(response.data.count);
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
            <h3>ADMIN DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>MECHANICS</h3>
                    <GiMechanicGarage className='card_icon'/>
                </div>
                <h1>{mechanicsCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>STOCK</h3>
                    <AiOutlineStock className='card_icon'/>
                </div>
                <h1>{stock}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>USERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{users}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>APPROVED MECHANICS</h3>
                    <RiPassValidFill className='card_icon'/>
                </div>
                <h1>{approvedmechanics}</h1>
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