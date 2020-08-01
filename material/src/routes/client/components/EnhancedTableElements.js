import React from 'react';
import MaterialIcon from 'components/MaterialIcon';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/core/styles';
import ClientListFilters from './ClientListFilters';
import TableHead from '@material-ui/core/TableHead';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import { Grid } from '@material-ui/core';
import { lighten } from '@material-ui/core/styles/colorManipulator';

const columnData = [
  { id: 'name', numeric: false, disablePadding: true, label: '名字' },
  { id: 'tags', numeric: false, disablePadding: false, label: '標籤' },
  { id: 'company', numeric: false, disablePadding: false, label: '任職公司' },
  { id: 'income', numeric: false, disablePadding: false, label: '收入' },
  { id: 'num_of_tasks', numeric: false, disablePadding: false, label: '待辦數' },
  { id: 'num_of_notes', numeric: false, disablePadding: false, label: '筆記數' },
  { id: 'note_summary', numeric: false, disablePadding: false, label: '筆記摘要' },
  { id: 'updated', numeric: false, disablePadding: false, label: '更新時間' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="排序"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    minWidth: 800
  },
  title: {
    flex: '0 0 auto',
  },
  searchField: {
    width: 150
  }
});

let EnhancedTableToolbar = props => {
  const { classes, numSelected, filters, config, handleDeleteClients, handleQueryChange, handleFilterChange } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} 個已選擇
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            客戶列表
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="刪除">
            <IconButton aria-label="Delete">
              <DeleteIcon onClick={handleDeleteClients}/>
            </IconButton>
          </Tooltip>
        ) : (
            <Grid container spacing={2} direction="row">
              <Grid item xs={6}>
                <ClientListFilters
                  className={classes.filterField}
                  id="tag_filter"
                  tags={filters}
                  tagOptions={config.tags || []}
                  onChange={handleFilterChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="search"
                  className={classes.searchField}
                  id="search-bar"
                  variant="outlined"
                  placeholder="搜尋客戶"
                  onChange={handleQueryChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

export {EnhancedTableHead, EnhancedTableToolbar};
