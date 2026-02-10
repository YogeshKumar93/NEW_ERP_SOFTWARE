import React, { useEffect, useState } from "react";
import AppLayout from "../../Layouts/AppLayout";
import axios from "axios";

const Index = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Dummy users fetch (without DB)
    const fetchUsers = async () => {
      try {
        // Frontend test ke liye dummy data
        setUsers([
          { id: 1, name: "John Doe", email: "john@example.com" },
          { id: 2, name: "Jane Doe", email: "jane@example.com" },
        ]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <AppLayout>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </AppLayout>
  );
};

export default Index;
