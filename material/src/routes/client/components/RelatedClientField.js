import React, { Component } from 'react';
import { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';


const customStyles = {
  control: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    borderTop: 0,
    borderLeft: 0,
    borderRight: 0,
    borderBottom: "1px solid #949494",
    borderRadius: 0,
    '&:hover': {
      borderTop: 0,
      borderLeft: 0,
      borderRight: 0,
      borderBottom: "1px solid",
    }
  }),
  input: provided => ({
    ...provided,
    '&:focus': {
      borderTop: 0,
      borderLeft: 0,
      borderRight: 0,
    }
  }),
  container: provided => ({
    ...provided,
    '&:hover': {
      borderBottom: "1px solid",
    }
  }),
  multiValue: (provided, state) => ({
    ...provided,
    color: "#190078",
    paddingLeft: 5,
    paddingRight: 5,
    backgroundColor: "#eceafc",
    borderRadius: 20
  }),
  MultiValueLabel: (provided, state) => ({
    ...provided,
    color: "#190078",
    backgroundColor: "#eceafc"
  }),
  MultiValueRemove: (provided, state) => ({
    ...provided,
    '&:hover': {
      backgroundColor: "#190078",
      color: "#190078",
    }
  }),
};




const styles = theme => ({
  dialog: {
    width: 300
  },
  tagField: {
    margin: theme.spacing.unit,
    width: '90%',
  },
});

function RelationDialog(props) {
  const { handleClose, handleClick, open, relations, classes } = props;

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={classes.dialog}>
      <DialogTitle id="simple-dialog-title">選擇關係</DialogTitle>
      <List>
        {Object.keys(relations).map((relationId) => (
          <ListItem button onClick={() => handleClick(relationId)} key={relationId}>
            <ListItemText primary={relations[relationId]} />
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

RelationDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  relations: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired
};

type State = {
  value: string | void,
};

const StyledRelationDialog = withStyles(styles)(RelationDialog);


class RelatedClientField extends Component<*, State> {
  getOptionLabel = (clientId, relationId) => {
    let relatedClient = this.props.options.find(option => option.id === clientId);
    return relatedClient.name + "(" + this.props.relations[relationId] + ")";
  }

  state = {
    openDialog: false,
    isLoading: false,
    newClientName: null,
    value: (this.props.relatedClients || []).map(related => ({
      relation: related.relation,
      value: related.id,
      label: this.getOptionLabel(related.id, related.relation)
    }) )
  };

  convertTagsToOptions = (tags) => {
    // restructure tags as options
    return tags.map(tag => ({label: tag.name, value: tag.id}) );
  }

  convertValueToTags = (options) => {
    return (options && options.map(
      o => ({
        relation: o.relation,
        id: o.value
      })
    )) || [];
  }

  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    if (actionMeta.action === 'select-option') {
      // fire up the dialog
      this.setState({openDialog: true, newRelation: newValue.pop()});
    } else {
      this.setState({ value: newValue});
      this.props.onChange({target: {value: this.convertValueToTags(newValue)}});
    }
  };

  handleCreate = (inputValue: any) => {
    this.setState({ isLoading: true, newClientName: inputValue});
    console.group('Creating option');
    console.log(inputValue);
    console.groupEnd();
    this.setState({openDialog: true});
    // this.props.handleCreateTag(inputValue).then(
    //   (newTag) => {
    //     console.log(newTag);
    //     this.setState({ isLoading: false });
    //     // fake it like internal input
    //     var newValue = this.state.value;
    //     this.handleChange(newValue.concat(this.convertTagsToOptions([newTag])), {action: 'create-option'});
    //   },
    //   (error) => {}
    // )
  };

  updateRelation = (newRelation) => {
    let newValue = this.state.value.concat(newRelation);
    // update state
    this.setState({
      value: newValue,
      openDialog: false,
      isLoading: false,
      newClientName: null,
      newRelation: null
    });

    // create relation
    this.props.onChange({target: {value: this.convertValueToTags(newValue)} });
  }

  handleCloseDialog = event => {
    this.setState({
      openDialog: false,
      isLoading: false,
      newClientName: null,
      newRelation: false});
  };

  handleClickDialog = relationId => {
    // create client if needed
    if (this.state.newClientName && this.state.newClientName.length > 0) {
      // this is to create new client
      this.props.createClient({name: this.state.newClientName}).then(
        (newClientOption) => {
          console.group("Add New Client");
          console.log(newClientOption);
          console.log(relationId);
          console.groupEnd();
          // set relation
          this.updateRelation({
            relation: relationId,
            value: newClientOption.id,
            label: this.state.newClientName + "(" + this.props.relations[relationId] + ")"
          });
        }
      );
    } else {
      // this is to add existing client
      console.group("Add Existing Client");
      console.log(this.state.newRelation);
      console.log(relationId);
      console.groupEnd();
      this.updateRelation({
        value: this.state.newRelation.value,
        label: this.getOptionLabel(this.state.newRelation.value, relationId),
        relation: relationId
      });
    }
  };

  render() {
    const { isLoading, value, openDialog } = this.state;
    const { classes, relations } = this.props;
    // CreateableSelect assumes the structure of label and value
    const options = this.convertTagsToOptions(this.props.options);
    console.log(this.props.relatedClients);

    const ControlComponent = props => (
      <div>
        {(this.props.title && <p style={{fontSize: "16px", color: `rgba(0, 0, 0, 0.54)`}}>{this.props.title}</p>)}
        <components.Control {...props} />
      </div>
    );


    const customizeTheme = theme => ({
      ...theme,
      colors: {
        ...theme.colors,
        primary25: '#eceafc',
        primary50: '#eceafc',
        primary75: '#eceafc',
        primary: '#5124EF'
      }
    });

    return (
      <>
        <StyledRelationDialog
          open={openDialog}
          relations={relations}
          handleClose={this.handleCloseDialog}
          handleClick={this.handleClickDialog}
        />
        <CreatableSelect
          variant='standard'
          className={classes.tagField}
          theme={customizeTheme}
          components={{ Control: ControlComponent }}
          styles={customStyles}
          placeholder="選擇相關客戶"
          isClearable
          isMulti
          formatCreateLabel={this.props.formatCreateLabel}
          isDisabled={isLoading}
          isLoading={isLoading}
          onChange={this.handleChange}
          onCreateOption={this.handleCreate}
          options={options}
          value={value}
        />
      </>
    );
  }
}

export default withStyles(styles)(RelatedClientField);
