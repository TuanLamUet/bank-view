import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const TasksProgress = ({ className, request, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      style={{
        boxShadow: '3px 3px 10px rgba(0,0,0, 0.08)'
      }}
      {...rest}
    >
      <CardContent>
        <Grid container justify="space-between" spacing={3}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              YÊU CẦU VAY{' '}
            </Typography>{' '}
            <Typography color="textPrimary" variant="h3">
              {' '}
              {request}{' '}
            </Typography>{' '}
          </Grid>{' '}
          <Grid item>
            <Avatar
              className={classes.avatar}
              style={{
                boxShadow: '0 0 6px rgba(255, 149, 36, 0.6)',
              }}
            >
              <InsertChartIcon />
            </Avatar>{' '}
          </Grid>{' '}
        </Grid>{' '}
      </CardContent>{' '}
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
