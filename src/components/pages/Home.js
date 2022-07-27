import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get(
      "https://62de2a29ccdf9f7ec2d2197a.mockapi.io/user-dashboard"
    );
    setUsers(result.data.reverse());
    
  };

  const deleteUser = async (id) => {
    await axios.delete(`https://62de2a29ccdf9f7ec2d2197a.mockapi.io/user-dashboard/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Home Page</h1>
        <table class="table border shadow">
          <thead class="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <td>
                    <Link className="btn btn-primary mx-2" to={`/users/${user.id}`}>View</Link>
                    <Link className="btn btn-outline-primary mx-2"  to={`/users/edit/${user.id}`}>Edit</Link>
                    <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
