import Grid from "@mui/material/Grid2";
import Title from "../shared/title";
import Header from "./header";

/* eslint-disable react/display-name */
const AppLayout = () => (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <Title />
        <Header />
          <Grid container height={"calc(100vh - 4rem)"}>
            <Grid
              size={{ sm: 4, md: 3 }}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              First
            </Grid>
            <Grid size={{ xs: 12, sm: 8, md: 5, lg: 3 }} height={"100%"}>
              <WrappedComponent {...props} />
            </Grid>
            <Grid
              size={{ md: 4, lg: 3 }}
              height={"100%"}
              sx={{
                display: { xs: "none", md: "block" },
                padding: "2rem",
                bgcolor: "rgba(0,0,0,0.85)",
              }}
            >
              Third
            </Grid>
          </Grid>
      </>
    );
  };
};

export default AppLayout;
