import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import NoteDrawer from './NoteDrawer';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  date: {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


class CreateNoteButton extends React.Component {
  state = {
    AnchorEl: null
  }

  handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleMenuItemClick = (event) => {
    this.setState({anchorEl: null});
    this.props.openDrawer({note_type: event.target.value, additional_data: {}});
  }

  render() {
    const { anchorEl } = this.state;
    const { noteTypes } = this.props;
    return(
      <>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          className="btn-w-md"
          onClick={this.handleClick}>
          新增會議紀錄
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {Object.keys(noteTypes).map( noteTypeId => (
            <MenuItem key={noteTypeId} value={noteTypeId} onClick={this.handleMenuItemClick}>
              {noteTypes[noteTypeId]}
            </MenuItem>
          ))}
        </Menu>

      </>
    )
  }
};


class NoteList extends React.Component {
  state = {
    notes: [],
    mode: 'create',
    selectedNote: {},
    openNoteDrawer: false,
    handlers: {},
    config: {note_type: {
      "0":"空白筆記",
      "1":"一般筆記",
      "2":"遞送建議書",
      "3":"保險簽約",
      "4":"保險理賠"
    }}
  }

  componentDidMount() {
    this.fetchNotes(this.props.clientId);
  }

  fetchNotes = (clientId) => {
    fetch("https://api.cooby.co/clients/" + clientId + "/notes/", {
      "method": "GET",
      mode: 'cors',
      "headers": {
        'Content-Type': 'application/json',
        "Authorization": "BEARER PS3eSI8zNXIa4m_bfc2P8Qh4XbQtgbX2bOz9qphHcKMinFmMtGpPkOtso1gKJDTvj0ZJmn9PzNEirnVPVcdlevTleq2mUuVPgsW0SnKR5GaQqrH-qmtwtTWkr77Mja0wzOATEevMPLuNWWh9e7aiP2Tqkw8Hc69BA41nB2ozrhg"
      }
    }).then(res => res.json())
      .then(
        (result) => {
          this.setState({
            notes: result.notes
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  };

  openDrawer = (mode) => (selectedNote) => {
    console.log(selectedNote);
    console.log(mode);
    this.setState({openNoteDrawer: true, selectedNote: selectedNote, mode: mode});
  }

  handleNoteClick = (selectedNote) => (event) => {
    console.log(selectedNote);
    this.openDrawer('edit')(selectedNote);
  }

  closeDrawer = () => () => {
    this.setState({openNoteDrawer: false});
  }


  render() {
    const { notes, selectedNote, mode, openNoteDrawer, handlers, config } = this.state;
    const { classes } = this.props;


    return (
      <Fragment>
        <CreateNoteButton noteTypes={config.note_type} openDrawer={this.openDrawer('create')}  />
        <div className="divider" />
        <div className={classes.root}>

          <NoteDrawer
            isOpen={openNoteDrawer}
            closeDrawer={this.closeDrawer}
            mode={mode}
            note={selectedNote}
            handlers={handlers}
            config={config} />
            <Paper style={{ width: '80%' }}>
              <List>
              {
                notes.map((note, index) => (
                    <ListItem>
                      <ListItemText
                        key={index}
                        primary={<Grid container justify="space-between">
                          <Typography
                            inline
                            align='left'
                            color="textPrimary"
                            variant="body1">
                            {note.title}
                          </Typography>
                          <Typography
                            inline
                            align='right'
                            variant='body1'
                            color='textSecondary'>
                            {note.date}
                          </Typography>
                        </Grid>}
                        secondary={<Typography noWrap='true'>{note.appendix}</Typography>}
                      />
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="view" onClick={this.handleNoteClick(note)}>
                          <VisibilityIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                ))
              }
              </List>
            </Paper>
        </div>
    </Fragment>
    );
  }
}

NoteList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const StyledNoteList = withStyles(styles)(NoteList);

export default StyledNoteList;
