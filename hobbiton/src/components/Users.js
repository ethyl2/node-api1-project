import React, { useState, useEffect} from 'react';
import axios from 'axios';
import UIfx from 'uifx';

import Header from './Header';
import Footer from './Footer';

//import window from '../images/Window.png';
import window from '../images/HobbitDoorWindow.png';
import doorknob from '../images/Doorknob.png';
import quillpen from '../images/Quillpen.png';
import swords from '../images/Swords.png';

import birds from '../audio/birds.mp3';
import goodbye from '../audio/goodbye.wav';
import scribble from '../audio/scribble.wav';
import turnKnob from '../audio/turnKnob.mp3';
import fanfare from '../audio/fanfare.wav';
import hello from '../audio/hello.wav';

const birdSong = new UIfx(
    birds,
    {
        volume: 0.4,
        throttleMs: 100
    }
);

const goodbyeSound = new UIfx(
    goodbye,
    {
        volume: 0.4,
        throttleMs: 100
    }
);

const scribbleSound = new UIfx(
    scribble,
    {
        volume: 0.8,
        throttleMs: 100
    }
);

const knobSound = new UIfx(
    turnKnob,
    {
        volume: 0.3,
        throttleMs: 100
    }
);

const fanfareSound = new UIfx(
    fanfare,
    {
        volume: 0.3,
        throttleMs: 100
    }
);

const helloSound = new UIfx(
    hello,
    {
        volume: 0.5,
        throttleMs: 100
    }
);

const Users = (props) => {
    const initialUser = {name: '', bio: ''};
    const [users, setUsers] = useState([]);
    const [adding, setAdding] = useState(false);
    const [newUser, setNewUser] = useState(initialUser);
    const [editing, setEditing] = useState(false);
    const [userToEdit, setUserToEdit] = useState(initialUser);
    const [allowAudio, setAllowAudio] = useState(false);


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
        if (allowAudio) {
            goodbyeSound.play();
        }
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
        setAdding(!adding);
        if (allowAudio) {
            helloSound.play();
        }

    }

    const cancelAdd = () => {
        setAdding(!adding);
    }

    const handleChange = e => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const saveAdd = e => {
        e.preventDefault();
        if (allowAudio) {
            fanfareSound.play();
        }
        axios.post('http://localhost:8000/api/users', newUser)
            .then(res => {
                console.log(res.data);
                
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
        setEditing(!editing);
        if (allowAudio) {
            scribbleSound.play();
        }
        setUserToEdit(user);
    }

    const handleEditChange = e => {
        setUserToEdit({...userToEdit, [e.target.name]: e.target.value});
    }

    const saveEdit = e => {
        e.preventDefault();
        if (allowAudio) {
            fanfareSound.play();
        }
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

    const handleAudio = () => {
        setAllowAudio(true);
        birdSong.play();
    }

    const turnKnob = () => {
        if (allowAudio) {
            knobSound.play();
        }
    }

    const enterHouse = user => {
        //props.history.push(`/users/${user.id}`);
        props.history.push({
            pathname:`/users/${user.id}`,
            state: {user: user}
        });
    }

    const cancelEdit = () => {
        setEditing(!editing);
    }
    
    return (
        <div className='outside'>
            <Header />
            {!allowAudio && <button onClick={handleAudio} className='grow'>Allow Audio</button>}
            {!adding && !editing && <button onClick={startAdd} className='grow'>Add Hobbit</button>}

            {editing && <form onSubmit={saveEdit}>
            <legend>Edit Hobbit</legend>
                <label htmlFor='name'>Name: </label>
                <input type='text' name='name' id='id' value={userToEdit.name} onChange={handleEditChange} /> 
                <br />
                <label htmlFor='bio'>Bio: </label>
                <input type='text' name='bio' id='bio' value={userToEdit.bio} onChange={handleEditChange} />
                <br />
                <button type='submit' className='grow'>Submit Changes</button>      
            </form>}

            {editing && <button onClick={cancelEdit}>Cancel Edit</button> }
        
        
            {adding && (
            <form onSubmit={saveAdd}>
                <legend>Add a Hobbit to Hobbiton</legend>
                <label htmlFor='name'>Name: </label>
                <input required type='text' name='name' id='id' value={newUser.name} onChange={handleChange} /> 
                <br />
                <label htmlFor='bio'>Bio: </label>
                <input required type='text' name='bio' id='bio' value={newUser.bio} onChange={handleChange} />
                <br />
                <button type='submit' className='grow'>Add Hobbit</button>
            </form>)
            }
            {adding && <button onClick={cancelAdd}>Cancel Add</button>}
            
            <div className='users-box'>
            {users && users.map(user => {
                return (
                    <div key={user.id} className='user-box'>
                        <div className='window-box'>
                            <img src={window} alt='window'className='icon' />
                        </div>
                        <h2>{user.name}</h2>
                        <div className='doorknob-box grow'>
                            <img src={doorknob} 
                                alt='doorknob' 
                                className='icon' 
                                onMouseEnter={turnKnob} 
                                onClick={() => enterHouse(user)}/>
                        </div>
                        <p>{user.bio}</p>
                        <div className='button-box'>
                            <div className='swords-box grow' onClick={() => handleDelete(user.id)}>
                                <img src={swords} alt='delete' className='icon' />
                            </div>
                            
                            <div className='quillpen-box grow'  onClick={() => startEdit(user)}>
                                <img className='icon' src={quillpen} alt='edit' />
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
            <Footer />
        </div>
    );
}

export default Users;
