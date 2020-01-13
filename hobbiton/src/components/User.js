import React from 'react';

import Header from './Header';
import Footer from './Footer';

const User = props => {
    return (
        <div className='inside'>
            <Header />
            <div className='hobbit-info'>
                <h1>Hobbit:</h1>
                <p>{props.location.state.user.name}</p> 
                <h2>About:</h2>
                <p>{props.location.state.user.bio}</p>
            </div>
            <Footer />
        </div>
    )
};

export default User;