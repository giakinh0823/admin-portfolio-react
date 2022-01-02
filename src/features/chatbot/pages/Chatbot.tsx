import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import chatbotApi from "../../../api/chatbotApi";
import { useAppSelector } from "../../../app/hook";
import CrcularProgress from "../../../components/progress/CrcularProgress";
import useChatbots from "../../../hooks/chatbot/useChatbot";
import { useChatbotJoin } from "../../../hooks/chatbot/useChatbotJoin";
import { queryClient } from "../../../lib/query/queryClient";
import { selectUser } from "../../Auth/authSlice";
import InfoUser from "../components/InfoUser";
import ListUser from "../components/ListUser";

export interface IChatbotCustomerProps {}

export default function ChatbotCustomer(props: IChatbotCustomerProps) {
  const { id } = useParams();
  const chatbots = useChatbots({});
  const [message, setMessage] = React.useState<any[]>([]);
  const [join, setJoin] = React.useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm();
  const [chatbot, setChatbot] = React.useState<any>();
  const messageEndRef = React.useRef<any>();
  const messageBoxRef = React.useRef<any>();
  const user = useAppSelector(selectUser);
  const mutationJoin = useChatbotJoin();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(true);
  const [listChatbot, setListChatbot] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (chatbots) {
      setListChatbot(chatbots.data);
    }
  }, [chatbots]);

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      if (user.id) {
        const response = await chatbotApi.getById(id, { user_id: user.id });
        setChatbot(response);
        setJoin(Boolean(response?.id));
        if (response) {
          setMessage(response?.messages);
          messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
        }
      }
      setLoading(false);
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    })();
    queryClient.invalidateQueries("chatbots");
  }, [id, user.id]);

  const handleJoin = React.useCallback(() => {
    setJoin(true);
    (async () => {
      const data = await mutationJoin.mutateAsync({ user_id: user.id });
      navigate("/chatbot/" + data?.chatbot_id);
    })();
  }, [mutationJoin, user, navigate]);

  const chatSocket = React.useMemo(
    () =>
      // new WebSocket(`ws://127.0.0.1:8000/ws/chat/${id ? id : "new-chatbot"}/`),
      new WebSocket(
        `wss://hagiakinh-api.herokuapp.com/ws/chat/${id ? id : "new-chatbot"}/`
      ),
    [id]
  );

  const groupsSocket = React.useMemo(
    () =>
      // new WebSocket(`ws://127.0.0.1:8000/ws/groups/${user.username}/`),
      new WebSocket(
        `wss://hagiakinh-api.herokuapp.com/ws/groups/${user.username}/`
      ),
    [user]
  );

  React.useEffect(() => {
    groupsSocket.onmessage = (e) => {
      queryClient.invalidateQueries("chatbots");
    };

    groupsSocket.onclose = function (e) {
      console.error("Out chatbot");
    };
  }, [groupsSocket, listChatbot]);

  React.useEffect(() => {
    chatSocket.onmessage = function (e) {
      const data = JSON.parse(e.data);
      const newMessage = [...message, data];
      setMessage(newMessage);
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    };

    chatSocket.onclose = function (e) {
      console.error("Out chatbot");
    };
  }, [id, chatSocket, message]);

  const onSubmit = (data: any) => {
    chatSocket.send(
      JSON.stringify({
        user: user,
        message: data.message,
        type_message: "string",
      })
    );
    queryClient.invalidateQueries("chatbots");
    reset();
  };


  if (loading) {
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

  return (
    <Box>
      <Stack direction="row" spacing={1}>
        <Box>
          {listChatbot && <ListUser chatbots={listChatbot} user={user} />}
        </Box>
        <Box
          sx={{
            flex: 1,
            padding: "20px 10px",
            boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
            height: "90vh",
            borderRadius: "20px",
            minWidth: "500px",
            position: "relative",
          }}
        >
          <Box
            component="div"
            sx={{
              width: "100%",
              padding: "20px 30px",
              borderRadius: "20px",
              position: "absolute",
              top: 0,
              left: 0,
              zIndex: 10,
              backgroundColor: "#fff",
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Box>
                <Typography variant="h6">Chat</Typography>
              </Box>
              <Box>
                <Typography variant="h6">Hà Gia Kính</Typography>
              </Box>
            </Stack>
          </Box>
          <Box component="div" sx={{ height: "100%" }}>
            <Stack sx={{ height: "100%" }} spacing={2}>
              <Box
                component="div"
                ref={messageBoxRef}
                sx={{
                  flex: 1,
                  maxHeight: "100%",
                  overflow: "auto",
                  padding: "60px 20px 0 20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  {!loading ? (
                    <>
                      <Box sx={{ marginTop: "auto" }}></Box>
                      {message.map((item: any, index: number) => (
                        <Box
                          key={index}
                          sx={{
                            maxWidth: "75%",
                            backgroundColor: "#0084ff",
                            color: "white",
                            padding: "10px 12px",
                            borderRadius: "14px",
                            boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                            marginLeft:
                              user.id === item.user.id ? "auto" : undefined,
                            marginRight:
                              user.id === item.user.id ? undefined : "auto",
                            marginBottom: "10px",
                          }}
                        >
                          <Typography variant="body1">
                            {item.message}
                          </Typography>
                        </Box>
                      ))}
                      <div ref={messageEndRef}></div>
                    </>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                      }}
                    >
                      <CrcularProgress />
                    </Box>
                  )}
                </Box>
              </Box>
              <Box
                component="div"
                sx={{
                  width: "100%",
                  height: "fit-content",
                  borderRadius: "20px",
                  padding: "0 40px 0 0",
                  boxShadow: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
                  position: "relative",
                }}
              >
                {join ? (
                  <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <TextField
                      id="message"
                      variant="outlined"
                      label="Message"
                      autoComplete="off"
                      fullWidth
                      {...register("message")}
                      sx={{
                        "& input": {
                          padding: "18px 23px",
                        },
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "20px",
                        },
                        "& label.Mui-focused": {
                          color: "transparent",
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                      }}
                    />
                    <IconButton
                      color="primary"
                      type="submit"
                      sx={{
                        width: "50px",
                        height: "50px",
                        position: "absolute",
                        top: "50%",
                        right: 0,
                        transform: "translateY(-50%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: "10px",
                      }}
                    >
                      <SendOutlinedIcon />
                    </IconButton>
                  </form>
                ) : (
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton onClick={() => handleJoin()}>
                      <MapsUgcOutlinedIcon />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Stack>
          </Box>
        </Box>
        <Box>
          <InfoUser chatbot={chatbot} />
        </Box>
      </Stack>
    </Box>
  );
}
