import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaHistory } from "react-icons/fa"

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Transfert', "21 déc 2022", "12 $", "Eli", "Réussie"),
    createData('Dépôt', "24 déc 2022", "9 $", "Stéphane", "Réussie"),
    createData('Achat', "03 Jan 2023", "16.0 $", "John", "Echec"),
    createData('Transfert', "06 Jan 2023", "125 $", "Pablo escobar", "Réussite"),
];

export default function BasicTable(props) {
    return (
        <div className='table'>
            <h3 style={{ textAlign: "left", display: "flex", alignItems: "center", gap: "1rem" }}>
                Vos Affiliations <FaHistory />
            </h3>
            <TableContainer component={Paper}
                style={{ backgroundColor: "#13203b", color: "white" }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: "silver" }}>Utilisateur</TableCell>
                            <TableCell align="left" style={{ color: "silver" }}>Bonus gagné</TableCell>
                            <TableCell align="left" style={{ color: "silver" }}>Status</TableCell>
                            <TableCell align="left" style={{ color: "silver" }}>Inscription</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row" style={{ color: "silver" }}>
                                    {row.name}
                                </TableCell>
                                <TableCell align="left" style={{ color: "silver" }}>{row.calories}</TableCell>
                                <TableCell align="left" style={{ color: "silver" }}>{row.fat}</TableCell>
                                <TableCell align="left" style={{ color: "silver" }}>{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
