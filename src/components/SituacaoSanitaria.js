import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';


export default function SituacaoSanitaria({next}) {
    const [open, setOpen] = React.useState(false);
    const [situacaoSanitaria, setSituacaoSanitaria] = React.useState({
        disturbiosFamiliares:'',
        internadoHospital:'',
        desmaiou:'',
        bebidasAlcoolicas:'',
        fumante:'',


    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'SITUACAOSANITARIA': {
                ...situacaoSanitaria
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
                SITUAÇÃO SANITÁRIA
            </Typography>
            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        multiline
                        rows={8}
                        id="disturbios-familiares"
                        name="firstName"
                        label={`Você ou algum membro de sua família já foi
                        examinado ou tratado em virtude de distúrbios nervosos ou 
                        mentais ou moléstia prolongada? `}
                        helperText="Em caso de POSITIVO, forneça mais informações."
                        fullWidth
                        variant="outlined"
                        onChange={evt => setSituacaoSanitaria({ ...situacaoSanitaria, disturbiosFamiliares: evt.target.value })}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        multiline
                        rows={8}
                        id="firstName"
                        name="firstName"
                        label={`Você já foi internado em hospital?`}
                        helperText="Em caso de POSITIVO, forneça mais informações."
                        fullWidth
                        variant="outlined"
                        onChange={evt => setSituacaoSanitaria({ ...situacaoSanitaria, internadoHospital: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        multiline
                        rows={8}
                        id="firstName"
                        name="firstName"
                        label={`Você já desmaiou alguma vez?`}
                        helperText="Em caso de POSITIVO, forneça mais informações."
                        fullWidth
                        variant="outlined"
                        onChange={evt => setSituacaoSanitaria({ ...situacaoSanitaria, desmaiou: evt.target.value })}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        multiline
                        rows={2}
                        id="firstName"
                        name="firstName"
                        label={`Você faz uso de bebidas alcoólicas?`}
                        helperText="Em caso de POSITIVO, quais bebidas?."
                        fullWidth
                        variant="outlined"
                        onChange={evt => setSituacaoSanitaria({ ...situacaoSanitaria, bebidasAlcoolicas: evt.target.value })}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        multiline
                        rows={1}
                        id="firstName"
                        name="firstName"
                        label={`Você fuma?`}
                        helperText="Em caso de POSITIVO, o que você fuma?"
                        fullWidth
                        variant="outlined"
                        onChange={evt => setSituacaoSanitaria({ ...situacaoSanitaria, fumante: evt.target.value })}
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