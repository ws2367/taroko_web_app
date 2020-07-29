import React from 'react';
import PropTypes from 'prop-types';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';


function renderInput(title, inputProps) {
  const { InputProps, classes, ref, ...other } = inputProps;

  return (
    <TextField
      label={title}
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
        },
        ...InputProps,
      }}
      {...other}
    />
  );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = (selectedItem || '').indexOf(suggestion.id) > -1;

  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      value={suggestion.id}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
    >
      {suggestion.name}
    </MenuItem>
  );
}
renderSuggestion.propTypes = {
  highlightedIndex: PropTypes.number,
  index: PropTypes.number,
  itemProps: PropTypes.object,
  selectedItem: PropTypes.string,
  suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};


function getSuggestions(suggestions, inputValue) {
  let count = 0;

  return suggestions.filter(suggestion => {
    const keep =
      (!inputValue || suggestion.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
      count < 20;

    if (keep) {
      count += 1;
    }

    return keep;
  });
}

class MultipleTagAutocomplete extends React.Component {
  state = {
    inputValue: '',
    selectedItem: []
  };

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  getTagName = id => {
    return this.props.tagOptions.find(tag => tag.id == id).name;
  }


  handleInputChange = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleChange = item => {
    let { selectedItem } = this.state;

    if (selectedItem.indexOf(item) === -1) {
      selectedItem = [...selectedItem, item];
    }

    this.setState({
      inputValue: '',
      selectedItem,
    });

    this.props.onChange && this.props.onChange({target: {value: selectedItem}}); // first part is like an if.
  };

  handleDelete = item => () => {
    const selectedItem = [...this.state.selectedItem];
    selectedItem.splice(selectedItem.indexOf(item), 1);
    this.setState({selectedItem});

    this.props.onChange && this.props.onChange({target: {value: selectedItem }}); // first part is like an if.
  };

  render() {
    const { classes, tagOptions, title } = this.props;
    const { inputValue, selectedItem } = this.state;

    return (
        <Downshift inputValue={inputValue} onChange={this.handleChange} selectedItem={selectedItem}>
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue: inputValue2,
            selectedItem: selectedItem2,
            highlightedIndex,
          }) => (
            <div className={classes.container}>
              {renderInput(title, {
                fullWidth: true,
                classes,
                InputProps: getInputProps({
                  startAdornment: selectedItem.map(item => (
                    <Chip
                      key={item}
                      tabIndex={-1}
                      label={item}
                      className={classes.chip}
                      onDelete={this.handleDelete(item)}
                    />
                  )),
                  onChange: this.handleInputChange,
                  onKeyDown: this.handleKeyDown,
                  placeholder: '選擇標籤，可複選',
                  id: 'integration-downshift-multiple',
                }),
              })}
              {isOpen ? (
                <Paper className={classes.paper} square>
                  {getSuggestions(tagOptions, inputValue2).map((suggestion, index) =>
                    renderSuggestion({
                      suggestion,
                      index,
                      itemProps: getItemProps({ item: suggestion.id }),
                      highlightedIndex,
                      selectedItem: selectedItem2,
                    }),
                  )}
                </Paper>
              ) : null}
            </div>
          )}
        </Downshift>
    );
  }
}


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: 150,
  },
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  inputRoot: {
    flexWrap: 'wrap',
  },
});

MultipleTagAutocomplete.propTypes = {
  classes: PropTypes.object.isRequired,
};

const MultipleTagAutocomplete1 = withStyles(styles)(MultipleTagAutocomplete);

export default MultipleTagAutocomplete1;
