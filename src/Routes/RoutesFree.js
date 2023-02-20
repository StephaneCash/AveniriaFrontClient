import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from '../components/Dashbord/Main';
import SignIn from "../components/Auth/SignIn"
import SignUp from "../components/Auth/SignUp"
import Compte from '../components/comptes/Compte';
import SoldeCompte from '../components/soldeCompte/SoldeCompte';
import RoutesPrivate from './RoutesPrivate';
import Parametres from '../components/config/Parametres';
import Transactions from '../components/transactions/Transactions';
import CreateTransaction from '../components/transactions/CreateTransaction';
import Recharge from '../components/rechargeMobile/Recharge';
import Pret from '../components/pret/Pret';
import Mains from "../components/pret/Main"
import CardsVirtuelles from '../components/cardsVirtuelles/CardsVirtuelles';
import Depot from '../components/depot/Depot';
import CreateCard from '../components/cardsVirtuelles/CreateCard';
import Affiliation from '../components/affiliation/Affiliation';
import Crypto from '../components/crypto/Crypto';
import BureauDeChange from '../components/bureauDeChange/BureauDeChange';

const RoutesFree = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<SignIn />} />
                <Route path='/inscription' element={<SignUp />} />

                <Route element={<RoutesPrivate />}>
                    <Route path='/dashboard' element={<Main />} />
                    <Route path='/compte/config/profil' element={<Compte />} />
                    <Route path='/compte/config/compte-user' element={<SoldeCompte />} />
                    <Route path='/compte/config' element={<Parametres />} />
                    <Route path='/compte/transactions' element={<Transactions />} />
                    <Route path='/compte/transactions/transfert-argent' element={<CreateTransaction />} />
                    <Route path="/compte/rechargeMobie" element={<Recharge />} />
                    <Route path="/pret" element={<Mains />} />
                    <Route path="/pret/demande" element={<Pret />} />
                    <Route path="/compte/cards" element={<CardsVirtuelles />} />
                    <Route path="/compte/depot" element={<Depot />} />
                    <Route path="/compte/cards/create" element={<CreateCard />} />
                    <Route path="/compte/affiliation" element={<Affiliation />} />
                    <Route path="/compte/crypto" element={<Crypto />} />
                    <Route path="/bureau_de_change" element={<BureauDeChange />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesFree