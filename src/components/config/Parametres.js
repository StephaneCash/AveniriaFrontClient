import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import "./Parametres.css"

const Parametres = () => {

    return (
        <>
            <Navbar />
            <div className='col-sm-12 configuration'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>
                <div className='col-sm-10 parametres'>
                    Paramètres
                </div>
            </div>
        </>
    )
}

export default Parametres