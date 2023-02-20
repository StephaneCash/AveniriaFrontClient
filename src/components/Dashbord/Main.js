import React from 'react';
import Dashboard from './Dashboard';
import RightSide from '../RightSide/RightSide';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import { UserContext } from '../../AppContext';
import { FaRegFrownOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Main = () => {

    const { compteUser } = React.useContext(UserContext);

    return (
        <div className='appDash'>
            <Navbar />
            <div className='dashbaordMain'>
                <Sidebar />

                {
                    compteUser && compteUser.isValid === false ?
                        (
                            <div className='compteConf'>
                                <FaRegFrownOpen size={25} />
                                Votre compte n'est pas configuré veuillez le configurer ici
                                <br />
                                <Link to="/compte/config/compte-user">
                                    <button type='button'>
                                        Configurer votre compte
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Dashboard />
                                <RightSide />
                            </>
                        )
                }
            </div>
        </div>
    )
}

export default Main