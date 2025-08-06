import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Roles } from '../types/roles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, TablePagination, useMediaQuery, useTheme, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchRoles } from "../services/roleService";

type RolesTableProps = {
    roles: Roles[];
    onCancel: (appointment: Roles) => void;
};


export default function RolesTable({ roles, onCancel }: RolesTableProps) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const headerCellsRef = useRef<(HTMLTableCellElement | null)[]>([]);
    const [loading, setLoading] = useState(true);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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


    useEffect(() => {
        const loadRoles = async () => {
            try {
                const data = await fetchRoles();
            } catch (error) {
                console.error("Error fetching roles:", error);
            } finally {
                setLoading(false);
            }
        };

        loadRoles();
    }, []);


    const allColumns = ['Id', 'Rol', 'Acciones'];

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
                        {roles
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell align="left">{role.id}</TableCell>
                                    <TableCell align="left">{role.name}</TableCell>
                                    <TableCell align="left" sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Button size="small" color="primary" aria-label="editar" sx={{ mr: 0 }}>
                                            <EditIcon />
                                        </Button>
                                        <Button size="small" color="error" aria-label="cancelar" onClick={() => onCancel(role)}>
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
                count={roles.length}
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