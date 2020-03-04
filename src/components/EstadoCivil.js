import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function FamilyFormComplement({next}) {
    const [open, setOpen] = React.useState(false);
    const [stateCivil, setStateCivil] = React.useState({
        estadoCivil:'',
        processoPaternidade:''

    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'ESTADOCIVIL': {
                ...stateCivil
            }
            
        }).then(res => {
            alert('Informações salvas com sucesso!');
            next();
        });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <React.Fragment>
            <Typography variant="h6" gutterBottom>
                ESTADO CIVIL
            </Typography>
            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="estado-civil"
                        label="ESTADO CIVIL"
                        fullWidth
                        autoComplete="fname"
                        variant="outlined"
                        onChange={evt => setStateCivil({...stateCivil, estadoCivil: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        multiline
                        rows={8}
                        id="processo-paternidade"
                        name="firstName"
                        label="Você já foi envolvido em algum processo de paternidade?"
                        helperText="Em caso de POSITIVO, forneça mais informações e o atual endereço da sua esposa"
                        fullWidth
                        variant="outlined"
                        onChange={evt => setStateCivil({...stateCivil, processoPaternidade: evt.target.value})}
                    />
                </Grid>
            </Grid>
            <br />
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                {'Salvar'}
            </Button>
        </React.Fragment>
    );
}