import React, { useState } from 'react';

const Footer = () => {
    const [seeSoundSources, setSeeSoundSources] = useState(false);
    const showSoundSources = () => {
        setSeeSoundSources(!seeSoundSources);
    }

    return (
        <footer>
            
            {!seeSoundSources && <button onClick={showSoundSources}>Sound Sources</button>}
            {seeSoundSources && <div className='soundSources'>
                <a href='https://freesound.org/s/445802/'>Knob</a>
                <a href='https://freesound.org/s/395830/'>Birds</a>
                <a href='https://freesound.org/s/341738/'>Goodbye</a>
                <a href='https://freesound.org/s/449069/'>Fanfare</a>
                <a href='https://freesound.org/s/343898/'>Hello</a>
            </div>}
            <p>Copyright 2020 Heather Nuffer</p>
        </footer>
    )
};

export default Footer;