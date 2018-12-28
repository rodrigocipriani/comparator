import React from "react";
import PropTypes from "prop-types";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import classes from './ComparatorComponent.module.css';

function ComparatorComponent({ items }) {

  let attributes = [];
  items.forEach(item => {
    for (var key in item.attributes) {
      if (!attributes.includes(key)) {
        attributes.push(key);
      }
    };
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>#</TableCell>
                {items.map((row, key) => {
                  return (
                    <TableCell className={classes.tableHeaderCell} key={key}>{row.title}</TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.attributesNames} scope="row">
                  Descrição
                </TableCell>
                {
                  items.map((item, itemsKey) => {
                    return (
                      <TableCell key={`${itemsKey}`} scope="row">
                        {item.description}
                      </TableCell>
                    );
                  })
                }
              </TableRow>
              {
                attributes.map((attCol, key) => {
                  return (
                    <TableRow key={`${key}`}>
                      <TableCell className={classes.attributesNames} scope="row">
                        {attCol}
                      </TableCell>
                      {
                        items.map((item, itemsKey) => {
                          return (
                            <TableCell key={`${key}_${itemsKey}`} scope="row">
                              {() => {
                                const val = item.attributes[attCol];
                                return val;
                              }}
                              {/* {item.attributes[attCol]} */}
                            </TableCell>
                          );
                        })
                      }
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  );
}

ComparatorComponent.propTypes = {
  items: PropTypes.any
};

export default ComparatorComponent;
