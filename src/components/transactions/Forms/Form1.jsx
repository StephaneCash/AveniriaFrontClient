import React, { useState } from 'react'
import { UserContext } from '../../../AppContext';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "./Form.css";
import { toast, ToastContainer } from "react-toastify";


const Form1 = () => {

    const { setActiveStep, compteUser, activeStep, setDataTransfert, dataTransfert } = React.useContext(UserContext);
    const [choixCompte, setChoixCompte] = useState(false);

    const handleOption = (e) => {
        if (e.target.value) {
            setChoixCompte(true);
            const devise = e.target.value.split('+');
            setDataTransfert({ ...dataTransfert, 'devise': devise[0], "soldeMontant": parseInt(devise[1]), idDevise: devise[2] });
        }
    };

    const handleSuivantStep = () => {
        if (choixCompte) {
            setActiveStep(activeStep + 1)
        } else {
            toast.error('Veuillez choisir le type de compte svp !');
        }
    };

    return (
        <div className='form1'>
            <h4 style={{ textAlign: "center" }}>Veuillez choisir le compte</h4>
            <span>Votre compte : {compteUser && compteUser.numero}</span>
            <select
                style={{ marginTop: "15px" }}
                onChange={(e) => handleOption(e)}
            >
                <option>--Choisir un compte--</option>
                {
                    compteUser && compteUser.devises.map((devise, i) => {
                        return (
                            <option
                                key={i} value={devise.devise + "+" + devise.montant + '+' + devise._id}
                                style={{ display: "flex", alignItems: "center", gap: ".3rem", padding: "10px" }}
                            >
                                Solde: {devise.montant} {
                                    devise.devise === 'Dollar' ? "$" :
                                        devise.devise === "Euro" ? "€" :
                                            devise.devise === "CDF" ? "CDF" : ""
                                } </option>
                        )
                    })
                }
            </select>

            <div style={{
                display: "flex",
                marginTop: "10px"
            }}>
                <button
                    onClick={() => { setActiveStep(activeStep - 1) }}
                    style={{ display: "flex", alignItems: "center", gap: ".3rem" }}
                >
                    <FaChevronLeft /> Retour
                </button>

                <button
                    onClick={() => { handleSuivantStep() }}
                    style={{ display: "flex", alignItems: "center", gap: ".3rem", marginLeft: "5px" }}
                >
                    Suivant <FaChevronRight />
                </button>
            </div>
            <ToastContainer />
        </div >
    )
}

export default Form1