import React from 'react'
import { UserContext } from '../../../AppContext';

const Form2 = () => {

  const { stepCurrent, setstepCurrent, setPretData, pretData } = React.useContext(UserContext);

  const handleOnChangeTelePhone = (e) => {
    if (e.target.value.length > 10) {
      document.getElementById("telephoneError").innerHTML = "Votre numéro ne peut contenir que 10 chiifres"
    } else {
      document.getElementById("telephoneError").innerHTML = ""
    }
  };

  const handleOnChangeTelePhone2 = (e) => {
    if (e.target.value.length > 10) {
      document.getElementById("telephone2Error").innerHTML = "Votre numéro ne peut contenir que 10 chiifres"
    } else {
      document.getElementById("telephone2Error").innerHTML = ""
    }
  };

  return (
    <div className='formulaire2'>
      <div className='bloc1'>
        <div>
          <input
            type="text"
            placeholder='Code postal / Localité'
            onChange={(e) => setPretData({ ...pretData, "localite": e.target.value })}
            value={pretData.localite}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder='Adresse'
            onChange={(e) => setPretData({ ...pretData, "adresse": e.target.value })}
            value={pretData.adresse}
          />
        </div>
        <div>
          <input
            type="date"
            placeholder="Année d'entrée dans votre logement"
            onChange={(e) => setPretData({ ...pretData, "anneEntreeLogement": e.target.value })}
            value={pretData.anneEntreeLogement}
          />
          <span style={{ color: "silver", fontSize: "12px" }}>Année d'entrée dans votre logement</span>
        </div>
      </div>
      <div className='bloc22'>
        <div>
          <select name="" id="" onChange={(e) => setPretData({ ...pretData, "situationLogement": e.target.value })}>
            <option value="">--Situation de logement--</option>
            <option value="Locataire"
              selected={pretData.situationLogement === "Locataire" ? true : false}>Locataire</option>
            <option value="Propriétaire avec prêt en cours"
              selected={pretData.situationLogement === "Propriétaire avec prêt en cours" ? true : false}
            >Propriétaire avec prêt en cours </option>
            <option
              value="Logé par l'employeur"
              selected={pretData.situationLogement === "Logé par l'employeur" ? true : false}
            >Logé par l'employeur</option>
            <option
              value="Propriétaire"
              selected={pretData.situationLogement === "Propriétaire" ? true : false}
            >Propriétaire</option>
            <option
              value="Hôtel"
              selected={pretData.situationLogement === "Hôtel" ? true : false}
            >Hôtel</option>
          </select>
        </div>
        <div>
          <input
            type="number"
            placeholder='Téléphone portable'
            id="telephone"
            onChange={(e) => {
              setPretData({ ...pretData, "telephonePortable": e.target.value })
              handleOnChangeTelePhone(e)
            }}
            value={pretData.telephonePortable}
          />
          <span id="telephoneError"
            style={{
              fontSize: "12px", 
            }}></span>
        </div>
        <div>
          <input
            type="number"
            placeholder='Téléphone professionnel'
            onChange={(e) => { handleOnChangeTelePhone2(e); setPretData({ ...pretData, "telephoneProfessionnel": e.target.value }) }}
            value={pretData.telephoneProfessionnel}
          />
          <span id="telephone2Error"
            style={{
              fontSize: "12px"
            }}></span>
        </div>
      </div>

      <div className='groupButtons'>
        <button onClick={() => setstepCurrent(stepCurrent - 1)}>Retour</button>
        <button
          onClick={() => setstepCurrent(stepCurrent + 1)}
          disabled={
            pretData.telephoneProfessionnel && pretData.telephonePortable && pretData.situationLogement &&
              pretData.anneEntreeLogement && pretData.localite && pretData.adresse ? false : true
          }
        >
          Suivant
        </button>
      </div>
    </div>
  )
}

export default Form2