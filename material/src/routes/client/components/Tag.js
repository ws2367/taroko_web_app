import React from 'react';
import Chip from '@material-ui/core/Chip';

function Tag({tags}) {
  return (
    tags.map(tag => (
      <Chip label="{tag.name}" className="table-chip bg-info px-2" />
    ))
  );
}

export default Tag;
