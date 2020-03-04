import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function CirculoDeAmizadeCond({ next }) {
    const [open, setOpen] = React.useState(false);
    const [amizadeCond, setAmizadeCond] = React.useState({
        condenacao: '',
        ipSindInvSum: '',
        armaDeFogo:''

    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'CIRCULODEAMIZADECONDENACAO': {
                ...amizadeCond
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
                CÍRCULO DE AMIZADE (CONDENAÇÃO)
      </Typography>
      {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="condenado"
                        name="firstName"
                        label={`Você já foi condenado a qualquer pena de reclusão, 
                        detenção, prisão simples, multa ou outras penas acessórias?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes indicando 
                        inclusive se houve 'sursir' ou liberdade condicional.`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setAmizadeCond({...amizadeCond, condenacao: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="envolvido-ip-sind"
                        name="firstName"
                        label={`Você já esteve envolvido em INQUÉRITO POLICIAL, 
                        SINDICÂNCIA OU INVESTIGAÇÃO SUMÁRIA?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes.`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setAmizadeCond({...amizadeCond, ipSindInvSum: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="arma-de-fogo"
                        name="firstName"
                        label={`Você possui alguma ARMA DE FOGO?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes indicando 
                        inclusive se foi apreendida alguma vez.`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setAmizadeCond({...amizadeCond, armaDeFogo: evt.target.value})}
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