import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    //tried using https://cors-anywhere.herokuapp.com/ but no success
    useEffect(() => {
        axios.get('http://localhost:8000/api/users')
        .then(res => {
            console.log(res);
            setUsers(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);

    const handleDelete = (id) => {
        console.log('time to handle delete ' + id);
        axios.delete(`http://localhost:8000/api/users/${id}`)
            .then(res => {
                console.log(res);
                setUsers(users.filter(user => user.id !== id));
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    return (
        <div>Users AKA Hobbits go here
            {users.map(user => {
                return (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                        <p>{user.bio}</p>
                        <button onClick={() => handleDelete(user.id)}>X</button>
                    </div>
                )
            })}
        </div>
    );
}

export default Users;
