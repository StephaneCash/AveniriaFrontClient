import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import "./Depot.css"

const Depot = () => {
    return (
        <div className='compteCustom'>
            <Navbar />
            <div className='compte'>
                <Sidebar />

                <div className='depot'>
                    Dépôt
                </div>
            </div>
        </div>
    )
}

export default Depot