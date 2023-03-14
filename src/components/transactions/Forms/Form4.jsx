import React, { useContext, useEffect, useState } from 'react'
import { FaHandPointer } from 'react-icons/fa';
import { UserContext } from '../../../AppContext';

const Form4 = () => {

  const [typeTransfert, setTypeTransfert] = useState(0);

  const { setDataTransfert, dataTransfert, activeStep, setActiveStep } = useContext(UserContext);

  useEffect(() => {
    if (parseInt(typeTransfert) === 1 || parseInt(typeTransfert) === 2) {
      setDataTransfert({ ...dataTransfert, 'typeTransfert': typeTransfert });
      setActiveStep(activeStep + 1);
    } else if (parseInt(typeTransfert) === 6) {
      setActiveStep(6);
    }
  }, [typeTransfert]);

  return (
    <div className='form1'>
      <div className='form4'>
        <h5>Choisir le type de transfert <FaHandPointer /> </h5>
        <select name="" id="" onChange={(e) => setTypeTransfert(e.target.value)} >
          <option value={0}>--Choisir un type de transfert--</option>
          <option value={1}>Envoi à un compte</option>
          <option value={2}>Envoi à plusieurs comptes</option>
          <option value={6}>Payement par QR CODE</option>
        </select>
      </div>
    </div>
  )
}

export default Form4