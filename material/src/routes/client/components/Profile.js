import React, {Fragment, PureComponent} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'material-ui-pickers';
import TagMultipleSelect from './TagMultipleSelect.js';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

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
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});


class BasicInfoTextFields extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profile: props.profile,
      birthday: '2018-01-01T00:00:00.000Z',
    };
  }

  handleDateChange = date => {
    this.handleChange('birthday')({
      event: {
        target: date
      }
    })
  };

  handleChange = name => event => {
    var value = event.target.value;
    console.log(event.target);
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
    const { profile, birthday } = this.state;
    const { classes, config } = this.props;
    console.log(profile);

    return (
      <Fragment>
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
        <div className="picker">
          <TextField
            type='date'
            label="生日"
            value={birthday}
            maxDateMessage="生日必須在過去"
            onChange={this.handleDateChange}
            margin="normal"
          />
        </div>
        <TagMultipleSelect
          title='標籤'
          tags={profile.tags}
          tagOptions={config.tags}
          label="Tag"
        />

        <Button variant="contained" color="secondary">
          <AddIcon className={classes.leftIcon} />
          新增標籤
        </Button><div className="divider" />
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
          id="cellphone"
          label="電話號碼"
          className={classes.textField}
          onChange={this.handleChange('cell_phone')}
          type="tel"
          margin="normal"
        />
        <TextField
          id="company"
          label="任職公司/職稱"
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
          onChange={this.handleChange('address')}
          margin="normal"
        />
        <TextField
          id="income"
          select
          label="月收入"
          className={classes.textField}
          value={profile.income}
          onChange={this.handleChange('income')}
          renderValue={selected => (config.income[selected])}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="請選擇收入"
          margin="normal"
        >
          {Object.keys(config.income).map( k => (
            <MenuItem key={k} value={k}>
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
          renderValue={selected => (config.source[selected])}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          helperText="請選擇認識方式"
          margin="normal"
        >
          {Object.keys(config.source).map(k => (
            <MenuItem key={k} value={k}>
              {config.source[k]}
            </MenuItem>
          ))}
        </TextField>
      </form>
      </Fragment>
    );
  }
}

class InsuranceInfoTextFields extends React.Component {

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
        <TagMultipleSelect
          id="insurance_companies"
          title='投保公司'
          tags={profile.insurance_companies}
          tagOptions={config.insurance_companies}
          label="投保公司"
        />
        <TagMultipleSelect
          id="insurances_of_interest"
          title='有興趣保險種類'
          tags={profile.insurances_of_interest}
          tagOptions={config.insurances_of_interest}
          label="有興趣保險種類"
        />
      </form>
    );
  }
}



class FinancialPlanTextFields extends React.Component {

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
          multiline
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          id="financial_plan"
          value={profile.financial_plan}
          className={classes.longTextField}
          margin="normal"
        />
      </form>
    );
  }
}


class FamilyInfoTextFields extends React.Component {

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
          id="marital_status"
          label="婚姻狀況"
          value={profile.marital_status}
          className={classes.longTextField}
          margin="normal"
        />
        <TextField
          id="marital_status"
          label="延伸親友名單"
          value={profile.marital_status}
          className={classes.longTextField}
          margin="normal"
        />
      </form>
    );
  }
}


class AppendixTextFields extends React.Component {

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


const StyledBasicInfoTextFields = withStyles(styles)(BasicInfoTextFields);
const StyledInsuranceInfoTextFields = withStyles(styles)(InsuranceInfoTextFields);
const StyledFinancialPlanTextFields = withStyles(styles)(FinancialPlanTextFields);
const StyledFamilyInfoTextFields = withStyles(styles)(FamilyInfoTextFields);
const StyledAppendixTextFields = withStyles(styles)(AppendixTextFields);


const Profile = ({profile, config, handlers}) => (
  <div className="container-fluid">
    <article className="article pt-3">
      <div className="row">
        <div className="col-xl-6">
          <div className="box box-default mb-3">
            <div className="box-header">基本資料</div>
            <div className="box-divider"></div>
            <div className="box-body">
              <StyledBasicInfoTextFields profile={profile} config={config} handlers={handlers} />
            </div>
          </div>

          <div className="box box-default mb-3">
            <div className="box-header">保險狀況</div>
            <div className="box-divider"></div>
            <div className="box-body">
              <StyledInsuranceInfoTextFields profile={profile} config={config} handlers={handlers} />
            </div>
          </div>
        </div>

        <div className="col-xl-6">
          <div className="box box-default mb-3">
            <div className="box-header">財務規劃</div>
            <div className="box-divider"></div>
            <div className="box-body">
              <StyledFinancialPlanTextFields profile={profile} config={config} handlers={handlers} />
            </div>
          </div>

          <div className="box box-default mb-3">
            <div className="box-header">婚姻與家庭</div>
            <div className="box-divider"></div>
            <div className="box-body">
              <StyledFamilyInfoTextFields profile={profile} config={config} handlers={handlers} />
            </div>
          </div>

          <div className="box box-default mb-3">
            <div className="box-header">備註</div>
            <div className="box-divider"></div>
            <div className="box-body">
              <StyledAppendixTextFields profile={profile} config={config} handlers={handlers} />
            </div>
          </div>

        </div>
      </div>
    </article>
  </div>
)

export default Profile;
