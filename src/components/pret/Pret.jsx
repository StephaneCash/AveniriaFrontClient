import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FaCalculator, FaCheck } from 'react-icons/fa';
import Navbar from '../navbar/Navbar';
import Sidebar from '../sidebar/Sidebar';
import Main from './forms/Main';
import "./Pret.css";

const Pret = () => {

    const [showMainForm, setShowMainForm] = useState(false);

    const [montant, setMontant] = useState(0);
    const [mensuel, setMensuel] = useState(0);
    const [annuel, setAnnuel] = useState(0);
    const [tauxInteret, setTauxInteret] = useState(0)

    const changeValue = (e) => {
        setMensuel(
            parseInt(e.target.value) / 8.695
        );
        setMontant(parseInt(e.target.value));
    }

    const handleSelect = (e) => {
        setAnnuel(
            parseInt(e.target.value) * mensuel
        );
    };

    useEffect(() => {
        setTauxInteret(
            annuel - montant
        )
    }, [montant, annuel]);


    useEffect(() => {
        setTauxInteret(0);
        setAnnuel(0);
        setMensuel(0);
    }, []);

    return (
        <div className='compteCustom'>
            <Navbar />
            <div className='compte'>
                <Sidebar />
                <div className='pret'>
                    {
                        !showMainForm &&
                        <>
                            <div className='conditions'>
                                <div>
                                    <img src="/pret.png" alt="" />
                                </div>

                                <div className='pretPersonnel'>
                                    <h1>Qu'est-ce que le prêt personnel ?</h1>
                                    <p>
                                        Il s'agit d'un crédit à taux fixe que l'on peut utiliser pour n'importe quel projet.
                                        On emprunte en fonction de ses besoins et de ses capacités de remboursement.
                                        Taux, montant, durée, tout est défini lors de la souscription.
                                    </p>

                                    <h5>Quelles sont les conditions d'éligibilité ?</h5>
                                    <div>
                                        <div>
                                            <FaCheck />
                                            <span>Être majeur</span>
                                        </div>
                                        <div>
                                            <FaCheck />
                                            <span> Avoir des revenus réguliers </span>
                                        </div>
                                        <div>
                                            <FaCheck />
                                            <span> Résider fiscalement en RDC métropolitaine</span>
                                        </div>
                                        <div>
                                            <FaCheck />
                                            <span>
                                                Être titulaire d'un Compte Aveniria depuis au moins 3 mois
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </>
                    }

                    <div className='formulaire'>
                        {
                            !showMainForm &&
                            <>
                                <div className='hr'></div>
                                <p style={{
                                    textAlign: "center", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontSize: "16px", gap: "1rem"
                                }}>Calculateur de prêts <FaCalculator size={25} /> </p>
                                <div className='simulateur'>
                                    <div className='input'>
                                        <input
                                            type="number"
                                            placeholder='Entrer le montant que vous souhaitez prêter en $'
                                            onChange={changeValue}
                                        />
                                    </div>
                                    <div className='durree'>
                                        <select onChange={handleSelect}>
                                            <option value={0}>--Choisir une durée--</option>
                                            <option value={6}>6 mois</option>
                                            <option value={12}>1 an</option>
                                            <option value={24}>2 ans </option>
                                            <option value={36}>3 ans</option>
                                            <option value={48}>4 ans</option>
                                            <option value={60}>5 ans</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='calculateur'>
                                    <div className='data'><div className='req'>Taux d'intérêt </div> <div className='rep'>{Math.floor(tauxInteret)}</div> </div>
                                    <div className='data'> <div className='req'>Paiement mensuel </div>  <div className='rep'>{Math.floor(mensuel)} </div> </div>
                                    <div className='data'> <div className='req'>Total  à rembourseer </div> <div className='rep'>{Math.floor(annuel)}</div> </div>
                                </div>
                            </>
                        }


                        {
                            !showMainForm &&
                            <>
                                <h1 style={{ textAlign: "center" }}>Etes-vous prêt et éligible ?</h1>
                                <div className='btns'>
                                    <button onClick={() => setShowMainForm(true)}>Oui</button>
                                    <button onClick={() => setShowMainForm(false)}>Non</button>
                                </div>
                            </>
                        }

                        <div className='formData'>
                            {
                                showMainForm &&
                                <Paper
                                    variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                                    style={{ backgroundColor: "#13203b", color: "aliceblue" }}
                                >
                                    <Main />
                                </Paper>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Pret