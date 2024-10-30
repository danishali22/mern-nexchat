import { Skeleton, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";

export const LayoutLoader = () => {
    return (
        <Grid container height={"calc(100vh - 4rem)"} spacing={"1rem"}>
            <Grid
              size={{ sm: 4, md: 3 }}
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <Skeleton variant="rectangular" height={"100vh"} />
            </Grid>
            <Grid size={{ xs: 12, sm: 8, md: 5, lg: 3 }} height={"100%"}>
              <Stack spacing={"1rem"}>
              {
                Array.from({length: 10}).map((_, index) => (
                    <Skeleton key={index} variant="rounded" height={"5rem"} />
                ))
              }
              </Stack>
            </Grid>
            <Grid
              size={{ md: 4, lg: 3 }}
              height={"100%"}
              sx={{
                display: { xs: "none", md: "block" },
              }}
            >
              <Skeleton variant="rectangular" height={"100vh"} />
            </Grid>
          </Grid>
    )
}