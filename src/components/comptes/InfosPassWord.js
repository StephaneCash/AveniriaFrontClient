import React from 'react'

function InfosPassWord() {
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
                    placeholder='Ancien mot de passe'
                />
                <input
                    type="password"
                    className="Prénom"
                    placeholder='Ancien mot de passe'
                />
                <div className='button'>
                    <button>Modifier le mot de passe</button>
                </div>
            </div>
            <div className='col2'>
                <h4>Modifier le Code Pin</h4>
                <input
                    type="password"
                    className="Prénom"
                    placeholder='Ancien mot de passe'
                />
                <input
                    type="password"
                    className="Prénom"
                    placeholder='Ancien mot de passe'
                />
                <input
                    type="password"
                    className="Prénom"
                    placeholder='Ancien mot de passe'
                />
                <div className='button'>
                    <button>Mettre à jour</button>
                </div>
            </div>
        </div>
    )
}

export default InfosPassWord