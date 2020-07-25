import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import OutlinedButton from 'components/OutlinedButton';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  divContainer: {
    width: '200px',
    margin: '20px'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 150,
    width: '40%',
  },
  longTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    minWidth: 300,
    width: '90%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  }
});


const QuoteNoteFields = ({note, classes, handleChange}) => (
  <>
    <Typography variant="subheading" gutterBottom>
      遞送細節
    </Typography>
    <TextField
      id="sent_time"
      label="遞送日期"
      type='date'
      value={note.additional_data.sent_time}
      className={classes.textField}
      onChange={handleChange(true, 'sent_time')}
      margin="normal"
    />
    <TextField
      id="sent_content"
      label="遞送內容"
      value={note.additional_data.sent_content}
      className={classes.longTextField}
      onChange={handleChange(true, 'sent_content')}
      margin="normal"
    />
  </>
)


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
      className={classes.longTextField}
      onChange={handleChange(false, 'appendix')}
      margin="normal"
    />
  </>
)


const ClaimNoteFields = ({note, classes, handleChange}) => (
  <>
    <Typography variant="subheading" gutterBottom>
      理賠細節
    </Typography>
    <TextField
      id="claim_time"
      label="理賠日期"
      type='date'
      value={note.additional_data.claim_time}
      className={classes.textField}
      onChange={handleChange(true, 'claim_time')}
      margin="normal"
    />
    <TextField
      id="claim_content"
      label="理賠內容"
      value={note.additional_data.claim_content}
      className={classes.longTextField}
      onChange={handleChange(true, 'claim_content')}
      margin="normal"
    />
  </>
)

const SigningNoteFields = ({note, classes, handleChange}) => (
  <>
    <Typography variant="subheading" gutterBottom>
      簽約細節
    </Typography>
    <TextField
      id="signed_time"
      label="簽約日期"
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
      className={classes.longTextField}
      onChange={handleChange(true, 'signed_content')}
      margin="normal"
    />
  </>
)



const GenericNoteFields = ({note, classes, handleChange}) => (
  <TextField
    id="current_insurance"
    label="保險狀況"
    value={note.additional_data.current_insurance}
    className={classes.longTextField}
    onChange={handleChange(true, 'current_insurance')}
    margin="normal"
  />
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
          <Typography variant="title" gutterBottom>
            {mode === "create" ? "新增會議記錄" : "編輯會議記錄"}
          </Typography>
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

          <Typography variant="subheading" gutterBottom>
            {config.note_type[note.note_type]}
          </Typography>

            <form className={classes.container} noValidate>
              <CommonNoteFields note={note} classes={classes} handleChange={this.handleChange} />
              <CustomNoteFields note={note} classes={classes} handleChange={this.handleChange} />
            </form>
            <div className="divider" />
            {mode === "edit" &&
              <Button color="primary" onClick={this.handleDelete}>刪除</Button>
            }
            <OutlinedButton color="secondary" className="btn-w-md" onClick={handleClose}>取消</OutlinedButton>
            <div className="divider" />
            <Button variant="contained" color="primary" className="btn-w-md" onClick={this.handleSave}>
              儲存</Button>
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
