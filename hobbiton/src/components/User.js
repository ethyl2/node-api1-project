import React from 'react';

const User = props => {
    return (
        <div style={{'color': 'white'}}>{`More info about Hobbit ${props.location.state.user.name} with id of ${props.match.params.id} and bio of ${props.location.state.user.bio} to come!`}</div>

    )
};

export default User;