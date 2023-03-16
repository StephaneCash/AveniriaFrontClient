import { Paper } from '@mui/material';
import React, { useContext } from 'react'
import { UserContext } from '../../AppContext';
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar';
import "./CreateTransaction.css";
import FormStepper from './FormStepper';
import { FaRegFrownOpen } from "react-icons/fa"
import { Link } from 'react-router-dom';

const CreateTransaction = () => {

    const { compteUser } = useContext(UserContext);

    return (
        <>
            <Navbar />
            <div className='transactionContent'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>
                <div className='col-sm-10 createTransaction' style={{ marginTop: "70px" }}>
                    {
                        compteUser && compteUser.isValid === false ?
                            (
                                <div className='configCompte'>
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
                                <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                                    style={{ backgroundColor: "#13203b", color: "aliceblue", border: "1px solid #3a4a69" }}>
                                    <FormStepper />
                                </Paper>
                            )
                    }
                </div>
            </div>
        </>
    )
}

export default CreateTransaction