import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";


const LoadingScreen = () => {
    return (
        <div className='absolute h-screen w-screen flex justify-center items-center'>
            <ClipLoader color='blue' size={120}/>
        </div>
    );
};

export default LoadingScreen;