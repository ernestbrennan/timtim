import React, { useCallback } from 'react';
import Box from '@material-ui/core/Box';
import makeStyles from '@material-ui/core/styles/makeStyles';

import ChipCheckbox from '../common/chipCheckbox/ChipCheckbox';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function TagCloud({ tags, selectedTags = new Set(), onChange }) {
  const styles = useStyles();
  const getToggleTagSelection = useCallback(
    (id) => () => {
      if (selectedTags.has(id)) {
        selectedTags.delete(id);
        onChange(new Set([...selectedTags]));
      } else {
        onChange(new Set([...selectedTags, id]));
      }
    },
    [onChange, selectedTags],
  );

  return (
    <Box className={styles.root} display={'flex'} flexDirection={'row'} flexWrap={'wrap'}>
      {tags.map((tag) => (
        <Box m={'4px'} key={tag.id}>
          <ChipCheckbox
            isSelected={selectedTags.has(tag.id)}
            onChange={getToggleTagSelection(tag.id)}
          >
            {tag.name}
          </ChipCheckbox>
        </Box>
      ))}
    </Box>
  );
}

export default React.memo(TagCloud);
