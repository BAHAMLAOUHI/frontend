import React, { useEffect, useState } from 'react';
import api from '../axios'; 

const Test = () => {
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
    <div>
      <h1>Authenticated User</h1>
      <p><strong>Username:</strong> {user.nom} {user.prenom}</p>
      <p><strong>Email:</strong> {user.email}</p>
    </div>
  );
};

export default Test;
