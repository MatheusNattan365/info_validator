import React, { useEffect } from 'react';
import { makeStyles, } from '@material-ui/core/styles';

import {
    CssBaseline,
    Paper,
    MobileStepper,
    Step,
    StepLabel,
    Typography,
    LinearProgress
} from '@material-ui/core';

// Partes do formulário
import FullIdentification from './FullIdentification';
import AddressForm from './AddressForm';
import FamilyFormAscendente from './FamilyFormAscen';
import FamilyFormDescendente from './FamilyFormDescen';
import FamilyFormCasamento from './FamilyFormCasamento';
import EstadoCivil from './EstadoCivil';
import SituacaoSanitaria from './SituacaoSanitaria';
import CirculoDeAmizade from './CirculoDeAmizade';
import CirculoDeAmizadePM from './CirculoDeAmizadePM';
import CirculoDeAmizadeTestemunho from './CirculoDeAmizadeTestemunho';
import CirculoDeAmizadeAtvFolga from './CirculoDeAmizadeAtvFolga';
import CirculoDeAmizadeJustica from './CirculoDeAmizadeJustica';
import CirculoDeAmizadeCondenacao from './CirculoDeAmizadeCondenacao';
import EmpregoAnterior from './EmpregoAnterior';
import HabExpTrei from './HabExpTrei';
import ServicoMilitar from './ServicoMilitar';
import CurriculoEscolar from './CurriculoEscolar';
import AbordagemFinanceira from './AbordagemFinanceira';
import DadosOrientados from './DadosOrientados';
import Idoneidade from './Idoneidade';

import firebase from '../services/firebaseConfig';

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
    }

}));

const steps = [
    'Identificação',
    'Dados Residenciais',
    'Dados Familiares Ascendentes',
    'Dados Familiares Descendentes',
    'Dados Familiares Casamento',
    'Estado Civil',
    'Situação Sanitária',
    'Cículo de Amizade',
    'Cículo de Amizade Parente PM',
    'Cículo de Amizade Testemunho',
    'Cículo de Amizade Atividades na Folga',
    'Cículo de Amizade Justiça',
    'Cículo de Amizade Condenação',
    'Emprego Anterior',
    'Habilidade, Experiência ou Treinamento',
    'Serviço Militar',
    'Currículo Escolar',
    'Abordagem Financeira',
    'Dados Orientados',
    'Declaração de idoneidade das informações'
];



export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(99);
    const classes = useStyles();


    async function checarSeFormularioFinalizado() {
        const db = firebase.firestore();
        const ID = await localStorage.getItem('userID');
        try {
            await db.collection('USERS')
                .doc(`${ID}`)
                .get()
                .then(doc => {
                    if (doc.data() == undefined || !doc.data().hasOwnProperty('IDONEIDADE') || doc.data().IDONEIDADE == false) {
                        setActiveStep(0)
                    } else {
                        setActiveStep(20)
                    }
                })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        checarSeFormularioFinalizado()
    }, [])

    function getStepContent(step, nextFunc) {
        switch (step) {
            case 0:
                return <FullIdentification next={nextFunc} />;
            case 1:
                return <AddressForm next={nextFunc} />;
            case 2:
                return <FamilyFormAscendente next={nextFunc} />;
            case 3:
                return <FamilyFormDescendente next={nextFunc} />;
            case 4:
                return <FamilyFormCasamento next={nextFunc} />;
            case 5:
                return <EstadoCivil next={nextFunc} />;
            case 6:
                return <SituacaoSanitaria next={nextFunc} />;
            case 7:
                return <CirculoDeAmizade next={nextFunc} />;
            case 8:
                return <CirculoDeAmizadePM next={nextFunc} />;
            case 9:
                return <CirculoDeAmizadeTestemunho next={nextFunc} />;
            case 10:
                return <CirculoDeAmizadeAtvFolga next={nextFunc} />;
            case 11:
                return <CirculoDeAmizadeJustica next={nextFunc} />;
            case 12:
                return <CirculoDeAmizadeCondenacao next={nextFunc} />;
            case 13:
                return <EmpregoAnterior next={nextFunc} />;
            case 14:
                return <HabExpTrei next={nextFunc} />;
            case 15:
                return <ServicoMilitar next={nextFunc} />;
            case 16:
                return <CurriculoEscolar next={nextFunc} />;
            case 17:
                return <AbordagemFinanceira next={nextFunc} />;
            case 18:
                return <DadosOrientados next={nextFunc} />;
            case 19:
                return <Idoneidade next={nextFunc} />;
            case 99:
                return <LinearProgress />;
            default:
                throw new Error('Unknown step');
        }
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    return (
        <React.Fragment>
            <CssBaseline />

            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h2" variant="h4" align="center">
                        COLETA DE DADOS DO CANDIDATO
          </Typography>
                    <MobileStepper
                        variant="dots"
                        steps={steps.length}
                        position="static"
                        activeStep={activeStep} className={classes.stepper}>
                        {steps.map(label => (
                            <Step key={label}>
                                <StepLabel />
                            </Step>
                        ))}
                    </MobileStepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant="h4" gutterBottom>
                                    Formulário finalizado com sucesso.
                                </Typography>
                                <Typography variant="subtitle1">
                                    As informações persistidas são imutáveis e foram
                                    armazenadas no banco de dados da PMPB.
                                </Typography>
                                <br />
                                <br />
                                <Typography align="center" variant="subtitle2">
                                    Agradecemos pela sua colaboração.
                                </Typography>
                            </React.Fragment>
                        ) : (
                                <React.Fragment>
                                    {getStepContent(activeStep, handleNext)}
                                </React.Fragment>
                            )}
                    </React.Fragment>
                </Paper>
            </main>
        </React.Fragment>
    );
}