import React from 'react'
import { UserContext } from '../../../AppContext';

const Form3 = () => {

  const { stepCurrent, setstepCurrent, setPretData, pretData } = React.useContext(UserContext);

  return (
    <div className='form3'>
      <div className='bloc1'>
        <input
          type="text"
          placeholder='Votre profession'
          onChange={(e) => setPretData({ ...pretData, "metier": e.target.value })}
          value={pretData.metier}
        />
        <input
          type="text"
          placeholder='Nom de votre entreprise'
          onChange={(e) => setPretData({ ...pretData, "nomEntreprise": e.target.value })}
          value={pretData.nomEntreprise}
        />
      </div>
      <div className='bloc2'>
        <input
          type="text"
          placeholder='Votre poste'
          onChange={(e) => setPretData({ ...pretData, "poste": e.target.value })}
          value={pretData.poste}
        />
        <input
          type="text"
          placeholder="Adresse de l'entreprise"
          onChange={(e) => setPretData({ ...pretData, "adresseEntreprise": e.target.value })}
          value={pretData.adresseEntreprise}
        />
      </div>

      <div className='groupButtons'>
        <button onClick={() => setstepCurrent(stepCurrent - 1)}>Retour</button>
        <button onClick={() => setstepCurrent(stepCurrent + 1)}>Suivant</button>
      </div>
    </div>
  )
}

export default Form3