import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ListTrashTopic from '../components/ListTrashTopic';

export interface IBlogProps {
}

export default function TrashTopic (props: IBlogProps) {
  return (
    <Box>
      <Stack width="100%">
        <Box>
          <Typography variant="h4" component="h4" fontWeight="600" mb={3}>
            Thùng rác
          </Typography>
        </Box>
        <Box>
          <ListTrashTopic/>
        </Box>
      </Stack>
    </Box>
  );
}
