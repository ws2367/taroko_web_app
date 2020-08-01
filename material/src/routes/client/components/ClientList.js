import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
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
import {requestHeaders} from 'auth/Auth';

function getClientData(client, field) {
  if (field === 'num_of_tasks') {
    return client.profile.tasks && client.profile.tasks.length;
  } else {
    return (field in client) ? client[field] : (field in client.profile ? client.profile[field] : null);
  }

}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => ( getClientData(b, orderBy) < getClientData(a, orderBy) ? -1 : 1)
    : (a, b) => ( getClientData(a, orderBy) < getClientData(b, orderBy) ? -1 : 1);
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


class ClientList extends React.Component {
  url = "https://api.cooby.co/clients/";

  constructor(props) {
    super(props);
    console.log(requestHeaders());
    // handlers
    const createClient = (profile) => {
      fetch(this.url, {
        "method": "POST",
        mode: 'cors',
        headers: requestHeaders(),
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
      filters: [],
      // app data
      clients: [],
      filteredClients: [],
      config: {},

      //handlers
      handlers: {createClient}
    };
  }


  componentDidMount() {
    fetch(this.url, {
      "method": "GET",
      mode: 'cors',
      headers: requestHeaders()
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
      this.setState(state => ({ selected: state.clients.map(n => n.profile.id) }));
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

  handleDeleteClients = (event) => {

    var promises = [];
    this.state.selected.forEach(clientId => {
      let endpoint = this.url + clientId;
      promises.push(new Promise((resolve, reject) => {
        fetch(endpoint, {
          method: "DELETE",
          mode: 'cors',
          headers: requestHeaders()
        }).then(res => {
          if (res.ok) {
            resolve(clientId);
          } else {
            res.json().then(error => {
              console.log(error);
              reject(error);
            });
            }
          });
      }));
    });

    Promise.all(promises).then((clientIds) => {
      let clients = this.state.clients;
      let selected = this.state.selected;
      clientIds.forEach((clientId) => {
        let index = clients.findIndex(c => c.profile.id === clientId);
        clients.splice(index, 1);

        let selectedIndex = selected.indexOf(clientId);
        selected.splice(selectedIndex, 1);
      });

      this.setState({
        clients: clients,
        selected: selected
      });
    });
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

  clientFilterMatch = (tagIds, client) => {
    return tagIds.reduce((foundMatch, tagId) => {
      return foundMatch || client.profile.tags.includes(tagId);
    }, false);
  }

  handleFilterChange = (event) => {
    let tagIds = event.target.value;
    if (event.target.value.length > 0) {
      let filteredClients = this.state.unfilteredClients.filter(client => this.clientFilterMatch(tagIds, client));
      console.log(filteredClients);
      this.setState({
        clients: filteredClients
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
    const { clients, order, orderBy, selected, rowsPerPage, page, filters, config, handlers, openClientDrawer } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, clients.length - page * rowsPerPage);
    console.log(clients[0]);
    return (
      <>
        <Button variant="contained" color="primary" className="btn-w-md" onClick={this.toggleClientDrawer(true)}>
          新增客戶</Button>
        <Paper className={classes.root}>
          <ClientDrawer isOpen={openClientDrawer} toggleClientDrawer={this.toggleClientDrawer} handlers={handlers} />
          <EnhancedTableToolbar
            numSelected={selected.length}
            filters={filters}
            config={config}
            handleDeleteClients={this.handleDeleteClients}
            handleQueryChange={this.handleQueryChange}
            handleFilterChange={this.handleFilterChange} />
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
                        <TableCell>
                          <Tag tags={n.profile.tags} config={config} handlers={handlers} /></TableCell>
                        <TableCell>{n.profile.company}</TableCell>
                        <TableCell>{config.income[n.profile.income]}</TableCell>
                        <TableCell>{n.profile.tasks.length}</TableCell>
                        <TableCell>{n.num_of_notes}</TableCell>
                        <TableCell>{n.note_summary}</TableCell>
                        <TableCell>{n.profile.updated.substring(0, 10)}</TableCell>
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

ClientList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const StyledClientList = withStyles(styles)(ClientList);



export default withRouter(StyledClientList);
