import React from 'react';
import { makeStyles, } from '@material-ui/core/styles';

import {
    CssBaseline,
    Paper,
    Typography,
    Button,
    Input,
    LinearProgress
} from '@material-ui/core';
import {
    CloudUpload,
    CloudDownload
} from '@material-ui/icons';




import firebase from '../services/firebaseConfig';
import jsPDF from '../services/jspdf';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    stepper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing(1, 0, 5),
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    circular: {
        flex: 1,
        alignSelf: 'center'
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },

}));



export default function Checkout() {
    const [arquivoUp, setArquivoUp] = React.useState();
    const [completed, setCompleted] = React.useState(0);
    const [buffer, setBuffer] = React.useState(10);
    const classes = useStyles();

    async function uploadIDONEIDADE() {
        const ID = await localStorage.getItem('userID');
        const storageRef = await firebase.storage().ref();
        var mountainImagesRef = storageRef.child(`images/${ID}`);
        try {
            let uploadTask = mountainImagesRef.put(arquivoUp)

            await uploadTask.on('state_changed', snapshot => {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setBuffer(progress +10)
                setCompleted(progress);
            }, error => {
                console.log('ObserverError: '+ error);
            }, () => {
                alert('Documento enviado com sucesso!')
                setArquivoUp(null)
            })
            
        } catch (error) {
            console.log('deu aiga no upload')
        }

    }

    return (
        <React.Fragment>
            <CssBaseline />

            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h2" variant="h4" align="center">
                        TERMO DE IDONEIDADE
          </Typography>
                    <br />
                    <React.Fragment>
                        <Typography variant="subtitle1" gutterBottom>
                            Após o término do preenchimento do formulário é necessário que você imprima o termo
                            de IDONEIDADE, ASSINE-O, ESCANEIE-O e NOS ENVIE de volta.
                                </Typography>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            startIcon={<CloudDownload />}
                            onClick={() => jsPDF.gerarDoc()}
                        >
                            TERMO_DE_IDONEIDADE.pdf
                        </Button>
                        <br />
                        <br />
                        <Typography variant="subtitle1" align='center' gutterBottom>
                            Faça o UPLOAD do documento assinado
                                </Typography>
                        <Typography variant="subtitle2" align="center" gutterBottom>
                            OBS: O arquivo(Imagem ou PDF) necessariamente precisa ser NÍTIDO e de fácil reconhecimento.
                                </Typography>
                        <Input
                            fullWidth
                            color="primary"
                            disableUnderline={true}
                            type="file"
                            onChange={evt => setArquivoUp(evt.target.files[0])}
                        />
                         {arquivoUp ? <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} /> : null}
                        <br />
                        <br />
                        <Button
                            disabled={!arquivoUp}
                            fullWidth
                            variant="outlined"
                            color="primary"
                            startIcon={<CloudUpload />}
                            onClick={() => uploadIDONEIDADE()}
                        >
                            ENVIAR
                        </Button>
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}