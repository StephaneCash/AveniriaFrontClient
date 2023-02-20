import React, { useState } from 'react'
import "./Login.css";
import logo from "../../images/logo.png";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../bases/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha";

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [tokenGoogle, setTokenGoogle] = useState("");

    const [btnClic, setBtnClic] = useState(false);

    const maxAge = 3 * 24 * 60 * 60 * 1000;

    const onChange = (e) => {
        setTokenGoogle(e);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setBtnClic(true);
        if (tokenGoogle) {
            axios.post(`${baseUrl}/users/login`, { email, password })
                .then(resp => {
                    document.cookie = `jwt=${resp.data.token}; max-age=${maxAge}`;
                    toast.success("Vous êtes connecté avec succès");
                    setTimeout(() => {
                        if (resp.status && resp.data && resp.data.token && resp.data.token) {
                            setBtnClic(false);
                            setBtnClic(false);
                            localStorage.setItem('tokenUser', JSON.stringify(resp.data && resp.data.token && resp.data.token));
                            window.location = "/dashboard";
                        }
                    }, 3000);
                })
                .catch(err => {
                    toast.error(err.response && err.response.data && err.response.data.message)
                    setBtnClic(false);
                });
        } else {
            toast.error('Veuillez cochez la case du reCAPTCHA');
            setBtnClic(false);
        };
    };

    return (
        <>
            <div className='app'>
                <div className='login'>
                    <div className='form'>
                        <div className='content'>
                            <div className='logoInnoverce'>
                                <img src={logo} alt='Logo' />
                            </div>
                            <h3>Se connecter</h3>

                            <input
                                type="email"
                                className="form-control"
                                placeholder='Votre adresse email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />

                            <input
                                type="password"
                                className="form-control"
                                placeholder='Créer un mot de passe'
                                onChange={(e) => setPassword(e.target.value)} value={password}
                            />
                            <br />
                            <div className='content'>
                                <ReCAPTCHA
                                    sitekey="6LfaKTAkAAAAAFTPzhWyXNNBdEu32lulv8lYi7Q6"
                                    onChange={onChange}
                                />
                            </div>

                            <button className='button' onClick={handleLogin}>
                                {
                                    btnClic ? (
                                        <>
                                            Connexion...
                                        </>
                                    ) :
                                        "Se connecter"
                                }
                            </button>
                            <p className='createCompteLink'>
                                Vous n'avez pas de compte ?
                                <br /><br />
                                <Link to="/inscription">Créer un compte ici</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default SignIn