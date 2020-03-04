import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';


export default function ServicoMilitar({next}) {
    const [open, setOpen] = React.useState(false);
    const [servicoMilitar, setServicoMilitar] = React.useState({
        nomeUnidade:'',
        foneUnidade:'',
        endUnidade:'',
        cidadeUnidade:'',
        estadoUnidade:'',
        cepUnidade:'',
        de:'',
        ate:'',
        punicoes:'',
        ipmOuSind:'',
    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'SERVICOMILITAR': {
                ...servicoMilitar
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
                SERVIÇO MILITAR
      </Typography>
            <Typography variant="body1" gutterBottom>
                {`Preste ionformações a respeitoi do seu serviço militar.`}
            </Typography>
            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                    <TextField
                        required
                        id="unidade"
                        label={`Unidade em que serviu`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setServicoMilitar({...servicoMilitar, nomeUnidade: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="fone-unidade"
                        label={`Fone`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setServicoMilitar({...servicoMilitar, foneUnidade: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="end-unidade"
                        label={`Endereço`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setServicoMilitar({...servicoMilitar, endUnidade: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="cidade-unidade"
                        label={`Cidade`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setServicoMilitar({...servicoMilitar, cidadeUnidade: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="estado-unidade"
                        label={`Estado`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setServicoMilitar({...servicoMilitar, estadoUnidade: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        required
                        id="cep-unidade"
                        label={`CEP`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setServicoMilitar({...servicoMilitar, cepUnidade: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="date"
                        id="de"
                        helperText="De"
                        fullWidth
                        variant="outlined"
                        onChange={evt => setServicoMilitar({...servicoMilitar, de: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        type="date"
                        id="ate"
                        helperText="Até"
                        fullWidth
                        variant="outlined"
                        onChange={evt => setServicoMilitar({...servicoMilitar, ate: evt.target.value})}
                    />
                </Grid>

                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="punicoes"
                        label={`Você foi punido durante o seu SERVIÇO MILITAR?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes indicando 
                        as punições e os motivos.`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setServicoMilitar({...servicoMilitar, punicoes: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        rows={8}
                        multiline
                        id="ipm-sind"
                        label={`Você esteve envolvido em INQUÉRITO POLICIAL MILITAR ou  de SINDICÂNCIA 
                        instaurada pelas FORNÇAS ARMADAS?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes.`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setServicoMilitar({...servicoMilitar, ipmOuSind: evt.target.value})}
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