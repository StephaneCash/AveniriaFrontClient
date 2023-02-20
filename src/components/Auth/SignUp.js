import React, { useState } from 'react';
import "./Login.css";
import logo from "../../images/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../bases/baseUrl';
import { toast, ToastContainer } from 'react-toastify';

const SignUp = () => {

    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Les deux mots de passe ne correspondent pas.')
        } else {

            axios.post(`${baseUrl}/users/`, { pseudo, email, password })
                .then(resp => {
                    console.log(resp.data.errors);
                    if (resp.data && resp.data.errors && resp.data.errors) {

                        if (resp.data.errors.pseudo === "" && resp.data.errors.email === ""
                            && resp.data.errors.password === "") {
                            navigate('/');
                        }
                    } else {
                        navigate('/');
                    }
                })
                .catch(error => {
                    toast.error(error.response && error.response.data && error.response.data.message)
                });
        }
    };


    return (
        <>
            <div className='app'>
                <div className='login'>
                    <div className='form'>
                        <div className='logoInnoverce'>
                            <img src={logo} alt='Logo' />
                        </div>
                        <h3>S'inscrire</h3>

                        <input
                            type="text"
                            className="form-control"
                            placeholder='Votre nom' value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)} />

                        <input
                            type="email"
                            className="form-control"
                            placeholder='Votre adresse email'
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            type="password"
                            className="form-control"
                            placeholder='Créer un mot de passe' value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type="password" className="form-control"
                            placeholder='Répeter le mot de passe' value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button className='button' onClick={handleRegister}>S'inscrire</button>

                        <p>
                            Avez-vous déjà un compte ?
                            <br />
                            <Link to="/">Connectez-vous ici</Link>
                        </p>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )
}

export default SignUp