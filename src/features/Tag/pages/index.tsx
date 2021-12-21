import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ListTag from '../components/ListTag';

export interface ITagProps {
}

export default function Tag (props: ITagProps) {
  return (
    <Box>
      <Stack width="100%">
        <Box>
          <Typography variant="h4" component="h4" fontWeight="600" mb={3}>
            Tags
          </Typography>
        </Box>
        <Box>
          <ListTag/>
        </Box>
      </Stack>
    </Box>
  );
}
