import React, { useState, useEffect} from 'react';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    //tried using https://cors-anywhere.herokuapp.com/ but no success
    useEffect(() => {
        axios.get('localhost:3000/api/users')
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }, []);
    
    return (
        <div>Users AKA Hobbits go here</div>
    );
}

export default Users;
