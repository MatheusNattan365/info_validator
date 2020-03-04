import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function HistoricoAcademico({next}) {
    const [open, setOpen] = React.useState(false);
    const [curriculoEscolar, setCurriculoEscolar] = React.useState({
        columns: [
            { title: 'De', field: 'de', type: 'date' },
            { title: 'Até', field: 'ate', type: 'date' },
            { title: 'Curso', field: 'cursos' },
            { title: 'Séries', field: 'series' },
            { title: 'Escola', field: 'escola' },
            { title: 'Cidade', field: 'cidade' },
            { title: 'Endereço', field: 'end', },
            { title: 'Bairro', field: 'bairro' },
            { title: 'Estado', field: 'estado' },
            { title: 'Cep', field: 'cep' },
            { title: 'Expulso', field: 'expulso' },
            { title: 'Motivo da Expulsão', field: 'motivoExp' },

        ],
        data: [
            {
                de: '',
                ate: '',
                cursos: 'Ensino Médio',
                series: '1°, 2° e 3°',
                escola: 'CEMOL',
                end: 'Tertuliano da Costa',
                cidade: 'Esperança',
                bairro: 'Centro',
                cep: '58135000',
                expulso: 'Não',
                motivoExp: '',
            }

        ],
    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'CURRICULOESCOLAR': [
                ...curriculoEscolar.data
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
                HISTÓRICO ACADÊMICO
      </Typography>
            <Typography variant="body1" gutterBottom>
                {`Relacione todas as escola e cursos que frequentou.`}
            </Typography>
            <br />
            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
            <MaterialTable
                title="HISTÓRICO ACADÊMICO"
                columns={curriculoEscolar.columns}
                data={curriculoEscolar.data}
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
                                setCurriculoEscolar(prevState => {
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
                                    setCurriculoEscolar(prevState => {
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
                                setCurriculoEscolar(prevState => {
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