import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CreatableSelect from 'react-select/creatable';


const customStyles = {
  container: (provided, state) => ({
    // none of react-select's styles are passed to <Control />
    ...provided,
    borderTop: '0px',
    borderLeft: '0px',
    borderRight: '0px'
  })
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
        className={this.props.classes.tagField}
        title={this.props.title}
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
