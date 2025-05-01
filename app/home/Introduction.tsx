import { Box, Button } from "@mui/material";
import Link from "next/link";

export default function Introduction() {
  return (
    <Box className="flex justify-center mt-12">
      <Button variant="contained">
        <Link href="https://github.com/apps/ReadmeBoost/installations/new">
          Get Started
        </Link>
      </Button>
    </Box>
  );
}
