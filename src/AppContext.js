import axios from 'axios';
import React, { useEffect, useState } from 'react'
import App from './App';
import { baseUrl } from './bases/baseUrl';

export const UserContext = React.createContext();

const AppContext = () => {

    const [uid, setUid] = useState(null);
    const [compteUser, setCompteUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [photoUser, setPhotoUser] = useState(null);
    const [infosUser, setInfosUser] = useState(null);
    const [InfosPaiement, setOnfosPaiement] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [dataTransfert, setDataTransfert] = useState(null);
    const [userDataCompte, setUserDataCompte] = useState(null);
    const [pretData, setPretData] = useState({});

    const [jwt, setJwt] = useState('');

    const [stepCurrent, setstepCurrent] = useState(0);

    const verifUserConnected = async () => {
        await axios.get(`${baseUrl}/jwtid/${jwt}`, { withCredentials: true })
            .then(resp => {
                setUid(resp.data.id);
            })
            .catch(err => {
                console.log(err.response)
            });
    };

    const getUser = () => {
        axios.get(baseUrl + "/users/" + uid)
            .then(res => {
                setUserData(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getCompteUser = () => {
        axios.post(baseUrl + "/comptes/getCompteById/", { userId: uid })
            .then(res => {
                setCompteUser(res.data && res.data.data);
            })
            .catch(err => {
                console.log(err)
            })
    };

    const getPictureUser = () => {
        axios
            .get(baseUrl + "/user/" + uid)
            .then(resp => {
                setPhotoUser(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    };
    
    const getInfosUser = () => {
        axios
            .patch(baseUrl + "/user/infos", { userId: uid })
            .then(resp => {
                setInfosUser(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const getInfosPaiement = () => {
        axios
            .patch(baseUrl + "/compte/modes-paiement", { userId: uid })
            .then(resp => {
                setOnfosPaiement(resp.data);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        verifUserConnected();
    }, [jwt]);

    useEffect(() => {
        verifUserConnected();
        if (uid) {
            getUser();
            getCompteUser();
            getPictureUser();
            getInfosUser();
            getInfosPaiement();
        };
    }, [uid]);

    useEffect(()=>{
        const userConnected = JSON.parse(localStorage.getItem('tokenUser'));
        setJwt(userConnected)
    }, []);

    return (
        <UserContext.Provider
            value={{
                compteUser, userData, photoUser, activeStep,
                infosUser, setInfosUser, InfosPaiement, uid,
                setActiveStep, setDataTransfert, dataTransfert, setUserDataCompte, userDataCompte,
                stepCurrent, setstepCurrent, setPretData, pretData,setUid
            }}
        >
            <App />
        </UserContext.Provider>
    )
}

export default AppContext