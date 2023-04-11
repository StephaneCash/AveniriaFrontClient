import React, { useEffect, useState } from 'react'
import "react-circular-progressbar/dist/styles.css"
import { baseUrl } from '../../bases/baseUrl';
import axios from 'axios';
import { timestampParser } from '../../Utils';
import "./Card.css"
import { useRef } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../AppContext';
import { FaCreditCard, FaExchangeAlt } from 'react-icons/fa';
import Laoder from '../loader/Loader';
import invest from "../../images/invest.svg";
import invest1 from "../../images/invest1.svg";
import credit from "../../images/credit.svg"


function Card() {

    const { compteUser } = useContext(UserContext);

    const [progress, setProgress] = useState(0);
    let interval = useRef(null);

    useEffect(() => {
        interval.current = setInterval(() => {
            setProgress((old) => old + 50);
        }, 1000);
        return () => {
            clearInterval(interval.current);
        };
    }, []);

    useEffect(() => {
        if (progress < 100) return;
        clearInterval(interval.current);
    }, [progress]);

    const [transactions, setTransactions] = useState([]);
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

    return (
        <div className='mainDashboard'>
            <h1>Tableau de bord <span
                style={{ color: "silver", fontSize: "15px" }}>
                <FaExchangeAlt size={20} />
                Compte {compteUser && compteUser.type}</span>
            </h1>

            <div className='card' style={{
                border: "none"
            }}>
                {
                    compteUser && compteUser.devises.length > 0 ? compteUser.devises.map((devise, i) => {
                        return (
                            <div className='card' key={devise._id}>
                                <div className='iconD'>
                                    <FaCreditCard size={20} />
                                </div>
                                <div className='row2'>
                                    <div className='circular'>
                                        {
                                            devise.devise === "Dollar" ?
                                                <img src={invest} alt='Investimment' /> : devise.devise === "Euro" ?
                                                    <img src={invest1} alt='Investimment' /> : devise.devise === "CDF" ?
                                                        <img src={credit} alt='Investimment' />
                                                        : ""
                                        }
                                    </div>
                                    <div className='valueDevise'>
                                        {devise.montant}
                                        {
                                            devise.devise === "Dollar" ?
                                                "$ " : devise.devise === "Euro" ?
                                                    "€ " : devise.devise === "CDF" ? "CDF " : ""
                                        }

                                    </div>
                                </div>
                                <div className='row3'>
                                    <div className='title'>
                                        {
                                            devise.devise
                                        }
                                    </div>
                                    <div className='dateLast'>
                                       {timestampParser(compteUser && compteUser.updatedAt)}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <Laoder />
                }
            </div>
        </div >
    )
}


export default Card