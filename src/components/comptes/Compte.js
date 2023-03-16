import React from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import "./Compte.css"
import MainCompte from './MainCompte';

const Compte = () => {
    return (
        <>
            <Navbar />
            <div className='col-sm-12 ccompteUser'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>
                <div className='col-sm-10'>
                    <MainCompte />
                </div>
            </div>
        </>
    )
}

export default Compte