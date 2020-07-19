import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '40%',
  },
  longTextField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
  },
  menu: {
    width: 200,
  },
});




class FirstTextFields extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profile: props.profile
    };
  }

  handleChange = name => event => {
    var value = event.target.value;

    this.setState( state => {
      var p = state.profile;
      
      return {
        profile: {
          ...p,
          [name]: value
        }
      };
    });

    this.props.handlers.updateClient({
      id: this.state.profile.id,
      [name]: value
    });
  };

  render() {
    const { profile } = this.state;
    const { classes, config } = this.props;
    console.log(profile);

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          required
          id="name"
          label="姓名"
          className={classes.textField}
          value={profile.name}
          onChange={this.handleChange('name')}
          margin="normal"
        />
        <TextField
          id="birthday"
          label="生日"
          value={profile.birthday}
          className={classes.textField}
          onChange={this.handleChange('birthday')}
          margin="normal"
        />
        <TextField
          id="email"
          label="Email"
          type="email"
          value={profile.email}
          className={classes.textField}
          onChange={this.handleChange('email')}
          margin="normal"
        />
        <TextField
          id="company"
          label="公司"
          value={profile.company}
          className={classes.textField}
          onChange={this.handleChange('company')}
          margin="normal"
        />
        <TextField
          id="address"
          label="地址"
          value={profile.address}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="cellphone"
          label="電話號碼"
          className={classes.textField}
          type="tel"
          margin="normal"
        />
        <TextField
          id="income"
          select
          label="月收入"
          className={classes.textField}
          value={profile.income}
          onChange={this.handleChange('income')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="請選擇收入"
          margin="normal"
        >
          {Object.keys(config.income).map( k => (
            <MenuItem key={k}>
              {config.income[k]}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="source"
          select
          label="認識方式"
          className={classes.textField}
          value={profile.source}
          onChange={this.handleChange('source')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="請選擇認識方式"
          margin="normal"
        >
          {Object.keys(config.source).map(k => (
            <MenuItem key={k}>
              {config.source[k]}
            </MenuItem>
          ))}
        </TextField>


      </form>
    );
  }
}

class SecondTextFields extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes, profile, config } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          select
          id="is_insured"
          label="有保險？"
          className={classes.textField}
          value={profile.is_insured}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          onChange={this.handleChange('is_insured')}
          margin="normal"
        >
        {Object.keys(config.is_insured).map( k => (
          <MenuItem key={k} value={config.is_insured[k]}>
            {config.is_insured[k]}
          </MenuItem>
        ))}
      </TextField>
        <TextField
          multiline
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          id="financial_plan"
          label="財務計畫"
          value={profile.financial_plan}
          className={classes.longTextField}
          margin="normal"
        />
        <TextField
          id="marital_status"
          label="婚姻狀況"
          value={profile.marital_status}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          multiline
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          id="appendix"
          label="備註"
          value={profile.appendix}
          className={classes.longTextField}
          margin="normal"
        />
      </form>
    );
  }
}

const StyledFirstTextFields = withStyles(styles)(FirstTextFields);
const StyledSecondTextFields = withStyles(styles)(SecondTextFields);


const Profile = ({profile, config, handlers}) => (
  <div className="container-fluid">
    <article className="article pt-3">
      <div className="row">
        <div className="col-xl-6">
          <div className="box box-default mb-6">
            <div className="box-header">基本資料</div>
            <div className="box-divider"></div>
            <div className="box-body">
              <StyledFirstTextFields profile={profile} config={config} handlers={handlers} />
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="box box-default mb-6">
            <div className="box-header">財務狀況</div>
            <div className="box-divider"></div>
            <div className="box-body">
              <StyledSecondTextFields profile={profile} config={config} handlers={handlers} />
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
)

export default Profile;
