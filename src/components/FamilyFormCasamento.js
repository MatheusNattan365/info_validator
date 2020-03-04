import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';


export default function FamilyFormComplement({next}) {
    const [open, setOpen] = React.useState(false);
    const [familyInfoComplemento, setFamilyInfoComplemento] = React.useState({
        nomeConjuge:'',
        nascimentoConjuge:'',
        casamentoData:'',
        casamentoLocal:'',
        sustentandoOsFilhos:'',
        vivendoComConjuge:'',
        conjugeEmpregado:'',
        sogrosEnd:''

    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'CASAMENTO': {
                ...familyInfoComplemento
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
                DADOS FAMILIARES (CASAMENTO)
      </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <TextField
                        required
                        id="nomeConjuge"
                        label="Nome completo do seu cônjuge"
                        fullWidth
                        autoComplete="fname"
                        variant="outlined"
                        onChange={evt => setFamilyInfoComplemento({ ...familyInfoComplemento, nomeConjuge: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="nascimento"
                        helperText="Data de nascimento"
                        fullWidth
                        type="date"
                        variant="outlined"
                        onChange={evt => setFamilyInfoComplemento({ ...familyInfoComplemento, nascimentoConjuge: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        required
                        id="casamento"
                        helperText="Data do casamento"
                        fullWidth
                        type="date"
                        variant="outlined"
                        onChange={evt => setFamilyInfoComplemento({ ...familyInfoComplemento, casamentoData: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextField
                        required
                        id="casamento_local"
                        label="Local do casamento"
                        fullWidth
                        variant="outlined"
                        onChange={evt => setFamilyInfoComplemento({ ...familyInfoComplemento, casamentoLocal: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        multiline
                        rows={5}
                        required
                        id="sustentando-os-filhos"
                        label="Você está sustentando todos os seus filhos?"
                        helperText={`em caso de negativo, forneça detalhes.`}
                        fullWidth
                        autoComplete="fname"
                        variant="outlined"
                        onChange={evt => setFamilyInfoComplemento({ ...familyInfoComplemento, sustentandoOsFilhos: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        multiline
                        rows={4}
                        id="vivendo-com-conjuge"
                        label="Esta vivendo com seu cônjuge?"
                        helperText={`Em caso de NEGATIVO, forneça mais 
                        informações e o atual endereço do seu cônjuge.`}
                        fullWidth
                        variant="outlined"
                        onChange={evt => setFamilyInfoComplemento({ ...familyInfoComplemento, vivendoComConjuge: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        multiline
                        rows={4}
                        id="conjuge-empregado"
                        label="Seu cônjuge está empregado atualmente?"
                        helperText={`m caso POSITIVO, forneça mais informações 
                        sobre o EMPREGO, LOCAL DE TRABALHO, SALÁRIO E FUNÇÃO`}
                        fullWidth
                        variant="outlined"
                        onChange={evt => setFamilyInfoComplemento({ ...familyInfoComplemento, conjugeEmpregado: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        multiline
                        rows={5}
                        id="sogros-end"
                        label="Forneça o NOME e o ENDEREÇO de seus sogros"
                        fullWidth
                        variant="outlined"
                        onChange={evt => setFamilyInfoComplemento({ ...familyInfoComplemento, sogrosEnd: evt.target.value })}
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
            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
        </React.Fragment>
    );
}