// src/features/user/UserProfile.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from './userSlice';

const UserProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleSetUser = () => {
    if (name && age) {
      dispatch(setUser({ name, age: Number(age) }));
    }
  };

  const handleClearUser = () => {
    dispatch(clearUser());
    setName('');
    setAge('');
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </div>
      <button onClick={handleSetUser}>Set User</button>
      <button onClick={handleClearUser}>Clear User</button>
      <div>
        <p>Name: {user.name}</p>
        <p>Age: {user.age}</p>
      </div>
    </div>
  );
};

export default UserProfile;
