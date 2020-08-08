import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';


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
  tagField: {
    margin: theme.spacing.unit,
    width: '90%',
  }
});

type State = {
  value: string | void,
};


class CreatableMultiTagAutocomplete extends Component<*, State> {
  getOptionLabel = (id) => {
    let option = this.props.options.find(option => option.id === id);
    return option ? option.name : id;
  }

  state = {
    isLoading: false,
    value: this.props.tags.map(tagId => ({
      value: tagId,
      label: this.getOptionLabel(tagId)
    }) )
  };

  convertTagsToOptions = (tags) => {
    // restructure tags as options
    return tags.map(tag => ({label: tag.name, value: tag.id}) );
  }

  convertOptionsToTags = (options) => {
    return (options && options.map(o => o.value)) || [];
  }

  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value: newValue });
    this.props.handleChange( {target: {value: this.convertOptionsToTags(newValue)} });
  };

  handleCreate = (inputValue: any) => {
    this.setState({ isLoading: true });
    console.group('Creating option');
    console.log(inputValue);
    console.groupEnd();
    this.props.handleCreateTag(inputValue).then(
      (newTag) => {
        console.log(newTag);
        this.setState({ isLoading: false });
        // fake it like internal input
        var newValue = this.state.value;
        this.handleChange(newValue.concat(this.convertTagsToOptions([newTag])), {action: 'create-option'});
      },
      (error) => {}
    )

  };

  render() {
    const { isLoading, value } = this.state;
    // CreateableSelect assumes the structure of label and value
    const options = this.convertTagsToOptions(this.props.options);


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
      <CreatableSelect
        components={{ Control: ControlComponent }}
        className={this.props.classes.tagField}
        variant='standard'
        placeholder={this.props.placeholder}
        styles={customStyles}
        isClearable
        isMulti
        formatCreateLabel={this.props.formatCreateLabel}
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={this.handleChange}
        onCreateOption={this.handleCreate}
        options={options}
        value={value}
        theme={customizeTheme}
      />
    );
  }
}

export default withStyles(styles)(CreatableMultiTagAutocomplete);
