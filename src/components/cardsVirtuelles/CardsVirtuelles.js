import React from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import "./CardsVirtuelles.css"
import visa from "../../images/visa.png";
import master from "../../images/master.png";
import MediaCard from './Card';

const CardsVirtuelles = () => {
    return (
        <>
            <Navbar />
            <div className='col-sm-12 cartesVirtuelles'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>

                <div className='col-sm-10'>
                    <div className='cartes'>
                        <div className='cartesFull'>
                            <MediaCard img1={visa} img2={master} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardsVirtuelles