import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function FamilyFormAscen({next}) {
    const [open, setOpen] = React.useState(false);
    const [croqui, setCroqui] = React.useState({
        columns: [
            { title: 'Estado', field: 'estado' },
            { title: 'Cidade', field: 'cidade' },
            { title: 'Localização', field: 'geolocalization' },

        ],
        data: [
            {
                estado: 'PB',
                cidade: 'Esperança',
                geolocalization: '-7.028204, -35.861952',
            }

        ],
    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'DADOSORIENTADOS': [
                ...croqui.data
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
                DADOS ORIENTADOS
        </Typography>

            <Typography variant="body1">
                {`Dê os seguintes dados sobre o endereço de sua residência.`}
            </Typography>
            <br />
            <Typography variant="body2">
                {`Copie o link do GoogleMaps logo abaixo e cole em uma nova tab do seu navegador
                 para que vc consiga as coordenadas de uma maneira mais fácil.`}
            </Typography>
            <br />
            <Typography align="center" variant="subtitle2">
                {`https://www.google.com.br/maps`}
            </Typography>
            <br />
            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}

            <MaterialTable
                title="CORDENADAS TABLE"
                columns={croqui.columns}
                data={croqui.data}
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
                                setCroqui(prevState => {
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
                                    setCroqui(prevState => {
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
                                setCroqui(prevState => {
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