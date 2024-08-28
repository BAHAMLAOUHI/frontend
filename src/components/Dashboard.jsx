// Dashboard.js 
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom'; 
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button, Typography, Box } from '@mui/material';
import './Dashboard.css';

import api from '../axios'; 



const data=[
	{"alias": "Oacceuil", "date_visite": "2024-02-16T22:11:00"},
	{"alias": "Sav_CNX", "date_visite": "2024-01-14T16:16:00"},
	{"alias": "Sav_CNX", "date_visite": "2024-03-02T02:11:00"},
	{"alias": "Oacceuil", "date_visite": "2024-01-30T02:03:00"},
	{"alias": "OBoutique", "date_visite": "2024-01-27T22:56:00"},
	{"alias": "mark", "date_visite": "2024-01-10T21:15:00"},
	{"alias": "mark", "date_visite": "2024-01-20T19:59:00"},
	{"alias": "OBoutique", "date_visite": "2024-01-20T17:23:00"},
	{"alias": "Login", "date_visite": "2024-02-23T04:54:00"},
	{"alias": "diana", "date_visite": "2024-02-28T14:04:00"},
	{"alias": "Login", "date_visite": "2024-02-28T07:45:00"},
	{"alias": "Oacceuil", "date_visite": "2024-02-17T15:23:00"},
	{"alias": "Oacceuil", "date_visite": "2024-02-27T06:04:00"},
	{"alias": "diana", "date_visite": "2024-02-17T08:40:00"},
	{"alias": "lucas", "date_visite": "2024-01-16T10:14:00"},
	{"alias": "Login", "date_visite": "2024-02-28T22:27:00"},
	{"alias": "Sav_CNX", "date_visite": "2024-02-02T07:48:00"},
	{"alias": "Sav_CNX", "date_visite": "2024-01-18T15:16:00"},
	{"alias": "diana", "date_visite": "2024-01-30T08:33:00"},
	{"alias": "Sav_CNX", "date_visite": "2024-02-18T17:40:00"},
	{"alias": "Login", "date_visite": "2024-01-03T00:20:00"},
	{"alias": "lucas", "date_visite": "2024-01-24T23:23:00"},
	{"alias": "OBoutique", "date_visite": "2024-01-30T17:58:00"},
	{"alias": "Sav_CNX", "date_visite": "2024-02-17T08:43:00"}
  ]


const aggregatedData = data.reduce((acc, item) => {
    acc[item.alias] = (acc[item.alias] || 0) + 1;
    return acc;
}, {});

const chartData = Object.keys(aggregatedData).map(key => ({
    alias: key,
    visits: aggregatedData[key],
}));






function WelcomeDashboard() { 
	





	const history = useNavigate();
	const handleLogout = () => { 
        console.log("Logout");
        console.log(localStorage.getItem('jwtToken'));
        localStorage.removeItem('jwtToken');
        history('/'); 
	}; 

	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);
  
	useEffect(() => {
	  const fetchUserData = async () => {
		try {
		  const response = await api.get('/users/me');
		  setUser(response.data);
		  console.log(response.data);
		} catch (err) {
		  setError('Failed to fetch user data.');
		  console.error(err);
		}
	  };
  
	  fetchUserData();
	}, []);
  
	if (error) {
	  return <div>{error}</div>;
	}
  
	if (!user) {
	  return <div>Loading...</div>;
	}

	return (
        <div className="dashboard-container">
            <Box className="dashboard-header">
                <Typography variant="h4" gutterBottom>
                    Welcome to the Dashboard 
                </Typography>
				<h1>{user.nom} {user.prenom}</h1>
                <Typography variant="subtitle1">
                    You are logged in successfully.
                </Typography>
            </Box>

            <Box className="dashboard-chart">
                <Typography variant="h6" gutterBottom>
                    Visits by Alias (Bar Chart)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="alias" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="visits" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>

            <Box className="dashboard-chart">
                <Typography variant="h6" gutterBottom>
                    Visits over Time (Line Chart)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <XAxis dataKey="alias" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="visits" stroke="#8884d8" />
                    </LineChart>
                </ResponsiveContainer>
            </Box>

            <Box className="dashboard-chart">
                <Typography variant="h6" gutterBottom>
                    Visits by Alias (Pie Chart)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={chartData} dataKey="visits" nameKey="alias" cx="50%" cy="50%" outerRadius={100}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#82ca9d" : "#8884d8"} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </Box>

            <Box className="dashboard-logout">
                <Button variant="contained" color="primary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
        </div>
    );
}

export default WelcomeDashboard; 
