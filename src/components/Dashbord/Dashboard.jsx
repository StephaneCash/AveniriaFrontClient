import React, { useEffect, useState } from 'react';
import BasicTable from '../tables/Table';
import "./Dashboard.css";
import axios from 'axios';
import { baseUrl } from '../../bases/baseUrl';
import { UserContext } from '../../AppContext';
import Card from '../card/Card';


const Dashboard = () => {

    const [transactions, setTransactions] = useState([]);

    const { compteUser } = React.useContext(UserContext);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        if (compteUser) {
            setUserId(compteUser && compteUser.userId)
        }
    }, [compteUser]);

    const getAllTransactions = () => {
        axios.get(`${baseUrl}/transactions/getByUserId/${userId}`)
            .then(res => {
                setTransactions(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    };

    useEffect(() => {
        if (userId) {
            getAllTransactions();
        }
    }, [userId]);

    return (
        <div className='dashboard'>
            <Card />
            <BasicTable data={transactions} compteUser={compteUser} />
        </div>
    )
}

export default Dashboard