import React, { useState, useRef, useLayoutEffect } from 'react';
import { Appointment } from '../types/appointment';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, TablePagination, useMediaQuery, useTheme, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  appointments: Appointment[];
  onEdit: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
}

export default function AppointmentTable({ appointments, onEdit, onCancel }: Props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const headerCellsRef = useRef<(HTMLTableCellElement | null)[]>([]);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const statusColorMap = {
    pending: { backgroundColor: '#fffacd', color: '#b8860b' },
    confirmed: { backgroundColor: '#e0f2f7', color: '#1976d2' },
    cancelled: { backgroundColor: '#ffebee', color: '#d32f2f' },
  };

  useLayoutEffect(() => {
    if (!isMobile && headerCellsRef.current.length > 0) {
      const headerWidths = headerCellsRef.current.map(cell => cell?.offsetWidth);
      const bodyRows = document.querySelectorAll('#appointment-table-body tr');
      bodyRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach((cell, index) => {
          if (headerWidths[index]) {
            cell.style.width = `${headerWidths[index]}px`;
          }
        });
      });
    } else if (isMobile) {
      const bodyRows = document.querySelectorAll('#appointment-table-body tr');
      bodyRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        cells.forEach(cell => {
          cell.style.width = 'auto';
        });
      });
    }
  }, [isMobile, appointments]);

  const allColumns = ['CLIENTE', 'BARBERO', 'FECHA', 'HORA', 'SERVICIO', 'ESTADO', 'ACCIONES'];

  return (
    <Paper sx={{ width: '100%', mx: 'auto', mt: 2 }}>
      <TableContainer sx={{ maxWidth: isMobile ? 350 : '100%', overflowX: isMobile ? 'auto' : 'hidden' }}>
        <Table aria-label="sticky table" sx={{ minWidth: isMobile ? '600px' : 'auto', width: '100%', tableLayout: 'auto' }}>
          <TableHead>
            <TableRow>
              {allColumns
                .map((column) => (
                  <TableCell
                    key={column}
                    align={column === 'Cliente' ? 'left' : 'left'}
                    ref={(el: HTMLTableCellElement | null) => {
                      headerCellsRef.current[allColumns.indexOf(column)] = el;
                    }}
                  >
                    {column}
                  </TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody id="appointment-table-body">
            {appointments
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell component="th" scope="row">
                    {appointment.client}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {appointment.barberName}
                  </TableCell>
                  <TableCell>{new Date(appointment.date).toISOString().split('T')[0]}</TableCell>
                  <TableCell align="left">{appointment.time}</TableCell>
                  <TableCell align="left">{appointment.service}</TableCell>
                  <TableCell align="left">
                    <Chip
                      label={appointment.status}
                      sx={{ ...statusColorMap[appointment.status], fontSize: '0.8rem', fontWeight: 'medium' }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button size="small" color="primary" aria-label="editar" sx={{ mr: 0 }} onClick={() => onEdit(appointment)}>
                      <EditIcon />
                    </Button>
                    <Button size="small" color="error" aria-label="cancelar" onClick={() => onCancel(appointment)}>
                      <DeleteIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={appointments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        labelDisplayedRows={({ from, to, count }) => `Mostrando ${from}-${to} de ${count}`}
      />
    </Paper>
  );
}