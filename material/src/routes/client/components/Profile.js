import React, {Fragment} from 'react';
import QueueAnim from 'rc-queue-anim';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { DatePicker } from 'material-ui-pickers';
import { Grid } from '@material-ui/core';
import TagMultipleSelect from './TagMultipleSelect';
import CreatableMultiTagAutocomplete from './CreatableMultiTagAutocomplete';
import "../../feedback/routes/loaders/components/loaders/loaders.scss";
import {requestHeaders} from 'auth/Auth';

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

  render() {
    const { classes, config, profile, handleChange, handleCreateTag, addToConfig } = this.props;

    return (
      <Fragment>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            required
            id="name"
            label="姓名"
            className={classes.textField}
            value={profile.name}
            onChange={handleChange('name')}
            margin="normal"
          />
          <div className="picker">
            <TextField
              InputLabelProps={{ shrink: true }}
              placeholder="請選生日"
              type='date'
              label="生日"
              value={profile.birthday}
              onChange={handleChange('birthday')}
              margin="normal"
            />
          </div>
          <CreatableMultiTagAutocomplete
          title='標籤'
          formatCreateLabel={(inputValue) => ("新增標籤：" + inputValue)}
          tags={profile.tags}
          options={config.tags}
          handleCreateTag={handleCreateTag('tags')}
          handleChange={handleChange('tags')}
          label="Tag"
          />
          <div className="divider" />
          <TextField
            id="email"
            label="Email"
            type="email"
            value={profile.email}
            className={classes.textField}
            onChange={handleChange('email')}
            margin="normal"
          />
          <TextField
            id="cell_phone"
            label="電話號碼"
            className={classes.textField}
            onChange={handleChange('cell_phone')}
            value={profile.cell_phone}
            type="tel"
            margin="normal"
          />
          <TextField
            id="company"
            label="任職公司/職稱"
            value={profile.company}
            className={classes.textField}
            onChange={handleChange('company')}
            margin="normal"
          />
          <TextField
            id="address"
            label="地址"
            value={profile.address}
            className={classes.textField}
            onChange={handleChange('address')}
            margin="normal"
          />
          <TextField
            id="income"
            select
            label="月收入"
            className={classes.textField}
            value={String(profile.income)}
            onChange={handleChange('income')}
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
            onChange={handleChange('source')}
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
          <CreatableMultiTagAutocomplete
            id="interests"
            title='休閒興趣'
            formatCreateLabel={(inputValue) => ("新增休閒興趣：" + inputValue)}
            tags={profile.interests}
            options={config.interests}
            handleCreateTag={handleCreateTag('interests')}
            handleChange={handleChange('interests')}
            label="Interests"
          />
        </form>
      </Fragment>
    );
  }
}

class InsuranceInfoTextFields extends React.Component {


  render() {
    const { classes, config, profile, handleChange, handleCreateTag, addToConfig } = this.props;

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
          onChange={handleChange('is_insured')}
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
          onChange={handleChange('insurance_companies')}
          label="投保公司"
        />
        <TagMultipleSelect
          id="insurances_of_interest"
          title='有興趣保險種類'
          tags={profile.insurances_of_interest}
          tagOptions={config.insurances_of_interest}
          onChange={handleChange('insurances_of_interest')}
          label="有興趣保險種類"
        />
      </form>
    );
  }
}



class FinancialPlanTextFields extends React.Component {


  render() {
    const { classes, config, profile, handleChange, handleCreateTag, addToConfig } = this.props;

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
          onChange={handleChange('financial_plan')}
          className={classes.longTextField}
          margin="normal"
          variant='outlined'
        />
      </form>
    );
  }
}


class FamilyInfoTextFields extends React.Component {


  render() {
    const { classes, config, profile, clientOptions, handleChange, handleCreateTag, addToConfig } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          select
          id="marital_status"
          label="婚姻狀況"
          value={String(profile.marital_status)}
          className={classes.longTextField}
          onChange={handleChange('marital_status')}
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
          onChange={handleChange('related_clients')}
          label="related_clients"
        />

      </form>
    );
  }
}


class AppendixTextFields extends React.Component {
  render() {
    const { classes, config, profile, handleChange, handleCreateTag, addToConfig } = this.props;

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
          variant='outlined'
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

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.clientId !== nextProps.clientId || nextState !== this.state;
  }


  componentDidMount() {
    this.fetchClient(this.props.clientId);
  }

  fetchClient = (clientId) => {
    fetch("https://api.cooby.co/clients/", {
      "method": "GET",
      mode: 'cors',
      headers: requestHeaders()
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

          this.props.handlers.updateClientName(client.profile.name);
        },
        (error) => {
          this.setState({
            isLoaded: false,
            error
          });
        });
  };

  handleCreateTag = (key) => (newTag) => {
      let url = "https://api.cooby.co/" + key + "/";
      return new Promise((resolve, reject) => {
        fetch(url, {
          method: "POST",
          mode: 'cors',
          headers: requestHeaders(),
          body: JSON.stringify({name: newTag})
        }).then(res => res.json())
          .then(
            (result) => {
              var newTagObject = {id: result.id, name: newTag};
              this.addToConfig(key, newTagObject);
              resolve(newTagObject);
            },
            (error) => {
              this.setState({error});
              reject(error);
            });
      });
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

    var profile = {
      id: this.state.profile.id,
      [name]: value
    }
    // one-way only. doesn't update React data
    fetch("https://api.cooby.co/clients/" + profile.id, {
      "method": "PUT",
      mode: 'cors',
      headers: requestHeaders(),
      body: JSON.stringify(profile)
    }).then(res => res.json())
      .then(
        (result) => {
          console.log(result);
    });

    name == 'name' && this.props.handlers.updateClientName(value);
  };

  addToConfig = (key, item) => {
    let config = this.state.config;
    config[key].push(item);
    this.setState({config: config});
  }


  render() {
    const {isLoaded, profile, config, clientOptions} = this.state;
    const {clientId} = this.props;


    if (!isLoaded) {
       return (
         <Grid container justify="center">
           <div className='m-10'>
             <Loader />
           </div>
         </Grid>
       )
     } else {
      return (
        <div className="container-fluid">
          <article className="article pt-3">
            <div className="row">
              <div className="col-xl-6">
                <div className="box box-default mb-3">
                  <div className="box-header">基本資料</div>
                  <div className="box-divider"></div>
                  <div className="box-body">
                    <StyledBasicInfoTextFields
                      key={clientId}
                      profile={profile}
                      config={config}
                      handleChange={this.handleChange}
                      addToConfig={this.addToConfig}
                      handleCreateTag={this.handleCreateTag}
                    />
                  </div>
                </div>

                <div className="box box-default mb-3">
                  <div className="box-header">保險狀況</div>
                  <div className="box-divider"></div>
                  <div className="box-body">
                    <StyledInsuranceInfoTextFields
                      key={clientId}
                      profile={profile}
                      config={config}
                      handleChange={this.handleChange}
                      addToConfig={this.addToConfig}
                      handleCreateTag={this.handleCreateTag}
                    />
                  </div>
                </div>
              </div>

              <div className="col-xl-6">
                <div className="box box-default mb-3">
                  <div className="box-header">財務規劃</div>
                  <div className="box-divider"></div>
                  <div className="box-body">
                    <StyledFinancialPlanTextFields
                      key={clientId}
                      profile={profile}
                      config={config}
                      handleChange={this.handleChange}
                      addToConfig={this.addToConfig}
                      handleCreateTag={this.handleCreateTag}
                    />
                  </div>
                </div>

                <div className="box box-default mb-3">
                  <div className="box-header">婚姻與家庭</div>
                  <div className="box-divider"></div>
                  <div className="box-body">
                    <StyledFamilyInfoTextFields
                      key={clientId}
                      profile={profile}
                      config={config}
                      clientOptions={clientOptions}
                      handleChange={this.handleChange}
                      addToConfig={this.addToConfig}
                      handleCreateTag={this.handleCreateTag}
                    />
                  </div>
                </div>

                <div className="box box-default mb-3">
                  <div className="box-header">備註</div>
                  <div className="box-divider"></div>
                  <div className="box-body">
                    <StyledAppendixTextFields
                      key={clientId}
                      profile={profile}
                      config={config}
                      handleChange={this.handleChange}
                      addToConfig={this.addToConfig}
                    />
                  </div>
                </div>

              </div>
            </div>
          </article>
        </div>
      )
    }
  }
}


export default Profile;
