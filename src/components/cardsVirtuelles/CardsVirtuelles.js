import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import "./CardsVirtuelles.css"
import visa from "../../images/visa.png";
import master from "../../images/master.png";
import MediaCard from './Card';

const CardsVirtuelles = () => {
    return (
        <div className='compteCustom'>
            <Navbar />
            <div className='compte'>
                <Sidebar />
                <div className='cartes'>
                    <div className='cartesFull'>
                        <MediaCard img1={visa} img2={master} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardsVirtuelles