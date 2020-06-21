import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';

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


// 一般訪談: 現有保單
// "current_insurance": "沒有保險",
// // 遞送建議書: 遞送時間, 遞送內容
// "sent_time": "2020/03/27",
// "sent_content": "建議書：2020新春儲蓄險",
// // 保險簽約: 簽約時間，簽約內容
// "signed_time": "2020/03/27",
// "signed_content": "我是保險簽約的內容",
// // 理賠: 理賠時間，理賠內容
// "claim_time": "2020/03/27",
// "claim_content": "我是保險理賠的內容",
//

const GenericNote = ( {classes, note} ) => (
  <ExpansionPanelDetails>
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="current_insurance"
        label="現有保單細節"
        className={classes.textField}
        value={note.additional_data.current_insurance}
        // onChange={this.handleChange('current_insurance')}
        margin="normal"
      />
    </form>
    {note.appendix}
  </ExpansionPanelDetails>
)

function QuoteNote( {note} ) {

}

function ClosingNote( {note} ) {

}

function ClaimNote( {note} ) {

}

function NotePanel(props) {
  const { classes, notes } = props;


  return (
    <div className={classes.root}>
      {
        notes.map((note, index) => (
        <ExpansionPanel key={index}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.heading}>{note.title}</Typography>
            <Typography className={classes.date}>{note.created}</Typography>
          </ExpansionPanelSummary>
          <GenericNote classes={classes} note={note} />
        </ExpansionPanel>
        ))
      }
    </div>
  );
}

NotePanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

const NotePanel1 = withStyles(styles)(NotePanel);

export default NotePanel1;
