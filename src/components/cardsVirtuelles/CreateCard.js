import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft, FaRegFrownOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { UserContext } from '../../AppContext';
import { baseUrl } from '../../bases/baseUrl';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import "./CreateCard.css"

const CreateCard = () => {

    const { compteUser } = React.useContext(UserContext);

    const [btnClic, setBtnClic] = useState(false);

    const [type, setType] = useState('');
    const [devise, setDevise] = useState('');

    const createCardVirtual = () => {
        setBtnClic(true);
        if (type === "" || devise === "") {
            toast.error("Veuillez choisir les données renseignées svp.");
            setBtnClic(false);
        } else {
            axios.post(baseUrl + "/cartes-virtuelles",).then(resp => {
                console.log(resp);
                setBtnClic(false);
            })
                .catch(err => {
                    console.log(err);
                    setBtnClic(false);
                    toast.error(err.response.data.raw.message);
                })
        }
    };

    return (
        <>
            <Navbar />
            <div className='col-sm-12 createCartesV'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>
                <div className='col-sm-10 createMain'>
                    <Link to="/compte/cards">
                        <FaArrowLeft /> Retour
                    </Link>

                    {
                        compteUser && compteUser.isValid === true ? (
                            <>
                                <h3>Créer une carte virtuelle</h3>

                                <form>
                                    <select onChange={(e) => setType(e.target.value)}>
                                        <option value="" key="">--Choisir le type de carte--</option>
                                        <option value="Visa" key="">
                                            VISA
                                        </option>
                                        <option value="MasterCard" key="">MASTERCARD</option>
                                    </select>

                                    <select onChange={(e) => setDevise(e.target.value)}>
                                        <option value="" key="">--Choisir la devise--</option>
                                        <option value="Usd" key="">USD</option>
                                        <option value="Euro" key="">EURO</option>
                                    </select>
                                </form>

                                <div className='button'>
                                    <button onClick={createCardVirtual}>
                                        {btnClic ? (
                                            <i className='fa fa-spinner fa-pulse'></i>
                                        ) : "Créer"}
                                    </button>
                                </div>
                            </>
                        ) :
                            <div className='cardSC configCompte'>
                                <FaRegFrownOpen size={25} style={{ marginBottom: "1rem" }} />
                                Votre compte n'est pas configuré veuillez le configurer ici
                                <br />
                                <Link to="/compte/config/compte-user">
                                    <button type='button'>
                                        Configurer votre compte
                                    </button>
                                </Link>
                            </div>
                    }

                </div>
            </div>
            <ToastContainer />
        </>
    )
}
export default CreateCard;