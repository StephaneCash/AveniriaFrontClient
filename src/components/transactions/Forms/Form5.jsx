import React, { useContext, useState } from 'react';
import QrReader from 'react-qr-reader';
import axios from 'axios';
import { baseUrl } from '../../../bases/baseUrl';
import { UserContext } from '../../../AppContext';
import { toast, ToastContainer } from 'react-toastify';
import { FaRegFrown } from 'react-icons/fa';

const Form5 = () => {

    const [result, setResult] = useState(false);
    const [dataUser, setDataUser] = useState([]);
    const [devise, setDevise] = useState("");
    const [montant, setMontant] = useState("");
    const [motif, setMotif] = useState("");

    const { compteUser } = useContext(UserContext);

    const handleError = (error) => {
        console.log(error)
    };

    const handleScan = (res) => {
        console.log(res, 'hjhjhj')
        if (res && res.length === 13) {
            setResult(true);
            axios.get(`${baseUrl}/comptes/getCompteByNum/${res}`)
                .then(resp => {
                    setDataUser(resp.data);
                })
                .catch(err => {
                    console.log(err)
                })
        }
    };

    const submitData = () => {
        if (!montant) {
            toast.error("Veuillez entrer un montant svp")
        } else if (!motif) {
            toast.error("Veuillez entrer un motif");
        } else if (!devise) {
            toast.error("Veuillez choisir une devise svp")
        } else {
            axios.post(baseUrl + "/payementbyqrcode", {
                userId: compteUser && compteUser.userId,
                compteId: compteUser && compteUser._id,
                motif: motif,
                montant: montant,
                devise: devise,
                nomUserTransfere: dataUser && dataUser.user && dataUser.user.pseudo,
                compteIdDest: dataUser && dataUser.compte && dataUser.compte._id
            })
                .then((d) => {
                    toast.success('Transaction effectuée avec succès');
                    console.log(d)
                    setTimeout(() => {
                        window.location.href = "/compte/transactions"
                    }, 3000);
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err && err.response && err.response.data && err.response.data.message);
                });
        }
    };

    return (
        <div className='form1'>
            <div className='form5'>
                <h5>Payement par QR CODE </h5>
                {
                    result &&
                    <p>
                        {
                            `
                        Compte trouvé : ${dataUser && dataUser.compte && dataUser.compte.numero ? dataUser && dataUser.compte && dataUser.compte.numero :
                                'Aucun'
                            }  de
                        ${dataUser && dataUser.user && dataUser.user.pseudo ? dataUser.user && dataUser.user.pseudo : "Aucun"}
                        `
                        }
                    </p>
                }

                {
                    !result ?
                        <QrReader
                            delay={300}
                            onScan={handleScan}
                            onError={handleError}
                            style={{ width: '40%' }}
                        />
                        : <div className='formulaire'>
                            {
                                dataUser && dataUser.compte && dataUser.compte.numero ?
                                    (
                                        <>
                                            <select name="" id="" onChange={(e) => setDevise(e.target.value)}>
                                                <option value="">--Choisir une devise--</option>
                                                {
                                                    dataUser && dataUser.compte && dataUser.compte.devises && dataUser.compte.devises.map(val => {
                                                        return <option value={val.devise}>{val.devise}</option>
                                                    })
                                                }
                                            </select>
                                            <input type="number"
                                                onChange={(e) => setMontant(parseInt(e.target.value))}
                                                placeholder='Entrer un montant'
                                            />

                                            <textarea
                                                name="" id=""
                                                cols="20"
                                                onChange={(e) => setMotif(e.target.value)}
                                                rows="7" placeholder='Le motif'></textarea>
                                            <button onClick={submitData}>Envoyer</button>
                                        </>
                                    )
                                    : (
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center"
                                        }}>
                                            <FaRegFrown size={50} color={"#ddd"} />
                                            Aucun compte trouvé
                                            <button
                                                onClick={() => setResult(false)}
                                            >
                                                Recommencer
                                            </button>
                                        </div>
                                    )
                            }
                        </div>
                }

                <br />

            </div>

            <ToastContainer />
        </div >
    )
}

export default Form5