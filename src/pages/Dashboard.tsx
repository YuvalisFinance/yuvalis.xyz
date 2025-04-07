import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { ExpenseStatus } from '../types/expense';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const expenses = useSelector((state: RootState) => state.expenses.expenses);

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = expenses.filter(
    (expense) => expense.status === ExpenseStatus.SUBMITTED
  ).length;
  const approvedExpenses = expenses.filter(
    (expense) => expense.status === ExpenseStatus.APPROVED
  ).length;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Summary Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Expenses
              </Typography>
              <Typography variant="h5">
                ${totalExpenses.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Pending Expenses
              </Typography>
              <Typography variant="h5">{pendingExpenses}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Approved Expenses
              </Typography>
              <Typography variant="h5">{approvedExpenses}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            {expenses.slice(0, 5).map((expense) => (
              <Box
                key={expense.id}
                sx={{
                  py: 1,
                  borderBottom: `1px solid ${theme.palette.divider}`,
                }}
              >
                <Typography variant="body1">
                  {expense.description} - ${expense.amount}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {new Date(expense.date).toLocaleDateString()} -{' '}
                  {expense.category}
                </Typography>
              </Box>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 