import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { withStyles } from '@material-ui/core/styles';
import OutlinedButton from 'components/OutlinedButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  divContainer: {
    width: 400,
    padding: theme.spacing.unit*2
  },
  textField: {
    width: '80%'
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

class ClientDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleSave = (event) => {
    console.log(this.state);
    const { email, birthday, company, name } = this.state;
    this.props.handlers.createClient({
      name, email, birthday, company
    });
    this.props.toggleClientDrawer(false)();
  };

  toggleDrawer = (isOpen) => () => {
    this.setState({ isOpen });
  };

  render() {
    const { email, birthday, company, name } = this.state;
    const { classes, isOpen, toggleClientDrawer} = this.props;

    return (
      <Drawer anchor="right" open={isOpen} onClose={toggleClientDrawer(false)}>
          <div className={classes.divContainer}>
            <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
              <Typography variant="title" gutterBottom>
                新增客戶
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="姓名"
                className={classes.textField}
                value={name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="birthday"
                label="生日"
                value={birthday}
                className={classes.textField}
                onChange={this.handleChange('birthday')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="Email"
                type="email"
                value={email}
                className={classes.textField}
                onChange={this.handleChange('email')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="company"
                label="公司"
                value={company}
                className={classes.textField}
                onChange={this.handleChange('company')}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.drawerActionButtons}>
                <div className="divider divider-solid border-dark mb-4"></div>
                <Grid container justify="flex-end">
                  <Grid item>
                    <OutlinedButton color="secondary" className={classes.button} onClick={toggleClientDrawer(false)}>取消</OutlinedButton>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSave}>儲存</Button>
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

export default withStyles(styles)(ClientDrawer);
