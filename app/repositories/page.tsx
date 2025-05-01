import { app } from "@/util/config";
import { Box, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Repo from "./Repo";

export default async function Repositories({
  searchParams,
}: {
  searchParams: Promise<{ installation_id: string }>;
}) {
  const { installation_id } = await searchParams;
  const octokit = await app.getInstallationOctokit(Number(installation_id));
  const { data } = await octokit.request("GET /installation/repositories", {
    per_page: 85,
  });

  return (
    <Container className="p-12">
      <Typography variant="h4" gutterBottom>
        My repositories
      </Typography>
      <Typography variant="body2" gutterBottom className="m-12">
        Showing top 50 repos
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {data.repositories.map((repo, index) => (
            <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
              <Repo
                fullName={repo.full_name}
                installation_id={installation_id}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
