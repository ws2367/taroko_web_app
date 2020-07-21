import React, {Fragment, PureComponent} from 'react';
import QueueAnim from 'rc-queue-anim';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'material-ui-pickers';
import { Grid } from '@material-ui/core';
import TagMultipleSelect from './TagMultipleSelect.js';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import "../../feedback/routes/loaders/components/loaders/loaders.scss";

const Loader = () => (
  <div className="ball-grid-pulse">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
)


const HEADER = {
  'Content-Type': 'application/json',
  "Authorization": "BEARER PS3eSI8zNXIa4m_bfc2P8Qh4XbQtgbX2bOz9qphHcKMinFmMtGpPkOtso1gKJDTvj0ZJmn9PzNEirnVPVcdlevTleq2mUuVPgsW0SnKR5GaQqrH-qmtwtTWkr77Mja0wzOATEevMPLuNWWh9e7aiP2Tqkw8Hc69BA41nB2ozrhg"
};

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

class AbstractTextFields extends React.Component {
  constructor(props) {
    super();
    this.state = {
      profile: props.profile
    };
  }

  handleDateChange = date => {
    this.handleChange('birthday')({
      event: {
        target: {
          value: date
        }
      }
    });
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

    var profile = {
      id: this.state.profile.id,
      [name]: value
    }
    // one-way only. doesn't update React data
    fetch("https://api.cooby.co/clients/" + profile.id, {
      "method": "PUT",
      mode: 'cors',
      headers: HEADER,
      body: JSON.stringify(profile)
    }).then(res => res.json())
      .then(
        (result) => {
          console.log(result);
    });

    name == 'name' && this.props.handlers.updateClientName(value);
  };
}

class BasicInfoTextFields extends AbstractTextFields {


  render() {
    const { profile } = this.state;
    const { classes, config } = this.props;

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
            value={profile.birthday}
            onChange={this.handleDateChange}
            margin="normal"
          />
        </div>
        <TagMultipleSelect
          title='標籤'
          tags={profile.tags}
          tagOptions={config.tags}
          onChange={this.handleChange('tags')}
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
          value={String(profile.income)}
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
          value={String(profile.source)}
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

class InsuranceInfoTextFields extends AbstractTextFields {


  render() {
    const { profile } = this.state;
    const { classes, config } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          select
          id="is_insured"
          label="有保險？"
          className={classes.textField}
          value={String(profile.is_insured)}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          onChange={this.handleChange('is_insured')}
          margin="normal"
        >
          {Object.keys(config.is_insured).map( k => (
            <MenuItem key={k} value={k}>
              {config.is_insured[k]}
            </MenuItem>
          ))}
        </TextField>
        <TagMultipleSelect
          id="insurance_companies"
          title='投保公司'
          tags={profile.insurance_companies}
          tagOptions={config.insurance_companies}
          onChange={this.handleChange('insurance_companies')}
          label="投保公司"
        />
        <TagMultipleSelect
          id="insurances_of_interest"
          title='有興趣保險種類'
          tags={profile.insurances_of_interest}
          tagOptions={config.insurances_of_interest}
          onChange={this.handleChange('insurances_of_interest')}
          label="有興趣保險種類"
        />
      </form>
    );
  }
}



class FinancialPlanTextFields extends AbstractTextFields {


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
          onChange={this.handleChange('financial_plan')}
          className={classes.longTextField}
          margin="normal"
        />
      </form>
    );
  }
}


class FamilyInfoTextFields extends AbstractTextFields {


  render() {
    const { classes, config, clientOptions } = this.props;
    const { profile } = this.state;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          select
          id="marital_status"
          label="婚姻狀況"
          value={String(profile.marital_status)}
          className={classes.longTextField}
          onChange={this.handleChange('marital_status')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          margin="normal"
        >
          {Object.keys(config.marital_status).map(k => (
            <MenuItem key={k} value={k}>
              {config.marital_status[k]}
            </MenuItem>
          ))}
        </TextField>
        <TagMultipleSelect
          title='延伸親友名單'
          tags={profile.related_clients}
          tagOptions={clientOptions}
          onChange={this.handleChange('related_clients')}
          label="related_clients"
        />
      </form>
    );
  }
}


class AppendixTextFields extends AbstractTextFields {
  render() {
    const { classes, config } = this.props;
    const { profile } = this.state;

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




class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,

    }
  }

  componentDidMount() {
    this.fetchClient(this.props.clientId);
  }

  fetchClient = (clientId) => {
    fetch("https://api.cooby.co/clients/", {
      "method": "GET",
      mode: 'cors',
      headers: HEADER
    }).then(res => res.json())
      .then(
        (result) => {
          let client = result.clients.filter( client => client.profile.id === clientId )[0];

          this.setState({
            isLoaded: true,
            profile: client.profile,
            clientOptions: result.clients.map(c => ({id: c.profile.id, name: c.profile.name} )),
            config: result.config
          });

          //TODO: figure out how to update name without refreshing all components
          // this.props.handlers.updateClientName(client.profile.name);
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        });
  };

  render() {
    const {isLoaded, profile, config, clientOptions} = this.state;
    const { handlers } = this.props;

    const LoadedProfile = () => (
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
                  <StyledFamilyInfoTextFields profile={profile} config={config} handlers={handlers} clientOptions={clientOptions} />
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

    const ProfileWithLoader = () => {
      if (isLoaded) {
        return <LoadedProfile />
      } else {
        return (
          <Grid container justify="center">
            <div className='m-10'>
              <Loader />
            </div>
          </Grid>
        )
      }
    };

    return (<ProfileWithLoader />)
  }
}


export default Profile;
