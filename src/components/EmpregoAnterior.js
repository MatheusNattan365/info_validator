import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';


export default function EmpregoAnterior({next}) {
    const [open, setOpen] = React.useState(false);
    const [jobs, setJobs] = React.useState({
        columns: [
            { title: 'Empresa', field: 'nomeEmpresa' },
            { title: 'Phone', field: 'phone' },
            { title: 'Endereço', field: 'end', },
            { title: 'Bairro', field: 'bairro' },
            { title: 'Cidade', field: 'cidade' },
            { title: 'Estado', field: 'estado' },
            { title: 'Cep', field: 'cep' },
            { title: 'De', field: 'de', type: 'date' },
            { title: 'Até', field: 'ate', type: 'date' },
            { title: 'Seção', field: 'secao' },
            { title: 'Encarregado da Seção?', field: 'encaSecao' },
            { title: 'Salário', field: 'salario' },
            { title: 'Motivo da Demissão', field: 'demissao' },
            { title: 'Punições Sofridas e Motivos', field: 'puniMotivos' },
        ],
        data: [
            {
                nomeEmpresa: 'Alpargatas',
                phone: '3362-1842',
                end: 'Tertuliano da Costa',
                bairro: 'Centro',
                cidade: 'Esperança',
                estado: 'PB',
                cep: '58135000',
                de: '',
                ate: '',
                secao: '3',
                encaSecao: 'Sim',
                salario: '2500,00',
                demissao: '',
                puniMotivos: 'Nenhuma',
            }

        ],
    });

    const _handleIdentificationForm = async () => {
        const db = firebase.firestore();
        const ID = await sessionStorage.getItem('userID');

        await db.collection(`USERS`).doc(`${ID}`).update({
            'EMPREGOSANTERIORES': [
                ...jobs.data
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
                EMPREGO ANTERIOR
      </Typography>
            <Typography variant="body1" gutterBottom>
                {`Relacione, a partir das datas mais antigas, TODOS os lugares
        em que esteve empregado, quer tenha sido ou não registrado, bem como os 
        por conta própria e os 'bicos'. NÃO OMITA NENHUM! Forneça informações sobre o período de 
        inatividade entre os empregos.`}
            </Typography>
            <br />

            {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}

            <MaterialTable
                title="EMPREGOS ANTERIORES"
                columns={jobs.columns}
                data={jobs.data}
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
                                setJobs(prevState => {
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
                                    setJobs(prevState => {
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
                                setJobs(prevState => {
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