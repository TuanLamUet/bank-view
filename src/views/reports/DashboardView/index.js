import React, { useState, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Budget from './Budget';
import LatestOrders from './LatestOrders';
// import LatestProducts from './LatestProducts';
// import Sales from './Sales';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
// import TrafficByDevice from './TrafficByDevice';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const handlePrice = price => {
  if (price == null) return '';
  let num = Number(price).toFixed(0);
  num = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return num;
};
const amounts = prices => {
  return prices.reduce((a, b) => a * 1 + b.money * 1, 0);
};

const customers = customer => {
  return [new Set(customer)].length;
};
const Dashboard = () => {
  const classes = useStyles();

  const [totalRequest, setTotalRequest] = useState(null);
  const [totalCustomer, setTotalCustomer] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);

  const fetchData = async () => {
    const res = await axios.get('http://18.232.124.209/api/loan-bank');
    if (res.status) {
      const price = res.data.data.loan;
      const allRequest = res.data.data.loan.length;
      const allCustomer = res.data.data.user;
      const totalAmount = amounts(price);
      setTotalCustomer(customers(allCustomer));
      setTotalRequest(allRequest);
      setTotalAmount(handlePrice(totalAmount));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TasksProgress request={totalRequest} />{' '}
          </Grid>{' '}
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalCustomers customer={totalCustomer} />{' '}
          </Grid>{' '}
          <Grid item lg={4} sm={4} xl={4} xs={12}>
            <TotalProfit amount={totalAmount} />{' '}
          </Grid>{' '}
          <Grid item lg={12} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>{' '}
        </Grid>{' '}
      </Container>{' '}
    </Page>
  );
};

export default Dashboard;
