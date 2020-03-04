import React, { useEffect } from 'react';
import {
    Grid,
    Typography,
    TextField,
    Button
} from '@material-ui/core';


import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function Identification({ next }) {
    const [open, setOpen] = React.useState(false);
    const [identification, setIdentification] = React.useState({
        nomeCompleto: '',
        nascimento: '',

        telefone: '',

        cpf: '',
        rg: '',
        rg_orgaoExpedidor: '',
        tituloEleitoral: '',
        titulo_zona: '',
        carteiraProfissional: '',
        carteira_serie: '',

        graudeinstru: '',
        curso: '',
        idioma: '',
        profissao: '',

        endereco: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',

        estadoCivil: '',
        nomeConjuge: '',

        religiao: '',

        nomeMae: '',
        nacionalidadeMae: '',
        nomePai: '',
        nacionalidadePai: '',

    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await localStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).set({
            'IDENTIFICATION': {
                ...identification
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
                Identificação
      </Typography>
            <Typography variant="body1">
                {`Este formulário destina-se a coletar dados para cadastro do candidato 
                e instruções do processo de investigação Social.`}
            </Typography>

            <br />
            <br />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        id="nome-completo"
                        name="firstName"
                        label="Nome completo"
                        fullWidth
                        autoComplete="fname"
                        onChange={evt => setIdentification({ ...identification, nomeCompleto: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        variant="outlined"
                        required
                        id="nome-mae"
                        name="firstName"
                        label="Nome da mãe"
                        fullWidth
                        autoComplete="fname"
                        onChange={evt => setIdentification({ ...identification, nomeMae: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        id="nacionalidade-mae"
                        name="firstName"
                        label="Nacionalidade"
                        fullWidth
                        autoComplete="fname"
                        onChange={evt => setIdentification({ ...identification, nacionalidadeMae: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        variant="outlined"
                        required
                        id="nome-pai"
                        name="firstName"
                        label="Nome do pai"
                        fullWidth
                        autoComplete="fname"
                        onChange={evt => setIdentification({ ...identification, nomePai: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        id="nacionalidade-pai"
                        name="firstName"
                        label="Nacionalidade"
                        fullWidth
                        autoComplete="fname"
                        onChange={evt => setIdentification({ ...identification, nacionalidadePai: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <TextField
                        variant="outlined"
                        required
                        id="nascimento"
                        name="address1"
                        fullWidth
                        type="date"
                        helperText="Data de Nascimento"
                        onChange={evt => setIdentification({ ...identification, nascimento: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={7}>
                    <TextField
                        variant="outlined"
                        required
                        id="cic-cpf"
                        name="address1"
                        label="CIC/CPF"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, cpf: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        id="address1"
                        name="address1"
                        label="Endereço"
                        fullWidth
                        autoComplete="billing address-line1"
                        onChange={evt => setIdentification({ ...identification, endereco: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        id="address2"
                        name="address2"
                        label="Bairro"
                        fullWidth
                        autoComplete="billing address-line2"
                        onChange={evt => setIdentification({ ...identification, bairro: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="lastname"
                        name="lastName"
                        label="N° do telefone"
                        fullWidth
                        autoComplete="lname"
                        onChange={evt => setIdentification({ ...identification, telefone: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="city"
                        name="city"
                        label="Cidade"
                        fullWidth
                        autoComplete="billing address-level2"
                        onChange={evt => setIdentification({ ...identification, cidade: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="zip"
                        name="zip"
                        label="CEP"
                        fullWidth
                        autoComplete="billing postal-code"
                        onChange={evt => setIdentification({ ...identification, cep: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="country"
                        name="country"
                        label="Estado"
                        fullWidth
                        autoComplete="billing country"
                        onChange={evt => setIdentification({ ...identification, estado: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="estado-civil"
                        name="address1"
                        label="Estado civil"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, estadoCivil: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        variant="outlined"
                        required
                        id="nome-conjuge"
                        name="address1"
                        label="Nome do côjuge"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, nomeConjuge: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="grau-instrucao"
                        name="lastName"
                        label="Grau de instrução"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, graudeinstru: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="serie"
                        name="city"
                        label="Série do curso"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, curso: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="idioma"
                        name="zip"
                        label="Idioma estrangeiro"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, idioma: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="profissao"
                        name="country"
                        label="Profissão"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, profissao: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        variant="outlined"
                        required
                        id="rg"
                        name="country"
                        label="RG N°"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, rg: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        id="orgao-expedidor"
                        name="country"
                        label="Órgão expedidor"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, rg_orgaoExpedidor: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        variant="outlined"
                        required
                        id="titulo-eleitor"
                        name="country"
                        label="Título de eleitor"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, tituloEleitoral: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        id="zona-eleitoral"
                        name="country"
                        label="Zona"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, titulo_zona: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={8}>
                    <TextField
                        variant="outlined"
                        required
                        id="carteira-profissional"
                        name="country"
                        label="Carteira profissional"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, carteiraProfissional: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        variant="outlined"
                        required
                        id="carteira-serie"
                        name="country"
                        label="Série"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, carteira_serie: evt.target.value })}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        id="religiao"
                        name="country"
                        label="Religiao"
                        fullWidth
                        onChange={evt => setIdentification({ ...identification, religiao: evt.target.value })}
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

            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm} /> : null}

        </React.Fragment>
    );


}
