import React from 'react';
import Typography from '@material-ui/core/Typography';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function FamilyFormAscen({ next }) {
    const [open, setOpen] = React.useState(false);
    const [ascendentState, setAscendentState] = React.useState({
        columns: [
            { title: 'Grau', field: 'grau' },
            { title: 'Nome', field: 'nome' },
            { title: 'Idade', field: 'idade', type: 'numeric' },
            { title: 'Endereço', field: 'end' },
            { title: 'Ocupação', field: 'ocup' },
            { title: 'Vivo ou Morto', field: 'vivomorto' },
        ],
        data: [
            {
                grau: 'Pai',
                nome: 'Djair',
                idade: 46,
                end: 'Tertuliano da Costa',
                ocup: 'Técnico de Celular',
                vivomorto: 'vivo'
            }

        ],
    });
    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'ASCENDENTES': [
                ...ascendentState.data
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
                DADOS FAMILIARES
        </Typography>
            <Typography variant="h6" gutterBottom>
                ASCENDENTES
        </Typography>
            <Typography variant="body2">
                {`Décompleta*informações toon seus pass e inmâos Se voce foi c- 
                ado por padrastos, tutores toga» 
                o* out'3$ pessoas que nôosaoseuspais, aínlormaç&a «deitada 
                ceve abrangè-k» também`}
            </Typography>
            <br />

            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <MaterialTable
                title="ASCENDENTES TABLE"
                columns={ascendentState.columns}
                data={ascendentState.data}
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
                                setAscendentState(prevState => {
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
                                    setAscendentState(prevState => {
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
                                setAscendentState(prevState => {
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