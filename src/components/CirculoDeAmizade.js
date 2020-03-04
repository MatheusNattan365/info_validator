import React from 'react';
import {
    Typography,
    Button
} from '@material-ui/core';

import MaterialTable from 'material-table';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function FamilyFormAscen({ next }) {
    const [open, setOpen] = React.useState(false);
    const [amizadeState, setAmizadeState] = React.useState({
        columns: [
            { title: 'Nome completo', field: 'nome' },
            { title: 'Conhece-o há quanto tempo?', field: 'tempo' },
            { title: 'Ocupação', field: 'ocup' },
            { title: 'Endereço', field: 'end' },
            { title: 'Phone', field: 'phone' },
        ],
        data: [
            {
                nome: 'Djair da Costa Santos',
                tempo: '2 anos',
                end: 'Tertuliano da Costa',
                ocup: 'Estudante',
                phone: '83 9 1234-4321'
            }

        ],
    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'CIRCULODEAMIZADE': [
                ...amizadeState.data
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
                CIRCULO DE AMIZADE
        </Typography>

            <Typography variant="body2">
                {`Dê os seguintes dados sobre, no mínimo, três amigos(as)`}
            </Typography>
            <br />
            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm} /> : null}
            <MaterialTable
                title="AMIZADE TABLE"
                columns={amizadeState.columns}
                data={amizadeState.data}
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
                                setAmizadeState(prevState => {
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
                                    setAmizadeState(prevState => {
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
                                setAmizadeState(prevState => {
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