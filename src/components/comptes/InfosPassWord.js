import axios from 'axios';
import React, { useContext, useState } from 'react'
import { UserContext } from '../../AppContext';
import { baseUrl } from '../../bases/baseUrl';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';

function InfosPassWord() {

    const [ancienPin, setAncienPin] = useState('');
    const [nouvPin, setNouvPin] = useState('');
    const [pinRepet, setPinRepet] = useState('');

    const { userData, passTransaction } = useContext(UserContext);

    const addOrUpdatePinUser = () => {
        if (nouvPin === pinRepet) {
            axios.post(`${baseUrl}/passwords_user_transactions`, {
                ancienPin: ancienPin,
                password: nouvPin,
                idUser: userData._id
            })
                .then(res => {
                    toast.success(res && res.data && res.data.message);
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err && err.response && err.response.data && err.response.data.message);
                })
        } else {
            toast.error("Les deux mots de passe ne correspondent pas");
        }
    };

    return (
        <div className='formSecurite'>
            <div className='col1'>
                <h4>Modifier le Mot de Passe</h4>
                <input
                    type="password"
                    className="Prénom"
                    placeholder='Ancien mot de passe'
                />
                <input
                    type="password"
                    className="Prénom"
                    placeholder='Nouveau mot de passe'
                />
                <input
                    type="password"
                    className="Prénom"
                    placeholder='Répéter mot de passe'
                />
                <div className='button'>
                    <button>Modifier le mot de passe</button>
                </div>
            </div>
            <div className='col2'>
                <h4>
                    {
                        passTransaction && passTransaction.data && passTransaction.data.isChange === false ? "Votre code PIN n'est pas modifié, veuillez le modifier." :
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            }}>
                                PIN modifié
                                <FaCheckCircle color={"green"} />
                            </div>}
                </h4>
                <input
                    type="password"
                    className="Prénom"
                    placeholder='Ancien PIN'
                    onChange={(e) => setAncienPin(e.target.value)}
                />
                <input
                    type="password"
                    className="Prénom"
                    placeholder='Nouveau PIN'
                    onChange={(e) => setNouvPin(e.target.value)}
                />
                <input
                    type="password"
                    className="Prénom"
                    placeholder='Répéter le nouveau PIN'
                    onChange={(e) => setPinRepet(e.target.value)}
                />
                <div
                    className='button'
                    onClick={() => addOrUpdatePinUser()}
                >
                    <button>Mettre à jour</button>
                </div>
            </div>
        </div>
    )
}

export default InfosPassWord