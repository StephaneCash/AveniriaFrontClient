import React, { useContext } from 'react'
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import './SoldeCompte.css';
import { useState } from 'react';
import { FaDollarSign, FaEuroSign, FaRegCheckSquare, FaCogs, FaPlusCircle } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from '../../AppContext';
import axios from 'axios';
import { baseUrl } from '../../bases/baseUrl';
import Compte from './Compte';
import courant from "../../images/courant.jpg";
import epargne from "../../images/epargne.jpg"

const SoldeCompte = () => {

    const [chaneCard, setChangeCard] = useState(0);
    const [dollar, setDollar] = useState(0);
    const [euro, setEuro] = useState(0);
    const [cdf, setCDF] = useState(0);
    const [typeEpargne, setTypeEpargne] = useState(0);

    const { compteUser } = useContext(UserContext);

    const onSubmit = () => {
        const data = {}
        const devises = [];
        if (chaneCard === 0) {
            toast.error('Veuillez chosir un type de compte !');
        } else {
            if (chaneCard === 1) {
                data.type = "Courant";

                if (dollar === 1) {
                    devises.push("Dollar");
                }
                if (euro === 1) {
                    devises.push("Euro");
                }
                if (cdf === 1) {
                    devises.push("CDF");
                }
            } else if (chaneCard === 2) {
                data.type = "Epargne";
                if (typeEpargne === 1) {
                    data.nom = "Objectif";
                    if (dollar === 1) {
                        devises.push("Dollar");
                    }
                    if (euro === 1) {
                        devises.push("Euro");
                    }
                    if (cdf === 1) {
                        devises.push("CDF");
                    }
                } else if (typeEpargne === 2) {
                    data.nom = "Objectif+";
                    if (dollar === 1) {
                        devises.push("Dollar");
                    }
                    if (euro === 1) {
                        devises.push("Euro");
                    }
                    if (cdf === 1) {
                        devises.push("CDF");
                    }
                }
            }
        }
        let btn = document.getElementById('btnValid')
        btn.innerHTML = "Validation...";

        axios.post(baseUrl + "/comptes/config", {
            compteId: compteUser && compteUser._id,
            nom: data.nom,
            devise: devises,
            type: data.type
        })
            .then(resp => {
                console.log(resp)
                toast.success('Compte configuré avec succès.');
                setTimeout(() => {
                    window.location.reload('');
                }, [5000]);
            })
            .catch(err => {
                console.log(err);
                btn.innerHTML = "Valider"
            })
    };

    return (
        <>
            <div className='mainSoldeCompte'>
                <Navbar />
                <div className='contentSoldeCompte'>
                    <Sidebar />
                    <div className='contentCompte'>
                        {
                            compteUser && compteUser.isValid === false ? (
                                <>
                                    <h4 style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                                        Configuration de votre compte <FaCogs /> </h4>
                                    <div className='configSolde'>
                                        <h6>Choisir le type de compte en cliquant sur une image</h6>
                                        <div className="cards">
                                            <div className={chaneCard === 1 ? "card actived" : "card"} onClick={() => setChangeCard(1)}>
                                                <h4>Compte courant</h4>
                                                <img src={courant} alt="Compte-Courant" />
                                            </div>

                                            <div className={chaneCard === 2 ? "card actived" : "card"} onClick={() => setChangeCard(2)}>
                                                <h4>Compte épargne</h4>
                                                <img src={epargne} alt="Compte-Epargne" />
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        chaneCard === 2 && (
                                            <div className='grilleEpargne'>
                                                <div className={typeEpargne === 1 ? "card actived" : "card"}>
                                                    <h4>Objectif</h4>
                                                    <p>
                                                        Voulez-vous disposer de toute liberté de votre compte épargne de manière flexible ? <br />
                                                        Opter pour Objectif, une solution d'épargne avec une horizon inférieure à 12 mois.
                                                        <div className='list'>
                                                            <div>
                                                                <FaRegCheckSquare /> <div>4 % intérêt de base</div>
                                                            </div>
                                                            <div >
                                                                <FaRegCheckSquare /> <div>2 %  prime de fidelité</div>
                                                            </div>
                                                        </div>

                                                        <button onClick={() => setTypeEpargne(1)}>Choisir</button>
                                                        <button onClick={() => setTypeEpargne(0)}>Annuler</button>
                                                    </p>
                                                </div>
                                                <div className={typeEpargne === 2 ? "card actived" : "card"}>
                                                    <h4 style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
                                                        Objectif <FaPlusCircle />
                                                    </h4>
                                                    <p>
                                                        Vous envisagez de laisser votre argent sur votre compte d'épargne pendant
                                                        au moins 12 mois.
                                                        <br />
                                                        Bénéficier avec le compte Objectif
                                                        <div className='list'>
                                                            <div>
                                                                <FaRegCheckSquare /> <div>5 % intérêt de base</div>
                                                            </div>
                                                            <div >
                                                                <FaRegCheckSquare /> <div>2 %  prime de fidelité</div>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => setTypeEpargne(2)}>Choisir</button>
                                                        <button onClick={() => setTypeEpargne(0)}>Annuler</button>
                                                    </p>
                                                </div>
                                            </div>
                                        )
                                    }
                                    {

                                        chaneCard === 1 || chaneCard === 2 && typeEpargne === 1 || typeEpargne === 2 ?
                                            <div className='configSolde'>
                                                <h6>Choisir la (les) devise (s)</h6>
                                                <div className="devises">
                                                    <div className={euro === 1 ? "devise actived" : "devise"}>
                                                        <p><FaEuroSign /> </p>
                                                        <button onClick={() => { setEuro(1) }}>Choisir</button>
                                                        <button onClick={() => { setEuro(0) }}>Annuler</button>
                                                    </div>

                                                    <div className={dollar === 1 ?
                                                        "devise actived" : "devise"}
                                                    >
                                                        <p><FaDollarSign /> </p>
                                                        <button onClick={() => { setDollar(1) }}>
                                                            Choisir
                                                        </button>
                                                        <button onClick={() => { setDollar(0) }}>
                                                            Annuler
                                                        </button>
                                                    </div>

                                                    <div className={cdf === 1 ?
                                                        "devise actived" : "devise"}
                                                    >
                                                        <p>CDF</p>
                                                        <button onClick={() => { setCDF(1) }}>
                                                            Choisir
                                                        </button>
                                                        <button onClick={() => { setCDF(0) }}>
                                                            Annuler
                                                        </button>
                                                    </div>

                                                </div>
                                            </div> : ""
                                    }

                                </>
                            ) : compteUser && compteUser.isValid === true && (
                                <Compte compteUser={compteUser} />
                            )
                        }

                        {
                            compteUser && compteUser.isValid === false &&
                            <div className='buttonValid'>
                                <button onClick={onSubmit} type="button" id="btnValid">Valider</button>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default SoldeCompte