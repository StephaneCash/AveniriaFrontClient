import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { countries } from 'country-flag-icons'
import "./BureauDeChange.css"
import { FaExchangeAlt, FaGlobe } from 'react-icons/fa'
import { UserContext } from '../../AppContext';
import Flags from "country-flag-icons/react/3x2";
import { toast, ToastContainer } from 'react-toastify';


const BureauDeChange = () => {

    const { compteUser } = React.useContext(UserContext);

    const [devise, setDevise] = useState("");
    const [deviseDe, setDeviseDe] = useState("");
    const [montant, setMontant] = useState("");
    const [btnClic, setBtnClic] = useState(false);
    const [sum, setSum] = useState(0);

    const Flag = Flags[
        devise && devise !== null && devise !== undefined && devise === "Dollar" ? "US"
            : devise === "Euro" ? "EU" : devise === "CDF" ? "CD" : "US"
    ];

    const FlagDe = Flags[
        deviseDe && deviseDe !== null && deviseDe !== undefined && deviseDe === "Dollar" ? "US"
            : deviseDe === "Euro" ? "EU" : deviseDe === "CDF" ? "CD" : "CD"
    ];

    const handleConvert = () => {

        if (montant) {
            setBtnClic(true);
            if (devise === "Dollar" && deviseDe === "CDF")
                setSum(parseInt(montant) * 2200);
            if (devise === "Euro" && deviseDe === "CDF")
                setSum(parseInt(montant) * 2171.60)
            if (devise === "Euro" && deviseDe === "Dollar")
                setSum(parseInt(montant) * 1.06)
            if (devise === "Dollar" && deviseDe === "Euro")
                setSum(parseInt(montant) * 0.94)
            if (devise === "CDF" && deviseDe === "Dollar")
                setSum(parseInt(montant) / 2200)
            if (devise === "CDF" && deviseDe === "Euro")
                setSum(parseInt(montant) / 2171.60)
            if (devise === deviseDe) {
                toast.error('Les deux devises doivent être différentes.')
            }
        } else {
            toast.error('Veuillez entrer un montant à convertir svp !');
            setBtnClic(false);
        }
    };

    const handleConfirmConvert = () => {
        //axios.post()
    };

    return (
        <div className='compteCustom'>
            <Navbar />
            <div className='compte'>
                <Sidebar />

                <div className='bureau'>
                    <div className='mainBureau'>
                        <h1>Convertir <FaExchangeAlt /> </h1>
                        <div>Votre solde
                            {
                                compteUser && compteUser.devises.map(val => {
                                    if (val.devise === devise) {
                                        return " " + val.montant + " " + val.devise
                                    }
                                })
                            }
                        </div>

                        <div className='form'>
                            <div>
                                <label>Choisir la devise</label>
                                <div className='flag'>
                                    <Flag />
                                    <span>{devise}</span>
                                </div>
                                <select onChange={(e) => setDevise(e.target.value)}>
                                    <option value="" key="">-- Choisir la devise -- </option>
                                    {
                                        compteUser && compteUser.devises.map((value, i) => {
                                            return <option value={value.devise} key={i}>
                                                {value.devise}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                            <div>
                                <label>Vers</label>
                                <div className='flag'>
                                    <FlagDe />
                                    <span>{deviseDe}</span>
                                </div>
                                <select onChange={(e) => setDeviseDe(e.target.value)}>
                                    <option value="" key="">-- Vers --</option>
                                    {
                                        compteUser && compteUser.devises.map((value, i) => {
                                            return <option value={value.devise} key={i}>
                                                {value.devise}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>

                            <div>
                                <label>Montant</label>
                                <div className='flag'>
                                    <FaGlobe />
                                    <span>{devise}</span>
                                </div>
                                <input
                                    type="number"
                                    placeholder='Montant'
                                    onChange={(e) => setMontant(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='montant'>
                            <div>
                                <div className='affichage'>
                                    {btnClic && montant} {devise === "Dollar" ? "Dollars américains " : devise === "Euro" ? " Euros " :
                                        devise === "CDF" ? "Franc Congolais " : ''}
                                    {
                                        btnClic && " = "
                                    }
                                </div>
                                <div className='montantF'>
                                    {
                                        sum
                                    }
                                    {
                                        deviseDe === "CDF" ? " Franc Congolais" :
                                            deviseDe === "Dollar" ? " Dollars américains" :
                                                deviseDe === "Euro" ? " Euros" : ""
                                    }
                                </div>
                            </div>

                        </div>

                        <div className='button'>
                            <button onClick={handleConvert}>Convertir</button>
                            {
                                /*
                                <button onClick={handleConfirmConvert}>Confirmer votre conversion</button>
                                */
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default BureauDeChange