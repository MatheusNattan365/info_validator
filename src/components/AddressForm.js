import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';

import firebase from '../services/firebaseConfig';

import Dialog from './Dialog';

export default function Address({ next }) {
  const [open, setOpen] = React.useState(false);
  const [address, setAddress] = React.useState({
    columns: [
      { title: 'De', field: 'de', type: 'date' },
      { title: 'Até', field: 'ate', type: 'date' },
      { title: 'Endereço', field: 'end', },
      { title: 'N°', field: 'rua_nmr', },
      { title: 'Fica próximo a?', field: 'fpa' },
      { title: 'Bairro', field: 'bairro' },
      { title: 'Cidade', field: 'cidade' },
      { title: 'Estado', field: 'estado' },
      { title: 'Cep', field: 'cep' },
      { title: 'Com quem residiu?', field: 'cqr' },
    ],
    data: [
      {
        de: '',
        ate: '',
        end: 'Tertuliano da Costa',
        rua_nmr: 46,
        fpa: 'Forúm',
        bairro: 'Centro',
        cidade: 'Esperança',
        estado: 'PB',
        cep: '58135000',
        cqr: 'Pais e irmãos',
      }

    ],
  });

  const _handleIdentificationForm = async () => {
    const db = firebase.firestore();
    const ID = await sessionStorage.getItem('userID');

    await db.collection(`USERS`).doc(`${ID}`).update({
      'RESIDENCIAS': [
        ...address.data
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
        Dados Residenciais
      </Typography>
      <Typography variant="body1" gutterBottom>
        {`Declarar em ordem cronológica todos os 
        lugares onde residiu e reside nos últimos 10 anos.`}
      </Typography>

      {open === true ? <Dialog openDialog={true} callback={_handleIdentificationForm}/> : null}
      <MaterialTable
        title="RESIDÊNCIAS"
        columns={address.columns}
        data={address.data}
        options={{
          search: false,
        }
        }
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setAddress(prevState => {
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
                  setAddress(prevState => {
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
                setAddress(prevState => {
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