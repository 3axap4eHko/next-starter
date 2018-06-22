import React, { Component } from 'react';
import {} from 'prop-types';
import Helmet from 'react-helmet';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Layout from '../components/Layout';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

let id = 0;
function createData(name, calories, fat, carbs, protein) {
  id += 1;
  return { id, name, calories, fat, carbs, protein };
}

const data = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

@withStyles(styles)
export default class Posts extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Layout>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <CustomTableCell>Dessert (100g serving)</CustomTableCell>
              <CustomTableCell numeric>Calories</CustomTableCell>
              <CustomTableCell numeric>Fat (g)</CustomTableCell>
              <CustomTableCell numeric>Carbs (g)</CustomTableCell>
              <CustomTableCell numeric>Protein (g)</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(n => {
              return (
                <TableRow className={classes.row} key={n.id}>
                  <CustomTableCell component="th" scope="row">
                    {n.name}
                  </CustomTableCell>
                  <CustomTableCell numeric>{n.calories}</CustomTableCell>
                  <CustomTableCell numeric>{n.fat}</CustomTableCell>
                  <CustomTableCell numeric>{n.carbs}</CustomTableCell>
                  <CustomTableCell numeric>{n.protein}</CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Helmet>
          <title>Posts</title>
        </Helmet>
      </Layout>
    );
  }
}
