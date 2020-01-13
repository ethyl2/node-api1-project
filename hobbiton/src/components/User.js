import React, { useState } from 'react';
import axios from 'axios';

import Header from './Header';
import Footer from './Footer';
import EditUser from './EditUser';

import quillpen from '../images/Quillpen.png';

const User = props => {
    const [isEditing, setIsEditing] = useState(false);

    const startEdit = () => {
        setIsEditing(!isEditing);
        console.log('start edit');
    }

    const saveEdit = editedUser => {
        console.log(editedUser);
        axios.put(`http://localhost:8000/api/users/${props.location.state.user.id}`, editedUser)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        setIsEditing(!isEditing);
    }

    return (
        <div className='inside'>
            <Header />
            <div className='hobbit-info'>
                <h1>Hobbit:</h1>
                <p>{props.location.state.user.name}</p> 
                <h2>About:</h2>
                <p>{props.location.state.user.bio}</p>

                <div className='quillpen-box grow' onClick={startEdit}>
                                <img className='icon' src={quillpen} alt='edit' />
                            </div>
                
                {isEditing && <EditUser saveEdit={saveEdit} initialUser={props.location.state.user}/>}
            </div>

            

            <Footer />
        </div>
    )
};

export default User;