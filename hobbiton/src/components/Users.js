import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Users = () => {
    const initialUser = {name: '', bio: ''};
    const [users, setUsers] = useState([]);
    const [adding, setAdding] = useState(false);
    const [newUser, setNewUser] = useState(initialUser);
    const [editing, setEditing] = useState(false);
    const [userToEdit, setUserToEdit] = useState(initialUser);


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
                const submittedUser = res.data;
                //setUsers({...users, submittedUser}); //Why is this causing users.map to not be a function??
                axios.get('http://localhost:8000/api/users')
                    .then(res => {
                    console.log(res);
                    setUsers(res.data);
                })
                    .catch(err => {
                    console.log(err);
                });
                setAdding(false);
                setNewUser(initialUser);
            })
            .catch(err => {
                console.log(err);
                setAdding(false);
            });
    }

    const startEdit = (user) => {
        setEditing(true);
        setUserToEdit(user);
    }

    const handleEditChange = e => {
        setUserToEdit({...userToEdit, [e.target.name]: e.target.value});
    }

    const saveEdit = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/${userToEdit.id}`, userToEdit)
            .then(res => {
                console.log(res);
                setEditing(false);
                
                setUsers(users.map(user => {
                    if (user.id !== userToEdit.id) {
                        return user;
                    } else {
                        return res.data;
                    }
                }))
                setUserToEdit(initialUser);
                })  
            .catch(err => {
                console.log(err);
                setEditing(false);
                setUserToEdit(initialUser);
            });
    }
    
    return (
        <div>
            <h1>Current Hobbits</h1>
            {!adding && !editing && <button onClick={startAdd}>Add Hobbit</button>}

            {editing && <form onSubmit={saveEdit}>
            <legend>Edit Hobbit</legend>
                <label htmlFor='name'>Name: </label>
                <input type='text' name='name' id='id' value={userToEdit.name} onChange={handleEditChange} /> 
                <br />
                <label htmlFor='bio'>Bio: </label>
                <input type='text' name='bio' id='bio' value={userToEdit.bio} onChange={handleEditChange} />
                <br />
                <button type='submit'>Submit Changes</button>   
            </form>
        
        }
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
                        <button onClick={() => startEdit(user)}><span role='img' aria-label='pencil'>✏️</span></button>
                    </div>
                )
            })}
        </div>
    );
}

export default Users;
