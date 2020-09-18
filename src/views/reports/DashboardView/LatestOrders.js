import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));
const handlePrice = price => {
  if (price == null) return '';
  let num = Number(price).toFixed(0);
  num = num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  return num;
};
const LatestOrders = ({ className, ...rest }) => {
  const classes = useStyles();
  const [orders, setOrders] = useState(null);
  const [users, setUsers] = useState(null);
  const [hover, setHover] = useState(false);
  const fetchData = async () => {
    const res = await axios.get('http://18.232.124.209/api/loan-bank');
    if (res.status) {
      setOrders(res.data.data.loan);
      setUsers(res.data.data.user);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (!users || !orders) {
    return null;
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
      style={{ boxShadow: '4px 1px 10px rgba(0,0,0, 0.1)', marginTop: '30px' }}
    >
      <CardHeader title="Danh sách yêu cầu" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Số điện thoại</TableCell>
                <TableCell>Khách hàng</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Ngày yêu cầu
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell style ={{textAlign: 'center'}}>Điểm tín dụng</TableCell>
                <TableCell>Số tiền</TableCell>
                <TableCell style={{textAlign: "center"}}>Trạng thái</TableCell>
                <TableCell>Lý do vay</TableCell>
                <TableCell>Lãi suất</TableCell>
                <TableCell>Kỳ hạn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow hover key={order.id}>
                  <TableCell>{users[index].phone}</TableCell>
                  <TableCell>{users[index].name}</TableCell>
                  <TableCell>
                    {moment(order.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell style ={{textAlign: 'center', color: '#f44336', fontSize: '17px', fontWeight: '500'}}>
                    {users[index].point}
                  </TableCell>
                  <TableCell>{handlePrice(order.money)}</TableCell>
                  <TableCell>
                    {order.status === 'Chờ duyệt' && (
                      <div
                        style={{
                          backgroundColor:
                            'rgba(244, 67, 54, 0.06)',
                          color: '#f44336',
                          cursor: 'pointer',
                          textAlign: 'center',
                          borderRadius: '3px',
                          
                        }}
                        onClick={async () => {
                          let bodyFormData = new FormData();
                          bodyFormData.append('loanId', order._id);
                          const res = await axios({
                            method: 'patch',
                            url: 'http://18.232.124.209/api/loan-bank',
                            data: bodyFormData,
                            headers: { 'Content-Type': 'multipart/form-data' }
                          });
                          console.log(res);
                          window.location.reload();
                        }}
                      >
                        {' '}
                        {order.status}
                      </div>
                    )}
                    {order.status === 'Đã duyệt' && (
                      <div
                        style={{
                          backgroundColor:
                            'rgba(76, 175, 80, 0.08)',
                          color: '#4caf50',
                          cursor: 'pointer',
                          textAlign: "center",
                          borderRadius: '3px'
                        }}
                      >
                        {' '}
                        {order.status}
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{order.reason}</TableCell>
                  <TableCell>{order.listLoan[0].percentRate} %</TableCell>
                  <TableCell>{order.listLoan[0].period} Tháng</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;
