import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function Identification({next}) {
    const [open, setOpen] = React.useState(false);
    const [descendentState, setDescendentState] = React.useState({
        columns: [
            { title: 'Nome', field: 'nome' },
            { title: 'Data de Nascimento', field: 'nascimento', type: 'date' },
            { title: 'Onde e com quem reside?', field: 'onde' },
            { title: 'Situação da Criança', field: 'situacao' },
        ],
        data: [
            {
                nome: 'Davi',
                nascimento: '20/08/2018',
                onde: 'Comigo',
                situacao: 'Filho legítimo',
            }

        ],
    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'DESCENDENTES': [
                ...descendentState.data
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
                DESCENDENTES
        </Typography>
            <Typography variant="body2">
                {`Relacione aoúf-xo todos os seus filhos, 
                especificando a situação da criança 
                'filho legitimo legiimado. adotivo, enteado).`}
            </Typography>
            <br />

            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <MaterialTable
                title="DESCENDENTES TABLE"
                columns={descendentState.columns}
                data={descendentState.data}
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
                                setDescendentState(prevState => {
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
                                    setDescendentState(prevState => {
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
                                setDescendentState(prevState => {
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