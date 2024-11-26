import { useInputValidation } from "6pp";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { bgGradient } from "../../constants/color";
import { Navigate } from "react-router-dom";

const Login = () => {
  const isAdmin = true;
  const secretKey = useInputValidation("");

  if(isAdmin) return <Navigate to="/admin/dashboard" />

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
              <Typography variant="h4">Admin Login</Typography>
              <form style={{ width: "100%", marginTop: "1rem" }}>
                <TextField
                  required
                  fullWidth
                  label="Secret Key"
                  type="password"
                  margin="normal"
                  variant="outlined"
                  value={secretKey.value}
                  onChange={secretKey.changeHandler}
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
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
