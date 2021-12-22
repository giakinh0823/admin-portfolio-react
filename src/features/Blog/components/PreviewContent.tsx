import CloseIcon from "@mui/icons-material/Close";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from '@mui/material/IconButton';
import Typography from "@mui/material/Typography";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

export interface IPreviewProps {
  content: any;
  title?: string;
  open: boolean;
  onClose: any;
}

export default function PreviewContent({
  content,
  open,
  onClose,
  title,
}: IPreviewProps) {
  return (
    <Box>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
      >
        <DialogTitle id="alert-dialog-title">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              {title && <Typography variant="h5">{title}</Typography>}
              {!title && <Typography variant="h5">Preview</Typography>}
            </Box>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          {content ? (
            <Box
              sx={{
                "& code": { backgroundColor: "transparent" },
                color: "#000",
                minWidth: "500px",
                minHeight: "500px",
              }}
              className="content-markdown"
            >
              <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || "");
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={prism}
                        language={match[1]}
                        PreTag="div"
                        wrapLines={true}
                        showLineNumbers={true}
                        customStyle={{
                          borderRadius: "10px",
                          padding: "20px",
                          boxShadow:
                            "0px 100px 80px rgba(0,0,0,0.0174624),0px 41.7776px 33.4221px rgba(0,0,0,0.0235573),0px 22.3363px 17.869px rgba(0,0,0,0.0282784),0px 12.5216px 10.0172px rgba(0,0,0,0.0339075),0px 6.6501px 5.32008px rgba(0,0,0,0.04317),0px 2.76726px 2.21381px rgba(0,0,0,0.07)",
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </Box>
          ) : (
            <Box
              sx={{
                minWidth: "500px",
                minHeight: "500px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5">No content</Typography>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
