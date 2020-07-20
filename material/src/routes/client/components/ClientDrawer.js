import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import OutlinedButton from 'components/OutlinedButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  divContainer: {
    width: '400px',
    margin: '20px'
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    width: '50px',
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
  };

  toggleDrawer = (isOpen) => () => {
    this.setState({ isOpen });
  };

  render() {
    const classes = styles();
    const { email, birthday, company, name } = this.state;
    const { isOpen, toggleClientDrawer} = this.props;

    return (
      <Drawer anchor="right" open={isOpen} onClose={toggleClientDrawer(false)}>
          <div style={classes.divContainer}>
          <Typography variant="h1" gutterBottom>
            新增客戶
          </Typography>
            <form className={classes.container} noValidate>
              <TextField
                required
                label="姓名"
                className={classes.textField}
                value={name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
              <TextField
                id="birthday"
                label="生日"
                value={birthday}
                className={classes.textField}
                onChange={this.handleChange('birthday')}
                margin="normal"
              />
              <TextField
                id="email"
                label="Email"
                type="email"
                helperText="錯誤email格式"
                value={email}
                className={classes.textField}
                onChange={this.handleChange('email')}
                margin="normal"
              />
              <TextField
                id="company"
                label="公司"
                value={company}
                className={classes.textField}
                onChange={this.handleChange('company')}
                margin="normal"
              />
            </form>
            <div className="divider" />
            <OutlinedButton color="secondary" className="btn-w-md" onClose={toggleClientDrawer(false)}>取消</OutlinedButton>
            <div className="divider" />
            <Button variant="contained" color="primary" className="btn-w-md" onClick={this.handleSave}>
              儲存</Button>
          </div>
      </Drawer>
    )
  };
}

export default ClientDrawer;
