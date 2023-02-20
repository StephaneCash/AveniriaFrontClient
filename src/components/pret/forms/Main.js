import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react'
import { FaCheckCircle, FaHandshake, FaPhoneAlt, FaRegBookmark, FaUserAlt, FaUserSecret } from 'react-icons/fa';
import { UserContext } from '../../../AppContext';
import Form1 from './Form1';
import Form2 from './Form2';
import Form3 from './Form3';
import Form4 from './Form4';
import Form5 from './Form5';

const labels = ["", "", "", '', ""];

const handleSteps = (step) => {
    switch (step) {
        case 0:
            return <Form1 />
        case 1:
            return <Form2 />
        case 2:
            return <Form3 />
        case 3:
            return <Form4 />
        case 4:
            return <Form5 />
        default:
            throw new Error("Etape non connue")
    }
};

const Main = () => {

    const { stepCurrent } = React.useContext(UserContext);

    return (
        <>
            {
                stepCurrent === labels.length ?
                    (
                        <Form4 />
                    ) : (
                        <>
                            <Box sx={{ my: 5 }}>
                                <Typography variant='h6' align='center'>
                                    {
                                        stepCurrent === 0 ? (
                                            <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
                                                <FaUserAlt /> <span>Informations personnelles</span>
                                            </div>
                                        ) :
                                            stepCurrent === 1 ?
                                                (
                                                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
                                                        <FaPhoneAlt /> <span>Coordonées</span>
                                                    </div>
                                                ) :
                                                stepCurrent === 2 ?
                                                    (
                                                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
                                                            <FaRegBookmark /> <span>Votre situation professionnelle</span>
                                                        </div>
                                                    )
                                                    :
                                                    stepCurrent === 3 ?
                                                        <div
                                                            style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}
                                                        >
                                                            <FaHandshake /> <span>Signature du contrat</span>
                                                        </div>
                                                        :
                                                        stepCurrent === 4 ? (
                                                            <div
                                                                style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}
                                                            >
                                                                <FaCheckCircle /> <span>Validation</span>
                                                            </div>
                                                        ) : ""
                                    }
                                </Typography>
                            </Box>

                            <Stepper activeStep={stepCurrent} sx={{ py: 3 }} alternativeLabel>
                                {
                                    labels.map((label, i) => {
                                        return (
                                            <Step key={i}>
                                                <StepLabel>{label}</StepLabel>
                                            </Step>
                                        )
                                    })
                                }
                            </Stepper>

                            {handleSteps(stepCurrent)}
                        </>
                    )
            }
        </>
    )
}

export default Main