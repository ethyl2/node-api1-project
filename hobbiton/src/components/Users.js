import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Users = () => {
    const initialUser = {name: '', bio: ''};
    const [users, setUsers] = useState([]);
    const [adding, setAdding] = useState(false);
    const [newUser, setNewUser] = useState(initialUser);

    

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

    const startAdd = () => {
        setAdding(true);

    }

    const handleChange = e => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const saveAdd = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users', newUser)
            .then(res => {
                console.log(res.data);
                //setUsers(...users, res.data); //Why is this causing users.map to not be a function??
                axios.get('http://localhost:8000/api/users')
                    .then(res => {
                    console.log(res);
                    setUsers(res.data);
        })
        .catch(err => {
            console.log(err);
        })
                setAdding(false);
                setNewUser(initialUser);
            })
            .catch(err => {
                console.log(err);
                setAdding(false);
            });
    }
    
    return (
        <div>
            <h1>Current Hobbits</h1>
            {!adding && <button onClick={startAdd}>Add Hobbit</button>}

            {adding && (
            <form onSubmit={saveAdd}>
                <legend>Add a Hobbit to Hobbiton</legend>
                <label htmlFor='name'>Name: </label>
                <input type='text' name='name' id='id' value={newUser.name} onChange={handleChange} /> 
                <br />
                <label htmlFor='bio'>Bio: </label>
                <input type='text' name='bio' id='bio' value={newUser.bio} onChange={handleChange} />
                <br />
                <button type='submit'>Add Hobbit</button>
            </form>)
            }
            {users && users.map(user => {
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
