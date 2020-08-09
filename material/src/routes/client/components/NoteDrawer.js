import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import OutlinedButton from 'components/OutlinedButton';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  divContainer: {
    width: 400,
    padding: theme.spacing.unit*2
  },
  textField: {
    width: '80%',
  },
  button: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2
  },
  drawerActionButtons: {
    width: 370,
    position: "fixed",
    bottom: theme.spacing.unit * 2
  }
});


const CommonNoteFields = ({note, classes, handleChange}) => (
  <>
    <TextField
      label="地點"
      className={classes.textField}
      value={note.location}
      onChange={handleChange(false, 'location')}
      margin="normal"
    />
    <TextField
      required
      id="date"
      label="日期"
      InputLabelProps={{ shrink: true }}
      type='date'
      value={note.date}
      className={classes.textField}
      onChange={handleChange(false, 'date')}
      margin="normal"
    />
    <TextField
      id="appendix"
      label="備註"
      value={note.appendix}
      variant='outlined'
      className={classes.textField}
      onChange={handleChange(false, 'appendix')}
      margin="normal"
    />
  </>
)


const QuoteNoteFields = ({note, classes, handleChange}) => (
  <>
    <div className="mb-4"></div>
    <Typography variant="subheading" gutterBottom>
      遞送細節
    </Typography>
    <TextField
      id="sent_time"
      label="遞送日期"
      type='date'
      InputLabelProps={{ shrink: true }}
      value={note.additional_data.sent_time}
      className={classes.textField}
      onChange={handleChange(true, 'sent_time')}
      margin="normal"
    />
    <TextField
      id="sent_content"
      label="遞送內容"
      value={note.additional_data.sent_content}
      className={classes.textField}
      onChange={handleChange(true, 'sent_content')}
      margin="normal"
    />
  </>
)


const ClaimNoteFields = ({note, classes, handleChange}) => (
  <>
    <div className="mb-4"></div>
    <Typography variant="subheading" gutterBottom>
      理賠細節
    </Typography>
    <TextField
      id="claim_time"
      label="理賠日期"
      type='date'
      InputLabelProps={{ shrink: true }}
      value={note.additional_data.claim_time}
      className={classes.textField}
      onChange={handleChange(true, 'claim_time')}
      margin="normal"
    />
    <TextField
      id="claim_content"
      label="理賠內容"
      value={note.additional_data.claim_content}
      className={classes.textField}
      onChange={handleChange(true, 'claim_content')}
      margin="normal"
    />
  </>
)

const SigningNoteFields = ({note, classes, handleChange}) => (
  <>
    <div className="mb-4"></div>
    <Typography variant="subheading" gutterBottom>
      簽約細節
    </Typography>
    <TextField
      id="signed_time"
      label="簽約日期"
      InputLabelProps={{ shrink: true }}
      type='date'
      value={note.additional_data.signed_time}
      className={classes.textField}
      onChange={handleChange(true, 'signed_time')}
      margin="normal"
    />
    <TextField
      id="signed_content"
      label="簽約內容"
      value={note.additional_data.signed_content}
      className={classes.textField}
      onChange={handleChange(true, 'signed_content')}
      margin="normal"
    />
  </>
)



const GenericNoteFields = ({note, classes, handleChange}) => (
  <>
    <div className="mb-4"></div>
    <Typography variant="subheading">
      一般資訊
    </Typography>
    <TextField
      id="current_insurance"
      label="保險狀況"
      value={note.additional_data.current_insurance}
      className={classes.textField}
      onChange={handleChange(true, 'current_insurance')}
      margin="normal"
    />
  </>
)

const CustomNoteFields = ({note, classes, handleChange}) => {
  switch(String(note.note_type)) {
    case "1":
      return (<GenericNoteFields note={note} classes={classes} handleChange={handleChange} />)
      break;
    case "2":
      return (<QuoteNoteFields note={note} classes={classes} handleChange={handleChange} />)
      break;
    case "3":
      return (<SigningNoteFields note={note} classes={classes} handleChange={handleChange} />)
      break;
    case "4":
      return (<ClaimNoteFields note={note} classes={classes} handleChange={handleChange} />)
      break;
    default:
      // code block
      return (<></>)
  }
}




// Avoid derived state from props:
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#common-bugs-when-using-derived-state
class NoteDrawer extends React.Component {
  // this needs to be deep copy!
  state = { note: ({...this.props.note, additional_data: {...this.props.note.additional_data} } || {additional_data: {}}) };


  handleChange = (isAdditionalData, name) => event => {
    var note = this.state.note;

    if (isAdditionalData) {
      note.additional_data[name] = event.target.value;
    } else {
      note[name] = event.target.value;
    }

    this.setState({ note });
  };

  handleSave = event => {
    this.props.handleSaveNote(this.state.note);
  }


  handleDelete = (event) => {
    event.preventDefault();
    this.props.handleDeleteNote(this.state.note.id);
  }


  render() {
    const { note } = this.state;
    const { mode, classes, isOpen, handleClose, config } = this.props;

    return (
      <Drawer anchor="right" open={isOpen} onClose={handleClose}>
          <div className={classes.divContainer}>
            <Grid container spacing={2} justify="center">
              <Grid item xs={12}>
                <Typography variant="title" gutterBottom>
                  {mode === "create" ? "新增" : "編輯"}{config.note_type[note.note_type]}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="標題"
                  className={classes.textField}
                  InputProps={{
                    classes: {
                      input: {fontSize: 50}
                    }
                  }}
                  value={note.title}
                  onChange={this.handleChange(false, 'title')}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <CommonNoteFields note={note} classes={classes} handleChange={this.handleChange} />
              </Grid>
              <Grid item xs={12}>
                <CustomNoteFields note={note} classes={classes} handleChange={this.handleChange} />
              </Grid>
              <Grid item xs={12}>
                <div className={classes.drawerActionButtons}>
                  <div className="divider divider-solid border-dark"></div>
                  <Grid container justify="space-between" alignItems="flex-end">
                    <Grid item>
                      {mode === "edit" &&
                        <Button color="primary" onClick={this.handleDelete}>刪除</Button>
                      }
                    </Grid>
                    <Grid item>
                      <OutlinedButton color="secondary" size="medium" className={classes.button} onClick={handleClose}>取消</OutlinedButton>
                      <Button variant="contained" color="primary" size="medium" className={classes.button} onClick={this.handleSave}>
                      儲存</Button>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
      </Drawer>
    )
  };
}

NoteDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};


const StyledNoteDrawer = withStyles(styles)(NoteDrawer);

export default StyledNoteDrawer;
