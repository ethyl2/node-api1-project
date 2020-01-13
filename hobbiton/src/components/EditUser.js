import React, { useState } from 'react';

const EditUser = props => {
    const [userToEdit, setUserToEdit] = useState(props.initialUser);


    const handleEditChange = e => {
        setUserToEdit({...userToEdit, [e.target.name]: e.target.value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        props.saveEdit(userToEdit);
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