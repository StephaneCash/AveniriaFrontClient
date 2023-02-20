import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Form1 from './Forms/Form1';
import Form2 from './Forms/Form2';
import Form3 from './Forms/Form3';
import Form4 from './Forms/Form4';
import { UserContext } from '../../AppContext';


const labels = ["", "", "", ''];

const handleSteps = (step) => {
    switch (step) {
        case 0:
            return <Form4 />
        case 1:
            return <Form1 />
        case 2:
            return <Form2 />
        case 3:
            return <Form3 />
        default:
            throw new Error("Etape non connue")
    }
}

export default function FormStepper() {

    const { activeStep } = React.useContext(UserContext);

    return (
        <>
            {
                activeStep === labels.length ?
                    (
                        <Form4 />
                    ) : (
                        <>
                            <Box sx={{ my: 5 }}>
                                <Typography variant='h5' align='center'>
                                    Transfert d'argent
                                </Typography>
                            </Box>

                            <Stepper activeStep={activeStep} sx={{ py: 3 }} alternativeLabel>
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

                            {handleSteps(activeStep)}
                        </>
                    )
            }
        </>
    );
}