import axios from 'axios';
import React from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { UserContext } from '../../../AppContext';
import { baseUrl } from '../../../bases/baseUrl';

const Form5 = () => {

  const { setstepCurrent, setPretData, pretData } = React.useContext(UserContext);

  const handleValidation = () => {

    axios.post(baseUrl + "/prets", pretData)
      .then(() => {
        toast.success('Votre prêt a été bien reçu vous serez notifié dans un bref délai.');

        setTimeout(() => {
          window.location = "/pret";
        }, 5000);
      })
      .catch(err => {
        toast.error('Votre prêt n\'a pas abouti.');
        console.log(err)
      });
  };

  const handleAnnuler = () => {
    setPretData('');
    setstepCurrent(0);
  };

  return (
    <div className='form5'>
      <button onClick={handleAnnuler}>Tout Annuler</button>
      <button onClick={handleValidation}>Valider votre prêt</button>
      <ToastContainer />
    </div>
  )
}

export default Form5