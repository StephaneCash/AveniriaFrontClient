import React from 'react';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import "./Compte.css"
import MainCompte from './MainCompte';

const Compte = () => {
    return (
        <div className='compteCustom'>
            <Navbar />
            <div className='compte'>
                <Sidebar />
                <MainCompte />
            </div>
        </div>
    )
}

export default Compte