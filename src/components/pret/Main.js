import React, { useState } from 'react'
import { FaArrowLeft, FaHandHoldingUsd } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import BasicTable from './Table'

const Main = () => {

    const [taillePrets, setTaillePret] = useState(0);

    return (
        <>
            <Navbar />
            <div className='col-sm-12 pretsMoney'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>
                <div className='mainPret col-sm-10'>
                    <Link to="/dashboard" className='retour'>
                        <FaArrowLeft /> Retour
                    </Link>

                    <div className='contentTable'>
                        <div className='alertContent'>
                            <div className='bloc1'>
                                <h6>({taillePrets}) Prêts</h6>
                                <div className='transfert'>
                                    <Link to="/pret/demande">
                                        <button className='transfertBtn' type='button'>Demander un prêt <FaHandHoldingUsd size={20} /> </button>
                                    </Link>
                                </div>
                            </div>

                            <div className='search'>
                                <input type="search" placeholder='Rechercher...' />
                            </div>
                        </div>
                        <BasicTable setTaillePret={setTaillePret} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Main