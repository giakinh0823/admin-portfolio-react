import FiberManualRecordRoundedIcon from "@mui/icons-material/FiberManualRecordRounded";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../../app/hook";
import { selectUser } from "../../Auth/authSlice";

export interface IChatbotCustomerProps {
  chatbots: any[] | undefined;
}

export default function ListUser({ chatbots }: IChatbotCustomerProps) {
  const user = useAppSelector(selectUser);

  return (
    <Box
      sx={{
        padding: "20px 10px",
        boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
        height: "90vh",
        borderRadius: "20px",
        width: "300px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          padding: "10px 30px 0 10px",
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <IconButton
            sx={{
              borderRadius: "10px",
            }}
          >
            <KeyboardArrowLeftOutlinedIcon />
          </IconButton>
          <Box>
            <Typography variant="h6">Chat</Typography>
          </Box>
        </Stack>
      </Box>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          padding: "20px 0px",
        }}
      >
        {chatbots &&
          chatbots.map((chatbot: any) => {
            const user_message = chatbot?.users.filter(
              (item: any) => item.id !== user.id
            )[0];

        
            return (
              <NavLink
                key={chatbot.id}
                to={`/chatbot/${chatbot.id}`}
                style={({ isActive }) => {
                  return {
                    display: "block",
                    textDecoration: "none",
                    color: "black",
                    boxShadow: isActive
                      ? "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                      : undefined,
                    fontWeight: "bold",
                    backgroundColor: isActive
                      ? "rgb(55 102 244 / 10%)"
                      : undefined,
                    borderRadius: "15px",
                    "&:hover": {
                      color: "black",
                      backgroundColor: "rgb(55 102 244 / 10%)",
                    },
                  };
                }}
              >
                <ListItem
                  alignItems="center"
                  sx={{
                    borderRadius: "10px",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://res.cloudinary.com/giakinh0823/image/upload/v1640164105/wsomn31zjodit3s350iu.webp"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: chatbot?.notis?.find(
                            (item: any) => item.id === user.id
                          )
                            ? "bold"
                            : undefined,
                        }}
                      >
                        {`${user_message?.last_name} ${user_message?.first_name}`}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            fontWeight: chatbot?.notis?.find(
                              (item: any) => item.id === user.id
                            )
                              ? "bold"
                              : undefined,
                          }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {`${new Date(
                            chatbot?.messages[
                              chatbot.messages.length - 1
                            ]?.created_at
                          ).toDateString()} - `}
                          {
                            chatbot?.messages[chatbot.messages.length - 1]
                              ?.message
                          }
                        </Typography>
                      </>
                    }
                  />
                  {chatbot?.notis?.find((item: any) => item.id === user.id) ? (
                    <FiberManualRecordRoundedIcon sx={{ fontSize: "10px" }} />
                  ) : (
                    ""
                  )}
                </ListItem>
              </NavLink>
            );
          })}
      </List>
    </Box>
  );
}
