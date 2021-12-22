import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ListTrashTag from '../components/ListTrashTag';

export interface IBlogProps {
}

export default function TrashTag (props: IBlogProps) {
  return (
    <Box>
      <Stack width="100%">
        <Box>
          <Typography variant="h4" component="h4" fontWeight="600" mb={3}>
            Thùng rác
          </Typography>
        </Box>
        <Box>
          <ListTrashTag/>
        </Box>
      </Stack>
    </Box>
  );
}
