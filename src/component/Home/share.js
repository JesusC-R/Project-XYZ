import axios from "axios";
import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  Add as AddIcon,
  EmojiEmotions,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import { Box } from "@mui/system";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: "20px",
});

const Add = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState({});
  const Id = localStorage.getItem("userId");

  const val = (e) => {
    e.preventDefault();
    const { value, name } = e.target;
    setPost(() => {
      return {
        ...post,
        [name]: value,
        "userId": Id,
      };
    });
  };

  const handlClick = (e) => {
    e.preventDefault();
    const { userId, title, caption } = post;
    if (userId && title && caption) {
      axios.post(`${BASE_URL}/post/newpost`, post).then((res) => {
        alert(res.data.message);
      });
    } else {
      alert("Post needs both a title and a caption");
    }
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Add Post"
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
      <SytledModal
        open={open}
        onClose={(e) => {
          setOpen(false);
          setPost({});
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={280}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography
            variant="h6"
            color="backgorund.default"
            textAlign="center"
          >
            Create post
          </Typography>
          <UserBox>
            <Avatar src="" sx={{ width: 30, height: 30 }} />
            <Typography fontWeight={500} variant="span">
              Kunal Chaurasia
            </Typography>
          </UserBox>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            name="title"
            rows={3}
            placeholder="Title"
            variant="standard"
            onChange={val}
          />
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            name="caption"
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
            onChange={val}
          />
          <Stack direction="row" gap={1} mt={2} mb={3}>
            <EmojiEmotions color="primary" />
            <Image color="secondary" />
            <VideoCameraBack color="success" />
            <PersonAdd color="error" />
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
            onClick={handlClick}
          >
            <Button>Post</Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;
