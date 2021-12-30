import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import {
    Box, List,
    ListItem,
    ListItemAvatar,
    ListItemText, Stack, Typography
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import * as React from "react";
import { Link } from "react-router-dom";


export interface IChatbotCustomerProps {}

export default function ListUser(props: IChatbotCustomerProps) {

  return (
    <Box
      sx={{
        padding: "20px 10px",
        boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
        height: "90vh",
        borderRadius: "20px",
        width: "350px",
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
        <Link
          to={`/chatbot/19d2a3fa-4baa-4865-b84f-b430de4f525b`}
          style={{
            textDecoration: "none",
            display: "block",
            color: "black",
          }}
        >
          <ListItem
            alignItems="center"
            sx={{
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#3c6af41c",
              },
            }}
          >
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://res.cloudinary.com/giakinh0823/image/upload/v1640164105/wsomn31zjodit3s350iu.webp"
              />
            </ListItemAvatar>
            <ListItemText
              primary="Hà Gia Kính"
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    23-08-2001 -
                  </Typography>
                  {" Bạn có cho thuê api không ?"}
                </React.Fragment>
              }
            />
          </ListItem>
        </Link>
      </List>
    </Box>
  );
}
