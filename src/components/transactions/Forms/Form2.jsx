import React, { useEffect, useState } from 'react'
import { UserContext } from '../../../AppContext';
import { FaCheckCircle, FaChevronLeft, FaChevronRight, FaWindowClose } from "react-icons/fa"
import axios from 'axios';
import { baseUrl } from '../../../bases/baseUrl';
import { ToastContainer, toast } from "react-toastify"

const Form2 = () => {

    const {
        activeStep, setActiveStep, setDataTransfert,
        dataTransfert, setUserDataCompte,
    } = React.useContext(UserContext);

    const [compte, setCompte] = useState(0);
    const [numeroCompte, setNumeroCompte] = useState("");

    const [valueCompte, setValueCompte] = useState(null);
    const [etat, setEtat] = useState(false);
    const [montant, setMontant] = useState(0);

    const [dataChange, setDataChange] = useState([]);
    const [montantArr, setMontantArr] = useState([]);

    const [array, setArray] = useState([]);
    const [pseudos, setPseudos] = useState([]);
    const [comptesId, setComptesId] = useState([]);

    const handleChange = (e, i) => {
        const inputValue = [...dataChange];
        inputValue[i] = e.target.value;
        setDataChange(inputValue);

        setDataTransfert({
            ...dataTransfert,
            "numCompteDest": inputValue
        });
    }

    const handleChangeMontant = (e, i) => {
        const inputValue = [...montantArr];
        inputValue[i] = e.target.value;

        setMontantArr(inputValue);

        setDataTransfert({
            ...dataTransfert,
            "montant": inputValue
        });
    };

    const handleDeleteInput = (i) => {
        const valDelete = [...dataChange];
        valDelete.splice(i, 1)
        setDataChange(valDelete);
    };

    const handleValidNumberTransfert = () => {
        const arr = [...dataChange, []]
        setDataChange(arr)
    };

    const getCompteUser = () => {
        let pseudosArr = [];
        let arrComptesId = [];
        if (parseInt(dataTransfert.typeTransfert) === 2) {
            for (let i = 0; i < dataChange.length; i++) {
                axios.get(baseUrl + "/comptes/getCompteByNum/" + dataChange[i])
                    .then(resp => {
                        const arr = [];
                        const dataArr = [];

                        arr.push(resp.data)
                        pseudosArr.push(resp.data.user.pseudo);
                        dataArr.push(...pseudos, resp.data.user.pseudo);
                        setPseudos(pseudosArr);
                        arrComptesId.push(resp.data.compte._id);
                        setComptesId(arrComptesId);

                        const newArray = [...new Set(arr)];
                        setArray([...array, ...newArray]);
                        if (resp.status === 200) {
                            setValueCompte(resp.data);
                            setEtat(true);
                            setUserDataCompte(resp.data);
                        } else {
                            setEtat(false);
                        }
                    })
                    .catch(err => {
                        if (err && err.response && err.response && err.response.status === 500) {
                            setEtat(false);
                        }
                        console.log(err)
                    })
            }
        } else {
            axios.get(baseUrl + "/comptes/getCompteByNum/" + numeroCompte)
                .then(resp => {
                    const arr = [];
                    arr.push(resp.data)
                    const newArray = [...new Set(arr)]
                    setArray([...array, ...newArray]);
                    if (resp.status === 200) {
                        setValueCompte(resp.data);
                        setEtat(true);
                        setUserDataCompte(resp.data);
                        console.log(resp.data)
                        setDataTransfert({
                            ...dataTransfert, 'pseudo': resp.data.user && resp.data.user.pseudo,
                            "compteIdDest": resp.data && resp.data.compte && resp.data.compte._id,
                        })
                    } else {
                        setEtat(false);
                    }
                })
                .catch(err => {
                    if (err && err.response && err.response && err.response.status === 500) {
                        setEtat(false);
                    }
                    console.log(err)
                })
        }

    };

    useEffect(() => {
        if (dataChange.length) {
            getCompteUser();
        };
    }, [dataChange]);


    useEffect(() => {
        if (numeroCompte) {
            getCompteUser();
        };
    }, [numeroCompte]);


    useEffect(() => {
        if (montant) {
            setDataTransfert({ ...dataTransfert, 'montant': parseInt(montant) })
        };
    }, [montant]);


    useEffect(() => {
        if (compte === 1) {
            setDataTransfert({ ...dataTransfert, 'compte': "Innoverce" })
        }
    }, [compte]);

    const handleNextStep = () => {
        if (dataTransfert && dataTransfert.typeTransfert && parseInt(dataTransfert.typeTransfert) === 1) {
            if (
                montant && valueCompte && valueCompte.user && valueCompte.user.pseudo
                && dataTransfert && dataTransfert.motif
            ) {
                if (numeroCompte) {
                    setDataTransfert({ ...dataTransfert, 'numCompteDest': numeroCompte })
                    setActiveStep(activeStep + 1);
                }
            } else {
                toast.warning('Veuillez remplir tous les champs svp');
            }
        } else if (dataTransfert && dataTransfert.typeTransfert && parseInt(dataTransfert.typeTransfert) === 2) {
            if (dataTransfert.montant.length === undefined || dataTransfert.montant.length !== dataTransfert.numCompteDest.length) {
                toast.error('Chaque transaction doit avoir un montant.')
            } else {
                //console.log(dataTransfert);
                setActiveStep(activeStep + 1);
            }
        }
    };

    useEffect(() => {
        if (pseudos && comptesId) {
            setDataTransfert({
                ...dataTransfert,
                "pseudo": pseudos,
                "compteIdDest": comptesId
            });
        }
    }, [comptesId, pseudos]);

    console.log(dataTransfert)

    return (
        <>
            <div className='form1'>
                <h4>Veuillez choisir un type de transaction et entrez toutes les données nécessaires</h4>

                <p onClick={() => setCompte(1)} className={compte === 1 ? "actived" : ""}>
                    <div className='content'>Comptes Aveniria {compte === 1 && <FaCheckCircle color='green' />}</div>
                </p>
                <p onClick={() => setCompte(2)} className={compte === 2 ? "actived" : ""}>
                    <div className='content'> Comptes d'autres banques {compte === 2 && <FaCheckCircle color='green' />}</div>
                </p>
                <p onClick={() => setCompte(3)} className={compte === 3 ? "actived" : ""}>
                    <div className='content'> Bénéficiaire enregistré {compte === 3 && <FaCheckCircle color='green' />}</div>
                </p>

                {
                    compte === 1 || compte === 2 || compte === 3 ?
                        dataTransfert && dataTransfert.typeTransfert && parseInt(dataTransfert.typeTransfert) === 1 &&
                        (
                            <>
                                <div className='formData'>
                                    <div className='contentForm'>
                                        <label>Compte</label>
                                        <input
                                            type="text"
                                            className="formText"
                                            placeholder='Numéro de compte du bénéficiaire'
                                            onChange={(e) => {
                                                setNumeroCompte(e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className='contentForm'>
                                        <label>Nom</label>
                                        <input
                                            type="text"
                                            className="formText"
                                            placeholder='Nom du bénéficiaire'
                                            value={
                                                numeroCompte && etat ?
                                                    valueCompte && valueCompte.user && valueCompte.user.pseudo
                                                    : ""
                                            }
                                            disabled={true}
                                        />
                                    </div>

                                    <div className='contentForm'>
                                        <label>Banque</label>
                                        <input
                                            type="text"
                                            className="formText"
                                            placeholder='Nom de la banque'
                                            value={compte === 1 ? "Aveniria" : ""}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className='formData'>
                                    <div className='contentForm'>
                                        <label>Montant</label>
                                        <input
                                            type="number"
                                            className="formText"
                                            placeholder='Entrer un montant'
                                            onChange={(e) => setMontant(e.target.value)}
                                        />
                                    </div>

                                    <div className='contentForm'>
                                        <label>Motif</label>
                                        <input
                                            type="text"
                                            className="formText2"
                                            placeholder='Motif du transfert'
                                            onChange={(e) => {
                                                setDataTransfert({ ...dataTransfert, "motif": e.target.value })
                                            }}
                                        />
                                    </div>
                                </div>
                            </>
                        )

                        : ''
                }

                {
                    compte === 1 || compte === 2 || compte === 3 ?
                        dataTransfert && dataTransfert.typeTransfert && parseInt(dataTransfert.typeTransfert) === 2 && (
                            <div className='multiTransfert'>
                                <div className='search'>
                                    <button onClick={handleValidNumberTransfert}>Ajouter un champ</button>
                                </div>

                                <div className='dataMultipleInput'>
                                    {
                                        dataChange && dataChange.map((val, i) => {
                                            return (
                                                <div style={{ display: "flex", alignItems: "center" }} key={i}>
                                                    <div>
                                                        <i>
                                                            {array.indexOf(array[i]) === i && array[i].user.pseudo}
                                                        </i>
                                                        <input
                                                            style={{ marginBottom: "5px" }}
                                                            value={val} type="text"
                                                            placeholder="Entrer le numéro de compte"
                                                            onChange={e => handleChange(e, i)}
                                                        />

                                                        <input
                                                            type="number"
                                                            value={montantArr[i]}
                                                            placeholder='Entrer un montant'
                                                            onChange={e => handleChangeMontant(e, i)}
                                                        />
                                                    </div>
                                                    <button onClick={() => handleDeleteInput(i)}>
                                                        <FaWindowClose />
                                                    </button>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className='contentForm'>
                                        <label>Motif</label> <br />
                                        <input
                                            type="text"
                                            className="formText2"
                                            placeholder='Motif du transfert'
                                            onChange={(e) => {
                                                setDataTransfert({ ...dataTransfert, "motif": e.target.value })
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : ""
                }

                <div className='btns'>
                    <button
                        style={{ display: "flex", alignItems: "center", gap: ".4rem" }}
                        onClick={() => setActiveStep(activeStep - 1)}
                    >
                        <FaChevronLeft />
                        Retour
                    </button>
                    <button
                        style={{ display: "flex", alignItems: "center", gap: ".4rem" }}
                        onClick={handleNextStep}
                    >
                        Suivant
                        <FaChevronRight />
                    </button>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default Form2