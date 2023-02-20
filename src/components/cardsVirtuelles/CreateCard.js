import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../../bases/baseUrl';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import "./CreateCard.css"

const CreateCard = () => {

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
            <div className='compteCustom'>
                <Navbar />
                <div className='compte'>
                    <Sidebar />
                    <div className='createMain'>
                        <Link to="/compte/cards">
                            <FaArrowLeft /> Retour
                        </Link>
                        <h3>Créer une carte</h3>

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
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}
export default CreateCard;