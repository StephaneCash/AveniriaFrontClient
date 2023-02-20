import React, { useContext, useEffect, useState } from 'react';
import { addModePaiement } from "../../api/InfosUserAPI";
import { UserContext } from "../../AppContext";

const InfosPaiement = () => {

    const [airtel, setAirtel] = useState('');
    const [mpsa, setMpsa] = useState('');
    const [orange, setOrange] = useState('');
    const [africell, setAfricell] = useState('');
    const [americainEx, setAmericainEx] = useState('');
    const [bitcoin, setBitCoin] = useState('');

    const { userData, InfosPaiement } = useContext(UserContext);
    
    const onSubmit = () => {
        const data = {};
        data.airtel = airtel;
        data.mpsa = mpsa;
        data.americainExpress = americainEx;
        data.africell = africell;
        data.bitcoin = bitcoin;
        data.orange = orange;
        data.userId = userData._id;
        data.id = InfosPaiement && InfosPaiement[0] && InfosPaiement[0]._id;

        addModePaiement(data);
    };

    useEffect(() => {
        setAirtel(InfosPaiement && InfosPaiement[0] && InfosPaiement[0].airtel);
        setMpsa(InfosPaiement && InfosPaiement[0] && InfosPaiement[0].mpsa);
        setOrange(InfosPaiement && InfosPaiement[0] && InfosPaiement[0].orange);
        setAfricell(InfosPaiement && InfosPaiement[0] && InfosPaiement[0].africell);
        setAmericainEx(InfosPaiement && InfosPaiement[0] && InfosPaiement[0].americainExpress);
        setBitCoin(InfosPaiement && InfosPaiement[0] && InfosPaiement[0].bitcoin);
    }, [InfosPaiement]);

    return (
        <div className='formPaiement'>
            <h4>Paramètre de Paiement</h4>

            <div className='contentForm'>
                <label>Airtel Money CD</label>
                <input
                    type="text"
                    className="Prénom"
                    placeholder='Votre compte Airtel (Numéro de téléphone)'
                    onChange={(e) => setAirtel(e.target.value)}
                    value={airtel}
                />
            </div>

            <div className='contentForm'>
                <label>Orange Money CD</label>
                <input
                    type="text"
                    className="Prénom"
                    placeholder='Votre compte orange Money (Numéro de téléphone)'
                    onChange={(e) => setOrange(e.target.value)}
                    value={orange}
                />
            </div>

            <div className='contentForm'>
                <label>AfriMoney CD</label>
                <input
                    type="text"
                    className="Prénom"
                    placeholder='Votre compte afrimoney (Numéro de téléphone)'
                    onChange={(e) => setAfricell(e.target.value)}
                    value={africell}
                />
            </div>

            <div className='contentForm'>
                <label>M-PESA CD</label>
                <input
                    type="text"
                    placeholder="Votre compte M-PSA (Numéro de téléphone)"
                    onChange={(e) => setMpsa(e.target.value)}
                    value={mpsa}
                />
            </div>

            <div className='contentForm'>
                <label>Amercan Express</label>
                <input
                    type="text"
                    className="Prénom"
                    placeholder='Votre compte American express'
                    onChange={(e) => setAmericainEx(e.target.value)}
                    value={americainEx}
                />
            </div>

            <div className='contentForm'>
                <label>Bitcoin</label>
                <input type="text"
                    className="Prénom"
                    placeholder='Votre compte BitCoin ex: 1Hsy1WDazYWajUpxyFH1kGCsSPoDMDesWW'
                    onChange={(e) => setBitCoin(e.target.value)}
                    value={bitcoin}
                />
            </div>
            <hr />

            <div className='button'>
                <button
                    onClick={onSubmit}
                    disabled={bitcoin && mpsa && orange && americainEx && airtel && africell ? false : true}
                >
                    Mettre à jour
                </button>
            </div>
        </div>
    )
}

export default InfosPaiement