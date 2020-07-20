import React from 'react';
import Chip from '@material-ui/core/Chip';

function Tag({tags, config}) {

  const handleClick = () => {

  }

  const getTagName = (tagId) => {
    var matches = config.tags.filter(tag => tag.id === tagId);
    return matches[0]['name'];
  }

  return (
      tags.map((tagId, i) => (
        <Chip
          key={i}
          label={getTagName(tagId)}
          className="table-chip bg-info px-2"
          onClick={handleClick}
        />
      ))
  );
}

export default Tag;
