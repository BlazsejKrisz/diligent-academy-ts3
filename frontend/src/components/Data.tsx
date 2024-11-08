import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

const Data: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const data = await response.json();
      setUsers(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUsers = async (id: number) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    const newUsers = users.filter((user) => user.id !== id);
    setUsers(newUsers);
  }

  const handleAddUsers = async (name:string, email:string) => {
    const response = await fetch(`http://localhost:3000/users/`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ name, email})
  
    });
    const id = Math.max(...users.map(user => (user.id)))
    setUsers([...users, {id: id+1 , name, email}]);
    setName('')
    setEmail('')
  }



  return (
    <>
      <div>
        {users.map((user) => (
          <div key={user.id}>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <button onClick={() => handleDeleteUsers(user.id)}>Delete</button>
          </div>
        ))}
        <div>
          <input value={name} type="text" placeholder="Add Name" onChange={(e) => setName(e.target.value)} />
          <input value={email} type="text" placeholder="Add email" onChange={(e) => setEmail(e.target.value)}/>
          <button onClick={() => (handleAddUsers( name, email))}>Add User</button>
        </div>
      </div>
    </>
  );
};

export default Data;
