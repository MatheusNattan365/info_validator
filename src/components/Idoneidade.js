import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function HabExpTrei({next}) {
    const [open, setOpen] = React.useState(false);
    const [idoneidade, setIdoneidadae] = React.useState(false);

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'IDONEIDADE': idoneidade
            
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
                IDONEIDADE
            </Typography>

            <Typography variant="body1" gutterBottom>
                {`Declaro que li e respondi pessoalmente todas as questões contidas no presente 
                formulário e autorizo ser procedida averiguação dos endereços cotados, bem como as pessoas e
                empresas mencionadas no presente a fornecerem à Polícia  Militar todas as informações 
                sobre minha conduta pessoal, profissional e escolar. Isentando-as de responsabilidades 
                caso não se processe o meu alistamento ou venha a ser desligado do Curso de Formação.`}
            </Typography>
            <br />
            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <FormControlLabel
                control={<Checkbox value={idoneidade} onChange={() => setIdoneidadae(!idoneidade)} color="primary" />}
                label="Aceito"
            />
            <br />
            <br />
            <Button
                disabled={!idoneidade}
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                {'Finalizar formulário'}
            </Button>
        </React.Fragment>
    );
}