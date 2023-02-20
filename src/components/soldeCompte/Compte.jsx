import React, { useContext } from 'react';
import { UserContext } from "../../AppContext";
import "./TypeCompte.css";
import { FaDollarSign, FaEuroSign } from "react-icons/fa"

const Compte = (props) => {

    const { userData } = useContext(UserContext);
    const compteUser = props.compteUser;

    return (
        <div className='compteTypeDevise'>
            <div className='name'>Salut {userData && userData.pseudo}</div>

            <div className='alert'>
                Numéro de compte : {compteUser && compteUser.numero} <br /><br />
                Type compte : {compteUser && compteUser.type}
            </div>

            <div className='typeCompte'>
                {
                    compteUser && compteUser.devises.map((devise, i) => {
                        return (
                            <div className='cardBloc' key={devise._id}>
                                <div className='deviseType'>Devise :
                                    {
                                        devise.devise === "Dollar" ?
                                            <FaDollarSign /> : devise.devise === "Euro" ?
                                                <FaEuroSign /> : devise.devise === "CDF" ? <span>CDF</span> : ""
                                    }
                                </div>

                                <div className='deviseType'>Montant :
                                    <span className='montant'>{devise.montant}</span>
                                </div>

                                <div className='deviseType'>Type :
                                    <span>{devise.nom}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Compte