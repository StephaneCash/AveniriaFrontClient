import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import "./Transactions.css";
import { FaArrowLeft } from "react-icons/fa";
import BasicTable from "./Table";
import axios from 'axios';
import { baseUrl } from '../../bases/baseUrl';
import { UserContext } from '../../AppContext';

const Transactions = () => {

    const [transactions, setTransactions] = useState([]);

    const { compteUser } = React.useContext(UserContext);

    const [valueSearch, setValueSearch] = useState('');
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (compteUser) {
            setUserId(compteUser && compteUser.userId)
        }
    }, [compteUser]);

    const getAllTransactions = () => {
        axios.get(`${baseUrl}/transactions/getByUserId/${userId}`)
            .then(res => {
                setTransactions(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        if (userId) {
            getAllTransactions();
        }
    }, [userId]);

    const handleChange = (e) => {
        setValueSearch(e.target.value);
    };

    return (
        <>
            <Navbar />
            <div className='col-sm-12 transactionContent'>
                <div className='col-sm-2'>
                    <Sidebar />
                </div>
                <div className='col-sm-10 content' style={{ marginTop: "75px" }}>
                    <Link to="/dashboard" className='retour'>
                        <FaArrowLeft /> Retour
                    </Link>

                    <div className='contentTable'>
                        <div className='alertContent'>
                            <div className='col-sm-12'>
                                <h6>({transactions && transactions.taille ? transactions.taille : "0"}) Transactions</h6>
                                <div className='btns'>
                                    <div className='col-sm-9'>
                                        <button>
                                            <Link to='/compte/depot'>
                                                Effecteur un dépôt
                                            </Link>
                                        </button>
                                        <button>
                                            <Link to='/compte/retrait'>
                                                Effecteur un retrait
                                            </Link>
                                        </button>
                                    </div>

                                    <div className='col-sm-3'>
                                        <Link to="/compte/transactions/transfert-argent">
                                            <button className='transfertBtn' type='button'>Transférer de l'argent</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className='search'>
                                <input
                                    placeholder='Rechercher par motif, nom du client'
                                    type="search"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <BasicTable
                            data={transactions}
                            compteUser={compteUser}
                            valueSearch={valueSearch}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Transactions