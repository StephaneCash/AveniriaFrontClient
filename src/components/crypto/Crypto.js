import React from 'react'
import { FaBitcoin, FaPlus } from 'react-icons/fa'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import "./Crypto.css"

const Crypto = () => {

    const hanldeCreateWallet = () => {
        alert("Veuillez fournir un jéton d'authentification svp.")
    };

    return (
        <>
            <Navbar />
            <div className='col-sm-12 dataCrypto'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>

                <div className='col-sm-10 crypto'>
                    <div className='mainCrypto'>
                        <FaBitcoin size={80} />
                        <p>Gérer votre compte cryptomonaie</p>
                        <button onClick={hanldeCreateWallet}>Créer un wallet <FaPlus /> </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Crypto