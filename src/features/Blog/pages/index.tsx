import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ListBlog from '../components/ListBlog';

export interface IBlogProps {
}

export default function Blog (props: IBlogProps) {
  return (
    <Box>
      <Stack width="100%">
        <Box>
          <Typography variant="h4" component="h4" fontWeight="600" mb={3}>
            Blogs
          </Typography>
        </Box>
        <Box>
          <ListBlog/>
        </Box>
      </Stack>
    </Box>
  );
}
