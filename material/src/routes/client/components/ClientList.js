import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import {EnhancedTableHead, EnhancedTableToolbar} from './EnhancedTableElements';
import ClientDrawer from './ClientDrawer';
import Tag from './Tag';
import AUTH from 'auth/Auth';

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const TEST_TOKEN = "PS3eSI8zNXIa4m_bfc2P8Qh4XbQtgbX2bOz9qphHcKMinFmMtGpPkOtso1gKJDTvj0ZJmn9PzNEirnVPVcdlevTleq2mUuVPgsW0SnKR5GaQqrH-qmtwtTWkr77Mja0wzOATEevMPLuNWWh9e7aiP2Tqkw8Hc69BA41nB2ozrhg";


class EnhancedTable extends React.Component {

  headers = {
    'Content-Type': 'application/json',
    "Authorization": "BEARER " + (AUTH().token ? AUTH().token : TEST_TOKEN )
  }

  constructor(props) {
    super(props);
    console.log(this.headers);
    // handlers
    const createClient = (profile) => {
      fetch("https://api.cooby.co/clients/", {
        "method": "POST",
        mode: 'cors',
        headers: this.headers,
        body: JSON.stringify(profile)
      }).then(res => res.json())
        .then(
          (result) => {
            console.log(result);
            this.setState({
              clients: this.state.clients.concat({
                note_summary: result.note_summary,
                profile: {
                  ...profile,
                  id: result.id
                }
              })
            });
          });
    };

    const removeTagFromClient = (tag, client) => {

    };

    const filterByTag = (tag) => {

    };

    // state variables
    this.state = {
      openClientDrawer: false,
      // ui state
      order: 'asc',
      orderBy: 'name',
      selected: [],
      page: 0,
      rowsPerPage: 10,
      error: null,
      isLoaded: false,
      // app data
      clients: [],
      filteredClients: [],
      config: {},

      //handlers
      handlers: {
          createClient,
          removeTagFromClient,
          filterByTag}
    };
  }


  componentDidMount() {
    fetch("https://api.cooby.co/clients/", {
      "method": "GET",
      mode: 'cors',
      headers: this.headers
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            clients: result.clients,
            unfilteredClients: result.clients,
            config: result.config
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  toggleClientDrawer = (state) => () => {
    this.setState({openClientDrawer: state});
  }


  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState(state => ({ selected: state.clients.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  clientSearchMatch = (query, client) => {
    let incomeConfig = this.state.config.income || {};
    // search name, company, note_summary and income
    let searchFields = [client.profile.name, client.profile.company, client.note_summary, incomeConfig[String(client.profile.income)]];
    return searchFields.reduce((sum, value) => (
        sum || (value && value.toLowerCase().includes(query.toLowerCase())) // make sure value isn't null; otherwise .includes breaks.
    ), false);
  }

  handleQueryChange = (event) => {
    console.log(event.target.value);
    if (event.target.value.length > 0) {
      this.setState({
        clients: this.state.unfilteredClients.filter(client => this.clientSearchMatch(event.target.value, client))
      });
    } else {
      this.setState({
        clients: this.state.unfilteredClients
      });
    }

  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { clients, order, orderBy, selected, rowsPerPage, page, config, handlers, openClientDrawer } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, clients.length - page * rowsPerPage);

    return (
      <>
        <Button variant="contained" color="primary" className="btn-w-md" onClick={this.toggleClientDrawer(true)}>
          新增客戶</Button>
        <div className="divider" />
        <Paper className={classes.root}>
          <ClientDrawer isOpen={openClientDrawer} toggleClientDrawer={this.toggleClientDrawer} handlers={handlers} />
          <EnhancedTableToolbar numSelected={selected.length} handleQueryChange={this.handleQueryChange} />
          <div className={classes.tableWrapper}>
            <Table className={classes.table} aria-labelledby="tableTitle">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={clients.length}
              />
              <TableBody>
                {clients
                  .sort(getSorting(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.profile.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.profile.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.profile.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                        <Link to={{
                            pathname: "/app/client/" + n.profile.id,
                            state: {
                              client: n,
                              config: config,
                              handlers: handlers
                            }
                          }} className="link-cta link-animated-hover link-hover-v1 text-primary">{n.profile.name}
                        </Link></TableCell>
                        <TableCell><Tag tags={n.profile.tags} config={config} handlers={handlers} /></TableCell>
                        <TableCell>{n.profile.company}</TableCell>
                        <TableCell>{config.income[n.profile.income]}</TableCell>
                        <TableCell>{n.note_summary}</TableCell>
                        <TableCell>{n.profile.updated}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <TablePagination
            component="div"
            count={clients.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage="每頁數目"
            backIconButtonProps={{
              'aria-label': '上一頁',
            }}
            nextIconButtonProps={{
              'aria-label': '下一頁',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const EnhancedTable1 = withStyles(styles)(EnhancedTable);



export default EnhancedTable1;
