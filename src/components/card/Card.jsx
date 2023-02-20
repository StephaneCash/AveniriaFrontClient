import React, { useEffect, useState } from 'react'
import {
    CircularProgressbarWithChildren,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"
import { baseUrl } from '../../bases/baseUrl';
import axios from 'axios';
import { timestampParser } from '../../Utils';
import "./Card.css"
import { useRef } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../AppContext';
import { FaCcMastercard, FaCcVisa, FaList } from 'react-icons/fa';
import Chart from "react-apexcharts";
import Laoder from '../loader/Loader';


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

    const options = {
        xaxis: {
            categories: transactions && transactions.data && transactions.data.map(value => {
                return timestampParser(value.createdAt).substring(0, 19)
            })
        }
    };
    const series = [
        {
            name: "Transactions",
            data: transactions && transactions.data && transactions.data.map(value => {
                return value.montant
            })
        },
        {
            name: "Prêts",
            data: [23, 12, 94, 81, 32, 56, 81, 19]
        },
        {
            name: "Cartes virtuelles",
            data: [2, 12, 54, 61, 32, 6, 81, 109]
        },
    ];

    return (
        <div className='cards'>

            <div className='card' style={{ width: 320, padding: "0 3rem" }}>
                <div>Solde</div>
                <div className='cardChilds'>
                    {
                        compteUser ? compteUser.devises.map((devise, i) => {
                            return (
                                <div className='cardMin' key={devise._id}>
                                    {
                                        devise.devise === "Dollar" ?
                                            "$ " : devise.devise === "Euro" ?
                                                "€ " : devise.devise === "CDF" ? "CDF " : ""
                                    }
                                    <span>{devise.montant}</span>

                                </div>
                            )
                        }) : <Laoder />
                    }
                </div>

                <div className='circular'>
                    <div className='cardCircular'>
                        <div className='cardLastChild'>
                            <span style={{ margin: "1rem" }}> <FaList size={33} /> Transferts gratuits </span>
                        </div>
                        <CircularProgressbarWithChildren value={66}>
                            <div style={{ fontSize: 12, marginTop: -5 }}>
                                <strong>66%</strong>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>

                    <div className='cardCircular'>
                        <div className='cardLastChild'>
                            <span style={{ margin: "1rem" }}> <FaCcVisa size={50} /> (Usage)</span>
                        </div>
                        <CircularProgressbarWithChildren value={100}>
                            <div style={{ fontSize: 12, marginTop: -5 }}>
                                <strong>100%</strong>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>

                    <div className='cardCircular'>
                        <div className='cardLastChild'>
                            <span style={{ margin: "1rem" }}> <FaCcMastercard size={50} /> (Usage)</span>
                        </div>
                        <CircularProgressbarWithChildren value={100}>
                            <div style={{ fontSize: 12, marginTop: -5 }}>
                                <strong>100%</strong>
                            </div>
                        </CircularProgressbarWithChildren>
                    </div>
                </div>
            </div>

            <div className='card'>
                <span>Vos activités</span>
                <Chart options={options} series={series} type="bar" width={400} height={300} />
            </div>
        </div >
    )
}


export default Card