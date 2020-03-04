import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MaterialTable from 'material-table';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';


export default function CirculodeAmizadePM({ next }) {
    const [open, setOpen] = React.useState(false);
    const [amizadePMState, setAmizadePMState] = React.useState({
        columns: [
            { title: 'Posto ou Graduação', field: 'postgrad' },
            { title: 'Nome completo', field: 'nome' },
            { title: 'Endereço', field: 'end' },
            { title: 'Grau', field: 'grau' },
        ],
        data: [
            {
                postgrad: 'SD',
                nome: 'Matheus Nattan',
                end: 'EME2',
                grau: 'primo',
            }

        ],
    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'CIRCULODEAMIZADEPM': [
                ...amizadePMState.data
            ]
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
                CIRCULO DE AMIZADE PM
            </Typography>
            <Typography variant="body2" gutterBottom>
                {`Possui parentes na PM? Em caso de POSITIVO, 
                        preecha a tabela a baixo com as informações dos parentes`}
            </Typography>


            <br />
            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <MaterialTable
                title="PARENTES PM"
                columns={amizadePMState.columns}
                data={amizadePMState.data}
                options={{
                    search: false,
                    exportButton: true,
                    exportCsv: (columns, data) => {
                        console.log(data);
                    }
                }
                }
                editable={{
                    onRowAdd: newData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                setAmizadePMState(prevState => {
                                    const data = [...prevState.data];
                                    data.push(newData);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                    onRowUpdate: (newData, oldData) =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                if (oldData) {
                                    setAmizadePMState(prevState => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                    });
                                }
                            }, 600);
                        }),
                    onRowDelete: oldData =>
                        new Promise(resolve => {
                            setTimeout(() => {
                                resolve();
                                setAmizadePMState(prevState => {
                                    const data = [...prevState.data];
                                    data.splice(data.indexOf(oldData), 1);
                                    return { ...prevState, data };
                                });
                            }, 600);
                        }),
                }}
            />
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