import React from 'react';
import './Loader.scss'
const Loader = ({ loader }: { loader: boolean }) => {
    return (
        <>
            {loader
                ?
                <div className='white-box'>
                    <div className='loader'>
                    </div>
                </div>
                :
                <></>
            }
        </>
    );
};

export default Loader;