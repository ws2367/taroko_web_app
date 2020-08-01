import React from 'react';
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
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import {requestHeaders} from 'auth/Auth';


const styles = theme => ({
  row: {
    minWidth: 200,
    maxWidth: 600,
    margin: theme.spacing.unit
  },
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
    backgroundColor: theme.palette.background.paper
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


const cardStyles = theme => ({
  root: {
    minWidth: 200,
    maxWidth: 600,
    margin: theme.spacing.unit
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const UnstyledNoteCard = ({title, appendix, date, classes}) => {

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} variant="subheading" gutterBottom>
          {title}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {date}
        </Typography>
        <Typography variant="body2" component="p">
          {appendix}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">編輯</Button>
      </CardActions>
    </Card>
  );
};

const NoteCard = withStyles(cardStyles)(UnstyledNoteCard);


class NoteList extends React.Component {
  collectionEndpoint = 'https://api.cooby.co/clients/' + this.props.clientId + '/notes/';

  state = {
    notes: [],
    mode: 'create',
    openNoteDrawer: false,
    selectedNote: {additional_data: {}},
    config: {note_type: {
      "0":"空白筆記",
      "1":"一般筆記",
      "2":"遞送建議書",
      "3":"保險簽約",
      "4":"保險理賠"
    }}
  }

  componentDidMount() {
    this.fetchNotes();
  }

  fetchNotes = () => {
    fetch(this.collectionEndpoint, {
      "method": "GET",
      mode: 'cors',
      headers: requestHeaders()
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
    this.setState({
      openNoteDrawer: true,
      selectedNote: selectedNote,
      mode: mode,
      drawerKey: selectedNote.id ? selectedNote.id : Math.random()
    });
  }

  handleNoteClick = (selectedNote) => (event) => {
    console.log(selectedNote);
    this.openDrawer('edit')(selectedNote);
  }

  handleClose = () => {
    this.setState({openNoteDrawer: false});
  }

  handleDeleteNote = (noteId) => {
    let url = this.collectionEndpoint + noteId;
    console.log(url);
    fetch(url, {
      "method": "DELETE",
      mode: 'cors',
      headers: requestHeaders(),
      body: JSON.stringify({})
    }).then(res => {
      if (res.ok) {
        let notes = this.state.notes;
        let index = notes.findIndex(t => t.id === noteId);
        notes.splice(index, 1);

        this.setState({
          notes: notes
        });
      } else {
        res.json().then(error => {console.log(error)});
        }
      this.handleClose();
      });
  }

  handleSaveNote = (newNote) => {
    console.log(newNote);

    let endpoint =
      this.state.mode === "edit" ?
      this.collectionEndpoint + newNote.id :
      this.collectionEndpoint;

    fetch(endpoint, {
      method: ( this.state.mode === "edit" ? "put" : "post" ),
      mode: 'cors',
      headers: requestHeaders(),
      body: JSON.stringify(newNote)
    }).then(res => {
      if (res.ok && this.state.mode === "edit") {
        // put request returns empty string. can't call res.to_json()
        console.log('edittttt');
        return new Promise((resolve, reject) => {resolve({})} );
      } else {
        console.log('new!');
        return res.json();
      }
    }).then(
        (result) => {
          console.log(result);
          if (this.state.mode === "edit") {
            // edit mode
            var index = this.state.notes.findIndex(t => t.id === newNote.id);
            if (index) {
                var oldNote = this.state.notes[index];
                var notes = this.state.notes;
                notes[index] = {...oldNote, ...newNote};
                this.setState({notes: notes});
            }
          } else {
            // create mode
            this.setState({
              notes: this.state.notes.concat({
                id: result.id,
                ...newNote
              })
            });
          }
          this.handleClose();
        },
        (error) => {
          console.log(error);
          this.setState({ error });
        }
    );

  };


  render() {
    const { notes, selectedNote, mode, openNoteDrawer, config, drawerKey } = this.state;
    const { classes } = this.props;

    return (
      <>
        <NoteDrawer
          key={drawerKey}
          isOpen={openNoteDrawer}
          mode={mode}
          note={selectedNote}
          handleClose={this.handleClose}
          handleSaveNote={this.handleSaveNote}
          handleDeleteNote={this.handleDeleteNote}
          config={config} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <div className={classes.row}>
              <CreateNoteButton noteTypes={config.note_type} openDrawer={this.openDrawer('create')}  />
            </div>
          </Grid>
            {
              notes.map((note, index) => (
                <Grid item xs={12} key={note.id}>
                  <NoteCard title={note.title} appendix={note.appendix} date={note.date} />
                </Grid>
              ))
            }
        </Grid>
      </>
    );
  }
}

NoteList.propTypes = {
  classes: PropTypes.object.isRequired,
};

const StyledNoteList = withStyles(styles)(NoteList);

export default StyledNoteList;
