import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import OutlinedButton from 'components/OutlinedButton';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const classes = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '300px'
  },
  textField: {
    width: '40%',
  },
  longTextField: {
    width: '90%',
  },
  menu: {
    width: 200,
  },
};

class ClientDrawer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profile: {}
    };
  }

  handleChange = () => {

  };

  toggleDrawer = (isOpen) => () => {
    this.setState({ isOpen });
  };

  render() {
    const { profile } = this.state;
    const { isOpen, toggleClientDrawer} = this.props;

    return (
      <Drawer anchor="right" open={isOpen} onClose={toggleClientDrawer(false)}>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="name"
          label="姓名"
          className={classes.textField}
          value={profile.name}
          onChange={this.handleChange()}
          margin="normal"
        />
        <TextField
          id="birthday"
          label="生日"
          value={profile.birthday}
          className={classes.textField}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={profile.email}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="company"
          label="公司"
          value={profile.company}
          className={classes.textField}
          margin="normal"
        />
      </form>
        <div
          tabIndex={0}
          role="button"
          onClick={this.toggleDrawer(false)}
          onKeyDown={this.toggleDrawer(false)}
        >
          <Button>取消</Button>
        </div>
      </Drawer>
    )
  };
}

export default ClientDrawer;
