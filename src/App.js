import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=2')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.first_name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="App">
      <h1>User List</h1>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearchInputChange}
        placeholder="Search by first name"
        className="search-input"
      />
      <div className="user-list">
        {filteredUsers.length === 0 ? (
          <p className="no-users">No matching users found.</p>
        ) : (
          filteredUsers.map((user) => (
            <div className="user-item" key={user.id}>
              <div className='user-id-container'>
                <p className="user-id">{user.id}</p>
              </div>
              <img src={user.avatar} alt={user.first_name} className="user-avatar" />
              <p className="user-name">{user.first_name}</p>
              
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
