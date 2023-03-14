import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import "./Parametres.css"

const Parametres = () => {

    return (
        <div className='compteCustom'>
            <Navbar />
            <div className='compte'>
                <Sidebar />
                <div className='mainParametre'>
                    Paramètres
                </div>
            </div>
        </div>
    )
}

export default Parametres