import React from 'react'
import { FaRegCopy } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { UserContext } from '../../AppContext';
import { baseUrl } from '../../bases/baseUrl';
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import "./Affiliation.css";
import BasicTable from './Table';

const Affiliation = () => {

    const { userData } = React.useContext(UserContext);
    const userDataLength = userData && userData._id.split('')

    const handleCopy = () => {
        toast.success('Lien copié avec succès.');

        const data = userData && userDataLength[userDataLength.length - 2] + userDataLength[userDataLength.length - 1] +
            Math.floor(Math.random() * 1000);
        const linkGenere = baseUrl + "/users?ref=" + data;

        navigator.clipboard.writeText(linkGenere)
    };

    return (
        <div className='compteCustom'>
            <Navbar />
            <div className='compte'>
                <Sidebar />

                <div className='affiliations'>
                    <div className='data'>
                        <p>
                            <span>Invitez vos amis et Gagnez de l'argent.</span>
                            <span>Invitez vos amis et gagnez $0.25 par personne et $0.50 pour chaque carte créée par votre ami.</span>
                        </p>
                        <button onClick={handleCopy}>
                            Copier le lien <FaRegCopy size={20} />
                        </button>
                    </div>

                    <BasicTable />
                </div>
            </div>

            <ToastContainer />
        </div>
    )
}

export default Affiliation