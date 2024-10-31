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
import { useFileHandler, useInputValidation } from "6pp";
// import { useStrongPassword } from "6pp";
import { usernameValidator } from "../utils/validator";
import { bgGradient } from "../constants/color";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);

  const name = useInputValidation("");
  const bio = useInputValidation("");
  const username = useInputValidation("", usernameValidator);
  const password = useInputValidation("");
  // const password = useStrongPassword();
  const avatar = useFileHandler("single");

  return (
    <div
      style={{
        backgroundImage: bgGradient,
      }}
    >
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
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography variant="caption" color="error">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography variant="caption" color="error">
                    {password.error}
                  </Typography>
                )}
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
                    sx={{
                      width: "10rem",
                      height: "10rem",
                      objectFit: "contain",
                    }}
                    src={avatar.preview}
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
                      <VisuallyHiddenInput
                        type="file"
                        onChange={avatar.changeHandler}
                      />
                    </>
                  </IconButton>
                </Stack>
                {avatar.error && (
                  <Typography
                    variant="caption"
                    color="error"
                    display={"block"}
                    m={"1rem auto"}
                    width={"fit-content"}
                  >
                    {avatar.error}
                  </Typography>
                )}

                <TextField
                  required
                  fullWidth
                  label="Name"
                  margin="normal"
                  variant="outlined"
                  value={name.value}
                  onChange={name.changeHandler}
                />
                {name.error && (
                  <Typography variant="caption" color="error">
                    {name.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Bio"
                  margin="normal"
                  variant="outlined"
                  value={bio.value}
                  onChange={bio.changeHandler}
                />
                {bio.error && (
                  <Typography variant="caption" color="error">
                    {bio.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Username"
                  margin="normal"
                  variant="outlined"
                  value={username.value}
                  onChange={username.changeHandler}
                />
                {username.error && (
                  <Typography variant="caption" color="error">
                    {username.error}
                  </Typography>
                )}
                <TextField
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={password.value}
                  onChange={password.changeHandler}
                />
                {password.error && (
                  <Typography variant="caption" color="error">
                    {password.error}
                  </Typography>
                )}
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
    </div>
  );
};

export default Login;
