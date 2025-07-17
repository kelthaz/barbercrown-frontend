import React, { useState, useRef, useLayoutEffect } from 'react';
import { Users } from '../types/users';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, TablePagination, useMediaQuery, useTheme, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  users: Users[];
}

export default function UsersTable({ users }: Props) {
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
    Activo: { backgroundColor: '#fffacd', color: 'rgba(3, 174, 40, 1)' },
    Inactivo: { backgroundColor: '#e0f2f7', color: '#d32f2f' }
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
  }, [isMobile, users]);

  const visibleColumnsMobile = ['Cliente', 'Fecha', 'Hora', 'Funciones'];
  const allColumns = ['NOMBRE DE USUARIO', 'CORREO', 'PERFIL', 'ESTADO', 'ACCIONES'];

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
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((users) => (
                <TableRow key={users.id}>
                  <TableCell component="th" scope="row">
                    {users.userName}
                  </TableCell>
                  <TableCell align="left">{users.email}</TableCell>
                  <TableCell align="left">{users.profile}</TableCell>
                  <TableCell align="left">
                    <Chip
                      label={users.status}
                      sx={{ ...statusColorMap[users.status], fontSize: '0.8rem', fontWeight: 'medium' }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button size="small" color="primary" aria-label="editar" sx={{ mr: 0 }}>
                      <EditIcon />
                    </Button>
                    <Button size="small" color="error" aria-label="cancelar">
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
        count={users.length}
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