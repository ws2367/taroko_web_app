import React, { Component } from 'react';

import CreatableSelect from 'react-select/creatable';

type State = {
  value: string | void,
};


export default class CreatableMultiTagAutocomplete extends Component<*, State> {
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


  handleChange = (newValue: any, actionMeta: any) => {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ value: newValue });
    this.props.handleChange({target: {value: (newValue && newValue.map(o => o.value)) || []}});
  };

  handleCreate = (inputValue: any) => {
    this.setState({ isLoading: true });
    console.group('Creating option');
    console.log(inputValue);
    console.groupEnd();
    this.props.handleCreateTag(inputValue);
  };

  render() {
    const { isLoading, value } = this.state;
    // CreateableSelect assumes the structure of label and value
    const options = this.props.options.map(option => ({label: option.name, value: option.id}) );

    return (
      <CreatableSelect
        variant='standard'
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
    );
  }
}
