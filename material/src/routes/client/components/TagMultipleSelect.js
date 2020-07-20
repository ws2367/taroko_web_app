import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
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
    super();
    this.state = {
      tags: props.tags
    };
  }

  getTagName = id => {
    return this.props.tagOptions.find(tag => tag.id == id).name;
  }

  handleDelete = tagId => () => {
    var tags = this.state.tags;
    this.setState({ tags: tags.filter( n => n !== tagId ) });
  }

  handleChange = event => {
    console.log(event.target);
    this.setState({ tags: event.target.value });
  };

  render() {
    const { classes, theme, tagOptions, title } = this.props;
    const {tags} = this.state;

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="select-multiple-chip">{title}</InputLabel>
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
