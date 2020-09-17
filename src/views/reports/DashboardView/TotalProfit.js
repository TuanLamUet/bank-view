import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const TotalProfit = ({ className, amount, ...rest }) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} 
    style={{boxShadow: '3px 3px 10px rgba(0,0,0, 0.08)'}}
    
    {...rest}>
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TỔNG GIÁ TRỊ
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {amount}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar} style={{boxShadow: '0 0 6px rgba(0, 14, 168, 0.6)'}}>
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

TotalProfit.propTypes = {
  className: PropTypes.string
};

export default TotalProfit;
