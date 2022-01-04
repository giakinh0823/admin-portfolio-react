import { Box } from "@mui/system";
import * as React from "react";
import { useNavigate } from 'react-router-dom';
import useChatbots from "../../../hooks/chatbot/useChatbot";
import CrcularProgress from '../../../components/progress/CrcularProgress';

export interface IChatbotProps {}

export default function Chatbot(props: IChatbotProps) {

  const {data, isLoading} = useChatbots({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      navigate(`/chatbot/${data[0]?.id}`);
    }
  }, [data, navigate]);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100%",
          minHeight: "50vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CrcularProgress />
      </Box>
    );
  }
  return <Box>
  </Box>;
}
