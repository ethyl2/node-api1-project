import React, { useState } from 'react';
import UIfx from 'uifx';

import quillpen from '../images/Quillpen.png';
import swords from '../images/Swords.png';

import scribble from '../audio/scribble.wav';

const scribbleSound = new UIfx(
    scribble,
    {
        volume: 0.8,
        throttleMs: 100
    }
);

const EditUser = props => {
    //const [editing, setEditing] = useState(false);
    const [userToEdit, setUserToEdit] = useState(initialUser);


    const handleEditChange = e => {
        setUserToEdit({...userToEdit, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        //props.saveEdit(userToEdit);
    }

    return (
        <form onSubmit={handleSubmit}>
            <legend>Edit Hobbit</legend>

            <label htmlFor='name'>Name: </label>
            <input type='text' name='name' id='id' value={userToEdit.name} onChange={handleEditChange} /> 
            <br />
            
            <label htmlFor='bio'>Bio: </label>
            <input type='text' name='bio' id='bio' value={userToEdit.bio} onChange={handleEditChange} />
            <br />
            
            <button type='submit' className='grow'>Submit Changes</button>   
        </form>
    )


}

export default EditUser;