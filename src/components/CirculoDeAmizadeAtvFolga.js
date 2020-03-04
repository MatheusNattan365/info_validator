import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function CirculoDeAmizadeAtv({ next }) {
    const [open, setOpen] = React.useState(false);
    const [atvsFolga, setAtvsFolga] = React.useState({
        fazNaFolga: '',
        socioDeClub: '',
        sindicato: '',
        filiacaoPolitica: '',
    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'CIRCULODEAMIZADEATVFOLGA': {
                ...atvsFolga
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
                CÍRCULO DE AMIZADE (ATIVIDADES)
      </Typography>
      {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="oque-faz-na-folga"
                        label="O que você costuma fazer nas horas de folgas e onde?"
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setAtvsFolga({...atvsFolga, fazNaFolga: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="socio-club"
                        label="Você é sócio de algum clube?"
                        helperText="Em caso de POSITIVO, forneça mais detalhes"
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setAtvsFolga({...atvsFolga, socioDeClub: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="sindicaato"
                        label="Pertence(u) a qualquer sindicato ou outra associação de classe?"
                        helperText="Em caso de POSITIVO, forneça mais detalhes"
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setAtvsFolga({...atvsFolga, sindicato: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="filiacao-politica"
                        label="Filiação política e cargo ou função que exerce(u), ou que foi candidato?"
                        helperText="Em caso de POSITIVO, forneça mais detalhes"
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setAtvsFolga({...atvsFolga, filiacaoPolitica: evt.target.value})}
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