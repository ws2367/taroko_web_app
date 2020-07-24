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



// Avoid derived state from props:
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#common-bugs-when-using-derived-state
class NoteDrawer extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSave = (event) => {
    const { email, birthday, company, name } = this.state;
    this.props.handlers.createClient({
      name, email, birthday, company
    });
  };


  render() {
    const { mode, note, classes, isOpen, closeDrawer, config } = this.props;

    const ClaimNoteFields = () => (
      <>
        <Typography variant="h3" gutterBottom>
          理賠細節
        </Typography>
        <TextField
          id="date"
          label="理賠日期"
          type='date'
          value={note.additional_data.claim_time}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          label="理賠內容"
          value={note.additional_data.claim_content}
          className={classes.longTextField}
          margin="normal"
        />
      </>
    )

    const SigningNoteFields = () => (
      <>
        <Typography variant="h3" gutterBottom>
          簽約細節
        </Typography>
        <TextField
          id="date"
          label="簽約日期"
          type='date'
          value={note.additional_data.signed_time}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          label="簽約內容"
          value={note.additional_data.signed_content}
          className={classes.longTextField}
          margin="normal"
        />
      </>
    )

    const QuoteNoteFields = () => (
      <>
        <Typography variant="h3" gutterBottom>
          遞送細節
        </Typography>
        <TextField
          id="date"
          label="遞送日期"
          type='date'
          value={note.additional_data.sent_time}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          label="遞送內容"
          value={note.additional_data.sent_content}
          className={classes.longTextField}
          margin="normal"
        />
      </>
    )

    const GenericNoteFields = () => (
      <TextField
        id="current_insurance"
        label="保險狀況"
        value={note.additional_data.current_insurance}
        className={classes.longTextField}
        margin="normal"
      />
    )

    const CustomNoteFields = () => {
      switch(String(note.note_type)) {
        case "1":
          return (<GenericNoteFields />)
          break;
        case "2":
          return (<QuoteNoteFields />)
          break;
        case "3":
          return (<SigningNoteFields />)
          break;
        case "4":
          return (<ClaimNoteFields />)
          break;
        default:
          // code block
          return (<></>)
      }
    }

    const CommonNoteFields = () => (
      <>
        <TextField
          label="地點"
          className={classes.textField}
          value={note.location}
          onChange={this.handleChange('location')}
          margin="normal"
        />
        <TextField
          required
          id="date"
          label="日期"
          type='date'
          value={note.date}
          className={classes.textField}
          onChange={this.handleChange('date')}
          margin="normal"
        />
        <TextField
          id="appendix"
          label="備註"
          value={note.appendix}
          variant='outlined'
          className={classes.longTextField}
          onChange={this.handleChange('appendix')}
          margin="normal"
        />
      </>
    )

    return (
      <Drawer anchor="right" open={isOpen} onClose={closeDrawer()}>
          <div className={classes.divContainer}>
          <Typography variant="h1" gutterBottom>
            {note.title || "未命名"}
          </Typography>
          <Typography variant="h3" gutterBottom>
            {config.note_type[note.note_type]}
          </Typography>

            <form className={classes.container} noValidate>
              <CommonNoteFields />
              <CustomNoteFields />
            </form>
            <div className="divider" />
            <OutlinedButton color="secondary" className="btn-w-md" onClose={closeDrawer()}>取消</OutlinedButton>
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
