import { Box } from "@mui/system";
import * as React from "react";
import { useNavigate } from 'react-router-dom';
import useChatbots from "../../../hooks/chatbot/useChatbot";

export interface IChatbotProps {}

export default function Chatbot(props: IChatbotProps) {

  const {data} = useChatbots({});
  const navigate = useNavigate();

  React.useEffect(() => {
    if (data) {
      navigate(`/chatbot/${data[0]?.id}`);
    }
  }, [data, navigate]);
  return <Box>
  </Box>;
}
