import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function CirculoDeAmizadeJus({next}) {
    const [open, setOpen] = React.useState(false);
    const [amizadeJus, setAmizadeJus] = React.useState({
        columns: [
            { title: 'Data', field: 'data', type: 'date' },
            { title: 'Local da Infração', field: 'localDaInfra', },
            { title: 'Fórum', field: 'forum' },
            { title: 'Endereço', field: 'end', },
            { title: 'Cidade', field: 'cidade' },
            { title: 'Estado', field: 'estado' },
            { title: 'Cep', field: 'cep' },
            { title: 'Indiciado, Réu, Vítima ou Testemunha', field: 'condicao' },
            { title: 'Solução do caso', field: 'solu' },
        ],
        data: [
            {
                data: '',
                localDaInfra: 'Centro da cidade',
                forum: 'Fórum da Comarca de guarabira',
                end: 'Tertuliano da Costa',
                cidade: 'Esperança',
                estado: 'PB',
                cep: '58135000',
                condicao: 'Réu',
                solu: 'Absolvido',
            }

        ],
    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'CIRCULODEAMIZADEJUSTICA': [
                ...amizadeJus.data
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
                CÍRCULO DE AMIZADE (JUSTIÇA)
      </Typography>
            <Typography variant="body1" gutterBottom>
                {`Caso você já tenha sido INTIMADO ou PROCESSADO 
        pela justiça, preencha a tabela abaixo com os detalhes.`}
            </Typography>
            <br />
            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <MaterialTable
                title="INTIMAÇÕES E PROCESSOS"
                columns={amizadeJus.columns}
                data={amizadeJus.data}
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
                                setAmizadeJus(prevState => {
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
                                    setAmizadeJus(prevState => {
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
                                setAmizadeJus(prevState => {
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