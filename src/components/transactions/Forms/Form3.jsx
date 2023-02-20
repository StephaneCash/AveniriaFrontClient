import React from 'react'
import { UserContext } from '../../../AppContext';
import { ToastContainer, toast } from 'react-toastify';
import { FaCheckCircle, FaChevronLeft } from 'react-icons/fa';
import axios from 'axios';
import { baseUrl } from '../../../bases/baseUrl';

const Form3 = () => {

  const { activeStep, setActiveStep, deviseCompte,
    dataTransfert, compteUser, userDataCompte } = React.useContext(UserContext);

  const handleSubmit = () => {

    if (dataTransfert.soldeMontant > dataTransfert.montant) {
      axios.post(`${baseUrl}/transactions`, {
        type: deviseCompte && deviseCompte[0].nom === "epargne" ?
          "epargne"
          : deviseCompte && deviseCompte[0].nom === "courant" &&
          "",
        compteId: compteUser._id,
        userId: compteUser.userId,
        montant: dataTransfert.montant,
        deviseArr: dataTransfert.devise,
        deviseIdDest: userDataCompte.compte._id,
        nomUserTransfere: dataTransfert && dataTransfert.pseudo,
        motif: dataTransfert && dataTransfert.motif,
        idDevise: dataTransfert && dataTransfert.idDevise,
        compteIdDest: dataTransfert && dataTransfert.compteIdDest,
      })
        .then(resp => {
          console.log(resp)
          if (resp.status === 200) {
            toast.success('Transaction effectuée avec succès')
            setTimeout(() => {
              window.location = "/compte/transactions"
            }, 4000);
          }
        })
        .catch(err => {
          console.log(err)
        })

    } else {
      toast.error('Solde insuffisant')
    }
  }



  return (
    <>
      <div className='form1'>
        <div className='alert'>
          Montant : {dataTransfert && dataTransfert.montant}
          {
            dataTransfert.devise === 'Dollar' ? "$" :
              dataTransfert.devise === "Euro" ? "€" :
                dataTransfert.devise === "CDF" ? " CDF" : ""
          }
        </div>
        <div className='main'>
          <div className='card'>
            <div className='head'>
              De :  {dataTransfert && dataTransfert.compte}
            </div>
            <div className='body'>
              <span>{compteUser && compteUser.numero}</span>
              <br />
              <span>
                Compte : {
                  compteUser && compteUser.type
                }
              </span>
            </div>

            <div className='footer'>
              <span>Motif: {dataTransfert && dataTransfert.motif}</span>
            </div>
          </div>


          <div className='card'>
            <div className='head'>
              A :  {dataTransfert && dataTransfert.compte}
            </div>

            <div className='body'>
              <span> {dataTransfert && dataTransfert.numCompteDest}</span> <br />
              <span>{dataTransfert && dataTransfert.pseudo}</span>
            </div>

            <div className='footer'>
              <span>---</span>
            </div>
          </div>
        </div>

        <button
          style={{ float: "right", marginLeft: "1rem", display: "flex", gap: ".5rem", alignItems: "center" }}
          onClick={handleSubmit}>
          Confirmer <FaCheckCircle />
        </button>
        <button
          style={{ float: "right", display: "flex", gap: ".5rem", alignItems: "center" }}
          onClick={() => { setActiveStep(activeStep - 1) }}>
          <FaChevronLeft /> Retour
        </button>
      </div>
      <ToastContainer />
    </>
  )
}

export default Form3