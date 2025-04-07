import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../app/store';
import { ExpenseCategory, ExpenseStatus } from '../types/expense';
import { setFilters } from '../features/expenses/expenseSlice';

const Expenses: React.FC = () => {
  const dispatch = useDispatch();
  const { expenses, filters } = useSelector((state: RootState) => state.expenses);
  const [showFilters, setShowFilters] = useState(false);

  const handleFilterChange = (field: string, value: any) => {
    dispatch(setFilters({ ...filters, [field]: value }));
  };

  const filteredExpenses = expenses.filter((expense) => {
    if (filters.category && expense.category !== filters.category) return false;
    if (filters.status && expense.status !== filters.status) return false;
    if (filters.minAmount && expense.amount < filters.minAmount) return false;
    if (filters.maxAmount && expense.amount > filters.maxAmount) return false;
    return true;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Expenses</Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
        >
          Add Expense
        </Button>
      </Box>

      <Button
        variant="outlined"
        onClick={() => setShowFilters(!showFilters)}
        sx={{ mb: 2 }}
      >
        {showFilters ? 'Hide Filters' : 'Show Filters'}
      </Button>

      {showFilters && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label="Category"
                value={filters.category || ''}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {Object.values(ExpenseCategory).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label="Status"
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <MenuItem value="">All Statuses</MenuItem>
                {Object.values(ExpenseStatus).map((status) => (
                  <MenuItem key={status} value={status}>
                    {status}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Min Amount"
                value={filters.minAmount || ''}
                onChange={(e) =>
                  handleFilterChange('minAmount', Number(e.target.value))
                }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                type="number"
                label="Max Amount"
                value={filters.maxAmount || ''}
                onChange={(e) =>
                  handleFilterChange('maxAmount', Number(e.target.value))
                }
              />
            </Grid>
          </Grid>
        </Paper>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>
                  {new Date(expense.date).toLocaleDateString()}
                </TableCell>
                <TableCell>{expense.description}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>
                  {expense.currency} {expense.amount.toLocaleString()}
                </TableCell>
                <TableCell>{expense.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Expenses; 