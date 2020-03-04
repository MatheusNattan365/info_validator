import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function HabExpTrei({next}) {
    const [open, setOpen] = React.useState(false);
    const [habExpTre, setHabExpTre] = React.useState({
        habExpouTrein:'',
        cnh:'',
        cnhSuspCassa:'',
        acidenteVeicular:'',
        trabNaPM:'',
        ingressNaPM:'',
        ingressNoSP:'',

    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'HABEXPTREINA': {
                ...habExpTre
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
                HABILIDADE, EXPERIÊNCIA E TREINAMENTO
      </Typography>
      {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="hab-exp-trein"
                        label={`Você possui alguma HABILIDADE, EXPERIÊNCIA ou TREINAMENTO
                        que julgue ser útil à Polícia Militar?`}
                        helperText="Em caso de POSITIVO, forneça detalhes."
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setHabExpTre({...habExpTre, habExpouTrein: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}> 
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="cnh"
                        label={`Você possui CARTEIRA NACIONAL DE HABILITAÇÃO(CNH)?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes como 
                        ( N° DA CNH, N° DO REGISTRO, DATA DE EXPEDIÇÃO, LOCAL DE EXPEDIÇÃO e
                            CATEGORIA(AS) ).`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setHabExpTre({...habExpTre, cnh: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="cnh-suspensa-cassada"
                        name="firstName"
                        label={`Você teve alguma vez sua CNH suspensa ou cassada?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes.`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setHabExpTre({...habExpTre, cnhSuspCassa: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="acidente-veicular"
                        label={`Você já foi envolvido em algum acidente ao dirigir algum veículo?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes.`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setHabExpTre({...habExpTre, acidenteVeicular: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="trabalho-na-pm"
                        label={`Qual o trabalho que gostaria de fazer na PM?`}
                        helperText={`Ex: CHOQUE, FORÇA TÁTICA E AMBIENTAL`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setHabExpTre({...habExpTre, trabNaPM: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="ingressar-pm"
                        label={`Você já procurou anteriormente ingressar na PM?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes sobre a quantidade de 
                        vezes esclarecendo os motivos da reprovação.`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setHabExpTre({...habExpTre, ingressNaPM: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="ingressar-serviço-publico"
                        label={`Você já procurou anteriormente ingressar no Serviço Público?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes como ANO, LOCALIDADE, CARGO e RESULTADOS.`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setHabExpTre({...habExpTre, ingressNoSP: evt.target.value})}
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