import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CameraAlt as CameraAltIcon } from "@mui/icons-material";
import { VisuallyHiddenInput } from "../components/styles/StyledComponent";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  return (
    <Container
      maxWidth="xs"
      component={"main"}
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {isLogin ? (
          <>
            <Typography variant="h4">Login</Typography>
            <form style={{ width: "100%", marginTop: "1rem" }}>
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                sx={{ marginTop: "1rem" }}
              >
                Login
              </Button>
            </form>

            <Typography m={"1rem"}>OR</Typography>
            <Button
              variant="text"
              color="secondary"
              fullWidth
              onClick={toggleLogin}
            >
              Register
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4">Register</Typography>
            <form style={{ width: "100%", marginTop: "1rem" }}>
              <Stack width={"10rem"} position={"relative"} margin={"auto"}>
                <Avatar
                  sx={{ width: "10rem", height: "10rem", objectFit: "contain" }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    color: "white",
                    bgcolor: "rgba(0,0,0,0.5)",
                    ":hover": {
                      bgcolor: "rgba(0,0,0,0.7)",
                    },
                  }}
                  component="label"
                >
                  <>
                    <CameraAltIcon />
                    <VisuallyHiddenInput type="file" />
                  </>
                </IconButton>
              </Stack>

              <TextField
                required
                fullWidth
                label="Name"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Bio"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Username"
                margin="normal"
                variant="outlined"
              />
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                fullWidth
                color="primary"
                type="submit"
                sx={{ marginTop: "1rem" }}
              >
                Sign Up
              </Button>
            </form>

            <Typography m={"1rem"}>OR</Typography>
            <Button
              variant="text"
              color="secondary"
              fullWidth
              onClick={toggleLogin}
            >
              Login
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Login;
