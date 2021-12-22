import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ListTrashBlog from '../components/ListTrashBlog';

export interface IBlogProps {
}

export default function TrashBlog (props: IBlogProps) {
  return (
    <Box>
      <Stack width="100%">
        <Box>
          <Typography variant="h4" component="h4" fontWeight="600" mb={3}>
            Thùng rác
          </Typography>
        </Box>
        <Box>
          <ListTrashBlog/>
        </Box>
      </Stack>
    </Box>
  );
}
