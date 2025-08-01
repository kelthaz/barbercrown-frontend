import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Users } from '../types/users';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, TablePagination, useMediaQuery, useTheme, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchUsers } from "../services/userService";

type UsersTableProps = {
  users: Users[];
    onEdit: (user: Users) => void;
};

export default function UsersTable({ users, onEdit }: UsersTableProps) {
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
    Activo: { backgroundColor: '#e0f2f7', color: 'rgba(13, 72, 249, 1)' },
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
  }, [isMobile]);


  const allColumns = ['NOMBRE USUARIO', 'CORREO', 'TELÉFONO', 'ROL', 'ESTADO', 'ACCIONES'];

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
                    sx={{ fontWeight: 'bold' }}
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
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.phone}</TableCell>
                  <TableCell align="left">{user.rol.name}</TableCell>
                  <TableCell align="left">
                    <Chip
                      label={user.estado === 0 ? 'Inactivo' : 'Activo'}
                      sx={{ ...statusColorMap[user.estado === 0 ? 'Inactivo' : 'Activo'], fontSize: '0.8rem', fontWeight: 'medium' }}
                    />
                  </TableCell>
                  <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                    <Button size="small" color="primary" aria-label="editar" sx={{ mr: 0 }} onClick={() => onEdit(user)}>
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