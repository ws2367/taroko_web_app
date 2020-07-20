import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import NoteDrawer from './NoteDrawer';
import Popover from '@material-ui/core/Popover';


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



class NoteList extends React.Component {
  state = {
    notes: [],
    openNoteDrawer: false,
    handlers: {},
    config: {note_type: {
      "0": "測試"
    }},
    AnchorEl: null
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

  toggleNoteDrawer = (state) => () => {
    this.setState({openNoteDrawer: state});
  }

  handleCreateNoteClick = (event) => {
    console.log(event.currentTarget);
    this.setState({anchorEl: event.currentTarget});
  };

  handleCreateNotePopoverClose = () => {
    this.setState({anchorEl: null});
  };


  render() {
    const { anchorEl, notes, openNoteDrawer, handlers, config } = this.state;
    const { classes } = this.props;

    const CreateNoteButton = () => {
        const open = Boolean(anchorEl);
        const id = open ? 'simple-popover' : undefined;

        return(
          <>
            <Button aria-describedby={id} variant="contained" color="primary" className="btn-w-md" onClick={this.handleCreateNoteClick}>
              新增會議紀錄
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              anchorReferenc="anchorEl"
              onClose={this.handleCreateNotePopoverClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography>The content of the Popover.</Typography>
            </Popover>
          </>
        )
    };

    return (
      <Fragment>
        <CreateNoteButton />
        <div className="divider" />
        <div className={classes.root}>

          <NoteDrawer isOpen={openNoteDrawer} toggleDrawer={this.toggleNoteDrawer} handlers={handlers} config={config} />
          {
            notes.map((note, index) => (
            <ExpansionPanel key={index}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{note.title}</Typography>
                <Typography className={classes.date}>{note.created}</Typography>
              </ExpansionPanelSummary>
            </ExpansionPanel>
            ))
          }
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
