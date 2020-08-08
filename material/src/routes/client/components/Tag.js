import React from 'react';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  chip: {
    margin: theme.spacing.unit * 3,
  }
});

function Tag({tags, config, classes}) {

  const handleClick = () => {

  }

  const getTagName = (tagId) => {
    var matches = config.tags.filter(tag => tag.id === tagId);
    return matches[0]['name'];
  }

  return (
      (tags || [] ).map((tagId, i) => (
        <Chip
          className={classes.chip}
          key={i}
          label={getTagName(tagId)}
          className="table-chip bg-info px-2 mr-1 mb-1"
          onClick={handleClick}
        />
      ))
  );
}

export default withStyles(styles)(Tag);
