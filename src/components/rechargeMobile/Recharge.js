import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import "./Recharge.css"
import cd from "../../images/cd.png"
import orange from "../../images/orange.png"
import vod from "../../images/vod.png"
import airtel from "../../images/airtel.png"
import africell from "../../images/africell.png"
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'


const Recharge = () => {
    return (
        <>
            <Navbar />
            <div className='col-sm-12 rechargeMobile'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>

                <div className='col-sm-10 recharge'>
                    <Link to="/dashboard" className='retour'>
                        <FaArrowLeft /> Retour
                    </Link>
                    <div className='textLogo'>
                        <img src={cd} alt="Logo_RDC" />
                        <h1>Recharge Mobile - Congo-Kinshasa</h1>
                    </div>

                    <div className='content'>
                        <div className='search'>
                            <input type="search" placeholder='Rechercher...' />
                        </div>
                        <div className='main'>
                            <div className='card'>
                                <img src={orange} alt="" />
                                <p>Africell DRC</p>
                            </div>

                            <div className='card'>
                                <img src={airtel} alt="" />
                                <p>Airtel DRC</p>
                            </div>

                            <div className='card'>
                                <img src={africell} alt="" />
                                <p>Orange DRC</p>
                            </div>

                            <div className='card'>
                                <img src={vod} alt="" />
                                <p>Vodacom DRC</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recharge