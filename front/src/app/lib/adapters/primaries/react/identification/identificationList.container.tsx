import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { IdentificationDI } from '../../../../configuration/react/identificationDI';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Identification from '../../../../domain/entities/Identification';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const classes = useStyles();

  const [identifications, setIdentifications] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('ASC');
  const [openEdit, setOpenEdit] = useState(false);
  const [identification, setIdentification] = useState(null);


  const reloadDatas = async () => {
      const result = await IdentificationDI.identificationHandler.Execute(sortBy, sortOrder);
      setIdentifications(result.succeed);
  }

  const updateIdentification = async (status:string) => {
    const result = await IdentificationDI.updateIdentificationHandler.Execute(identification.id, status);
    await reloadDatas();
    closeEditModal();
  }
  
  const editSortBy = (newSortBy:string) => {
    if (newSortBy === sortBy) {
      setSortBy(newSortBy);
      if (sortOrder === 'ASC') {
        setSortOrder('DESC');
      }else {
        setSortOrder('ASC');
      }
    } else {
      setSortBy(newSortBy);
      setSortOrder('DESC');
    }
  }

  const openEditModal = (identification:Identification) => {
    setIdentification(identification);
    setOpenEdit(true);
  }  
  
  const closeEditModal = () => {
    setOpenEdit(false);
    setIdentification(null);
  };

  useEffect(() => {
    reloadDatas();
  }, [sortBy, sortOrder]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => editSortBy('source')}>Source</TableCell>
            <TableCell onClick={() => editSortBy('createdAt')} align="right">Date</TableCell>
            <TableCell onClick={() => editSortBy('status')} align="right">Statut</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {identifications.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.source}
              </TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => openEditModal(row)} disabled={row.status !== 'WAITING'} aria-label="edit" color="primary">
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog
        open={openEdit}
        onClose={closeEditModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Modification de la demande d'identification"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Choisissez un des deux statuts suivant: 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => updateIdentification('REJECTED')} color="secondary">
            REJETTÉE
          </Button>
          <Button onClick={() => updateIdentification('ACCEPTED')} color="primary" autoFocus>
            ACCEPTÉE
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
}