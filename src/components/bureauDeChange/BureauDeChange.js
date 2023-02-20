import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

const BureauDeChange = () => {
    return (
        <div className='compteCustom'>
            <Navbar />
            <div className='compte'>
                <Sidebar />

                <div className='bureau'>
                    <div className='mainBureau'>
                        BureauDeChange
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BureauDeChange