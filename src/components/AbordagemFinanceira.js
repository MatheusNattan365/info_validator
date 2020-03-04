import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function AbordagemFinanceira({next}) {
    const [open, setOpen] = React.useState(false);
    const [abordagemFinanceira, setAbordagemFinanceira] = React.useState({
        chequeTitulosSPC:'',
        imovelOuVeiculo:'',
        recomendacoesOuAuxilio:'',

    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'ABORDAGEMFINANCEIRA': {
                ...abordagemFinanceira
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
                ABORDAGEM FINANCEIRA
      </Typography>
      {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        rows={8}
                        multiline
                        id="cheques-titulos"
                        label={`Você teve ou tem CHEQUES, TÍTULOS PROTESTADOS
                        ou nome no SPC? `}
                        helperText="Em caso de POSITIVO, forneça detalhes."
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setAbordagemFinanceira({...abordagemFinanceira, chequeTitulosSPC: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        rows={8}
                        multiline
                        id="imovel-veiculo"
                        label={`Você possui algum IMÓVEL ou VEÍCULO?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes.`}
                        fullWidth
                        autoComplete="fnsame"
                        variant="outlined"
                        onChange={evt => setAbordagemFinanceira({...abordagemFinanceira, imovelOuVeiculo: evt.target.value})}
                    />
                </Grid>
                <Grid item xs={12} sm={12}>
                    <TextField
                        rows={8}
                        multiline
                        id="pagamento-promessa"
                        label={`Você pagou ou prometeu pagamento em dinheiro, serviço ou 
                        material por recomendações ou promessas de auxiliá-lo nos exames   
                        de seleção da Polícia Militar?`}
                        helperText={`Em caso de POSITIVO, forneça detalhes.`}
                        fullWidth
                        variant="outlined"
                        onChange={evt => setAbordagemFinanceira({...abordagemFinanceira, recomendacoesOuAuxilio: evt.target.value})}
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