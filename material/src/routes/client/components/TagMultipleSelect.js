import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 400,
    maxWidth: '80%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing.unit / 4,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

class MultipleSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: props.tags || []
    };
  }

  getTagName = id => {
    return this.props.tagOptions.find(tag => tag.id == id).name;
  }

  handleDelete = tagId => () => {
    var newTags = this.state.tags.filter( n => n !== tagId );
    this.setState({ tags: newTags });
    this.props.onChange && this.props.onChange({target: {value: newTags }}); // first part is like an if.
  }

  handleChange = event => {
    console.log(event.target);
    this.setState({ tags: event.target.value });
    this.props.onChange && this.props.onChange(event); // first part is like an if.
  };

  render() {
    const { classes, theme, tagOptions, title } = this.props;
    const {tags} = this.state;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          {title && <InputLabel htmlFor="select-multiple-chip">{title}</InputLabel>}
          <Select
            multiple
            value={tags}
            onChange={this.handleChange}
            input={<Input id="select-multiple-chip" />}
            renderValue={selected => (
              <div className={classes.chips}>
                {selected.map(tagId => <Chip key={tagId} label={this.getTagName(tagId)} className={classes.chip} onDelete={this.handleDelete(tagId)} />)}
              </div>
            )}
            MenuProps={MenuProps}
          >
            {tagOptions.map(tag => (
              <MenuItem
                key={tag.id}
                value={tag.id}
                style={{
                  fontWeight:
                    tags.indexOf(tag.id) === undefined
                      ? theme.typography.fontWeightRegular
                      : theme.typography.fontWeightMedium,
                }}
              >
                <Checkbox checked={tags.indexOf(tag.id) > -1} />
                {tag.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}


MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const TagMultipleSelect = withStyles(styles, { withTheme: true })(MultipleSelect);

export default TagMultipleSelect;
