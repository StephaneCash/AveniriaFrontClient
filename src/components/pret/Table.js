import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { timestampParser } from "../../Utils"
import { FaDollarSign, FaEuroSign } from 'react-icons/fa';
import axios from 'axios';
import { baseUrl } from '../../bases/baseUrl';
import { UserContext } from '../../AppContext';
import Laoder from '../loader/Loader';

export default function BasicTable(props) {

    const [prets, setPrets] = React.useState([])
    const [userId, setUserId] = React.useState('');
    
    const { compteUser } = React.useContext(UserContext);

    const setTaillePret = props.setTaillePret;

    const getAllPrets = () => {
        axios.get(`${baseUrl}/prets/v1/users/${compteUser && compteUser.userId}`)
            .then(res => {
                setPrets(res.data)
                setTaillePret(res.data.taille)
            })
            .catch(err => {
                console.log(err)
            })
    };

    React.useEffect(() => {
        getAllPrets();
    }, [compteUser]);

    React.useEffect(() => {
        setUserId(compteUser && compteUser.userId);
    }, [compteUser]);

    return (
        <div className='table'>

            <TableContainer component={Paper}
                style={{ backgroundColor: "#13203b", color: "white" }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" style={{ color: "silver" }}>N°</TableCell>
                            <TableCell style={{ color: "silver" }}>Motif</TableCell>
                            <TableCell align="left" style={{ color: "silver" }}>Montant</TableCell>
                            <TableCell align="left" style={{ color: "silver" }}>Durée</TableCell>
                            <TableCell align="left" style={{ color: "silver" }}>Date</TableCell>
                            <TableCell align="left" style={{ color: "silver" }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            prets && prets.data ? prets.data.map((row, i) => {
                                if (row.userId === userId) {
                                    return (
                                        <TableRow
                                            key={i}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="left" style={{ color: "silver" }}>{i + 1} </TableCell>
                                            <TableCell align="left" style={{ color: "silver" }}>{row.motif} </TableCell>
                                            <TableCell align="left" style={{ color: "silver", display: "flex", alignItems: "center", gap: ".3rem" }}>
                                                {row.deviseId === "Dollar" ? <FaDollarSign /> :
                                                    row.deviseId === "Euro" ? <FaEuroSign /> : row.deviseId === "CDF" ? "CDF" : ""}
                                                {row.montant}
                                            </TableCell>
                                            <TableCell align="left" style={{ color: "silver" }}>{row.duree}</TableCell>
                                            <TableCell align="left" style={{ color: "silver" }}>
                                                {timestampParser(row.createdAt)}
                                            </TableCell>
                                            <TableCell align="left" style={{ color: "silver" }}>{row.status === true ?
                                                <i style={{
                                                    background: "silver", color: "green",
                                                    borderRadius: "10px", padding: "5px", fontWeight: "bold"
                                                }}>
                                                    Réussie
                                                </i> :
                                                <i style={{
                                                    background: "#555", color: "orange",
                                                    borderRadius: "10px", padding: "5px", fontWeight: "bold"
                                                }}>
                                                    En attente...
                                                </i>
                                            }
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            }
                            ) :

                                <TableCell align="left" style={{ color: "silver", textAlign: "center" }} colSpan="6px">
                                    <Laoder />
                                </TableCell>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
