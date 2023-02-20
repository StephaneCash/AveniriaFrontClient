import React from "react";
import { UserContext } from "../../../AppContext";

const Form4 = () => {

    const { stepCurrent, setstepCurrent, setPretData, pretData, userData } = React.useContext(UserContext);

    console.log(pretData)

    return (
        <div className="form4">
            <div className="bloc1">
                <input
                    type="number"
                    placeholder="Entrer le montant que vous souhaitez prêter en $"
                    onChange={(e) => setPretData({ ...pretData, "montant": e.target.value })}
                    value={pretData.montant}
                />
                <select onChange={(e) => setPretData({ ...pretData, "duree": e.target.value })}>
                    <option>--Choisir une durrée de rembourssement--</option>
                    <option value={"5 mois"}>5 mois</option>
                    <option value={"12 mois"}>12 mois</option>
                    <option value={"2 ans"}>2 ans</option>
                    <option value={"3 ans"}>3 ans</option>
                    <option value={"5 ans"}>5 ans</option>
                    <option value={"10 ans"}>10 ans</option>
                </select>

                <textarea
                    type="text"
                    placeholder="Motif"
                    onChange={(e) => setPretData({ ...pretData, "motif": e.target.value, "userId": userData._id })}
                    value={pretData.motif}
                />
            </div>

            <div className='groupButtons'>
                <button onClick={() => setstepCurrent(stepCurrent - 1)}>Retour</button>
                <button onClick={() => setstepCurrent(stepCurrent + 1)}>Suivant</button>
            </div>
        </div>
    )
}

export default Form4;