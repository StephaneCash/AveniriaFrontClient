import React from 'react'
import { UserContext } from '../../../AppContext';
import "./Form.css";

const Form1 = () => {

  const { stepCurrent, setstepCurrent, setPretData, pretData } = React.useContext(UserContext);

  const handleNextStep = () => {
    setstepCurrent(stepCurrent + 1);
  };

  return (
    <>
      <div className='formulaire1'>
        <div className='bloc1'>
          <div>
            <select name="" id="" onChange={(e) => setPretData({ ...pretData, "civilite": e.target.value })}>
              <option value="">--Civilité--</option>
              <option value="Monsieur" selected={pretData.civilite === "Monsieur" ? true : false}>Monsieur</option>
              <option value="Ma demoiselle" selected={pretData.civilite === "Ma demoiselle" ? true : false}>Ma demoiselle</option>
              <option value="Madame" selected={pretData.civilite === "Madame" ? true : false}>Madame</option>
            </select>
          </div>

          <div>
            <input
              type="text"
              placeholder='Prénom'
              value={pretData.prenom}
              onChange={(e) => setPretData({ ...pretData, "prenom": e.target.value })}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder='Nom'
              value={pretData.nom}
              onChange={(e) => setPretData({ ...pretData, "nom": e.target.value })}
            />
          </div>
        </div>

        <div className='bloc2'>
          <div>
            <select name="" id="" onChange={(e) => setPretData({ ...pretData, "situationFamiliale": e.target.value })}>
              <option value="">--Situation familiale--</option>
              <option value="Marié(e)"
                selected={pretData.situationFamiliale === "Marié(e)" ? true : false}>Marié(e)</option>
              <option value="Célibataire"
                selected={pretData.situationFamiliale === "Célibataire" ? true : false}>Célibataire</option>
              <option value="Divorcé(e)"
                selected={pretData.situationFamiliale === "Divorcé(e)" ? true : false}>Divorcé(e)</option>
              <option value="Veuf/Veuve"
                selected={pretData.situationFamiliale === "Veuf/Veuve" ? true : false}>Veuf/Veuve</option>
            </select>
          </div>
          <div>
            <input type="number"
              placeholder="Nombre d'enfants"
              value={pretData.nbreEnfants}
              onChange={(e) => setPretData({ ...pretData, "nbreEnfants": e.target.value })}
            />
          </div>
          <div>
            <select name="" id="" onChange={(e) => setPretData({ ...pretData, "niveauEducation": e.target.value })}>
              <option value="">--Niveau d'éducation--</option>
              <option value="Etudes primaires"
                selected={pretData.niveauEducation === "Etudes primaires" ? true : false}>Etudes primaires</option>
              <option value="Etudes secondaires" selected={pretData.niveauEducation === "Etudes secondaires" ? true : false}>Etudes secondaires</option>
              <option value="Etudes humanitaires"
                selected={pretData.niveauEducation === "Etudes humanitaires" ? true : false}>Etudes humanitaires</option>
              <option value="Etudes universitaires"
                selected={pretData.niveauEducation === "Etudes universitaires" ? true : false}>Etudes universitaires</option>
              <option value="Doctorat"
                selected={pretData.niveauEducation === "Doctorat" ? true : false}>Doctorat</option>
            </select>
          </div>
        </div>

        <div className='buttonSuivantBloc'>
          <button
            style={{ float: "right" }}
            className="btnSuivant"
            onClick={handleNextStep}
            disabled={pretData.civilite && pretData.nom && pretData.prenom &&
              pretData.situationFamiliale && pretData.niveauEducation ? false : true
            }
          >
            Suivant
          </button>
        </div>
      </div>
    </>
  )
}

export default Form1