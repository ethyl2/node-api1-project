import React, { useState } from 'react';
import axios from 'axios';

import Header from './Header';
import Footer from './Footer';
import EditUser from './EditUser';

import quillpen from '../images/Quillpen.png';
import swords from '../images/Swords.png';

const User = props => {
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState(props.location.state.user);

    const startEdit = () => {
        setIsEditing(!isEditing);
        console.log('start edit');
    }

    const saveEdit = editedUser => {
        console.log(editedUser);
        axios.put(`http://localhost:8000/api/users/${user.id}`, editedUser)
            //props.location.state.user.id
            .then(res => {
                console.log(res);
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        setIsEditing(!isEditing);
    }

    const handleDelete = () => {
        console.log('time to delete');
        axios.delete(`http://localhost:8000/api/users/${user.id}`)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            })
        props.history.push('/');
    }

    return (
        <div className='inside'>
            <Header />
            <div className='hobbit-info'>
                <h1>Hobbit:</h1>
                <p>{user.name}</p> 
                <h2>About:</h2>
                <p>{user.bio}</p>

                <div className='inside-buttons'>
                    <div className='quillpen-box grow' onClick={startEdit}>
                                    <img className='icon' src={quillpen} alt='edit' />
                                </div>
                    <div className='swords-box grow' onClick={handleDelete}>
                                    <img src={swords} alt='delete' className='icon' />
                                </div>
                </div>
                
                {isEditing && <EditUser saveEdit={saveEdit} initialUser={user}/>}
            </div>

            

            <Footer />
        </div>
    )
};

export default User;