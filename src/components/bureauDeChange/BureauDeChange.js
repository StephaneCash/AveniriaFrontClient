import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { countries } from 'country-flag-icons'

const BureauDeChange = () => {
    return (
        <div className='compteCustom'>
            <Navbar />
            <div className='compte'>
                <Sidebar />

                <div className='bureau'>
                    <div className='mainBureau'>

                        {
                            countries.map(val => {
                                return <img
                                    alt="United States"
                                    width={100}
                                    src={
                                        "http://purecatamphetamine.github.io/country-flag-icons/3x2/" + val + ".svg"
                                    }
                                />

                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BureauDeChange