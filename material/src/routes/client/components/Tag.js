import React from 'react';
import Chip from '@material-ui/core/Chip';

function Tag({tags}) {

  function handleDelete() {

  }

  function handleClick() {

  }

  return (
      tags.map((tag, i) => (
        <Chip
          key={i}
          label={tag.name}
          className="table-chip bg-info px-2"
          onClick={handleClick}
          onDelete={handleDelete}
        />
      ))
  );
}

export default Tag;
