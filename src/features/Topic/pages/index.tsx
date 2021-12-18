import { Box, Stack, Typography } from '@mui/material';
import * as React from 'react';
import ListTopic from '../components/ListTopic';

export interface ITopicProps {
}

export default function Topic (props: ITopicProps) {
  return (
    <Box>
      <Stack width="100%">
        <Box>
          <Typography variant="h4" component="h4" fontWeight="600" mb={3}>
            Topics
          </Typography>
        </Box>
        <Box>
          <ListTopic/>
        </Box>
      </Stack>
    </Box>
  );
}
