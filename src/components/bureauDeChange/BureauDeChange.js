import React, { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import "./BureauDeChange.css"
import { FaExchangeAlt, FaGlobe } from 'react-icons/fa'
import { UserContext } from '../../AppContext';
import Flags from "country-flag-icons/react/3x2";
import { toast, ToastContainer } from 'react-toastify';
import { baseUrl } from '../../bases/baseUrl'
import axios from 'axios'


const BureauDeChange = () => {

    const { compteUser } = React.useContext(UserContext);

    const [devise, setDevise] = useState("");
    const [deviseDe, setDeviseDe] = useState("");
    const [montant, setMontant] = useState("");
    const [btnClic, setBtnClic] = useState(false);
    const [sum, setSum] = useState(0);
    const [confirm, setConfirm] = useState(false);

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
            if (devise === "Dollar" && deviseDe === "CDF") {
                setSum(parseInt(montant) * 2200);
                setConfirm(true);
            }
            else if (devise === "Euro" && deviseDe === "CDF") {
                setSum(parseInt(montant) * 2171.60);
                setConfirm(true);
            } else if (devise === "Euro" && deviseDe === "Dollar") {
                setSum(parseInt(montant) * 1.06);
                setConfirm(true);
            } else if (devise === "Dollar" && deviseDe === "Euro") {
                setSum(parseInt(montant) * 0.94);
                setConfirm(true);
            } else if (devise === "CDF" && deviseDe === "Dollar") {
                setSum(parseInt(montant) / 2200);
                setConfirm(true);
            } else if (devise === "CDF" && deviseDe === "Euro") {
                setSum(parseInt(montant) / 2171.60);
                setConfirm(true);
            }
            else if (devise === deviseDe) {
                toast.error('Les deux devises doivent ??tre diff??rentes.');
                setConfirm(false);
            }
        } else {
            toast.error('Veuillez entrer un montant ?? convertir svp !');
            setBtnClic(false);
            setConfirm(false);
        }
    };

    const handleConfirmConvert = () => {
        axios.post(`${baseUrl}/taux/convert`, {
            compteId: compteUser && compteUser._id,
            deviseDe: devise,
            deviseVers: deviseDe,
            montantAconvertir: parseInt(montant),
            montantConverti: parseInt(sum)
        })
            .then(() => {
                toast.success("Conversion effectu??e avec succ??s");
                setTimeout(() => {
                    window.location.reload();
                }, [3000]);
            })
            .catch(err => {
                console.log(err);
                toast.error(
                    err && err.response && err.response.data &&
                    err.response.data.message
                )
            });
    };

    useEffect(() => {
        setConfirm(false);
    }, [montant]);

     useEffect(() => {
        setConfirm(false);
    }, [devise, deviseDe]);

    return (
        <div className='compteCustom'>
            <Navbar />
            <div className='compte'>
                <Sidebar />

                <div className='bureau'>
                    <div className='mainBureau'>
                        <h1>Convertir votre argent <FaExchangeAlt /> </h1>
                        <div style={{ background: "silver", padding: "1rem", color: "#444", width: "160px", maxWidth: "auto" }}>
                            Votre solde :
                            {
                                compteUser && compteUser.devises.map((val, i) => {
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
                        </div>

                        <div className='montant'>
                            <div>
                                <div className='affichage'>
                                    { montant + " "}
                                    {
                                        devise === "Dollar" ? "Dollars am??ricains " : devise === "Euro" ? " Euros " :
                                            devise === "CDF" ? "Franc Congolais " : ''}
                                    {
                                        btnClic && " = "
                                    }
                                </div>
                                <div className='montantF'>
                                    {
                                        devise ? sum : <span>La conversion sera affich??e ici</span>
                                    } <br />
                                    {
                                        deviseDe === "CDF" ? " Franc Congolais" :
                                            deviseDe === "Dollar" ? " Dollars am??ricains" :
                                                deviseDe === "Euro" ? " Euros" : ""
                                    }
                                </div>
                            </div>

                            <div>
                                <label>Montant</label>
                                <div className='flag' style={{ marginTop: "1rem" }}>
                                    <FaGlobe size={40} />
                                    <span>{devise}</span>
                                </div>
                                <input
                                    type="number"
                                    placeholder='Montant'
                                    onChange={(e) => setMontant(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className='button'>
                            {
                                confirm ? (
                                    <button onClick={handleConfirmConvert}>
                                        Confirmer votre conversion
                                    </button>
                                ) :
                                    (
                                        <button onClick={handleConvert}>
                                            Convertir
                                        </button>
                                    )
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