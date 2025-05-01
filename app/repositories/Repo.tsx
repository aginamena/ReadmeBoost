"use client";

import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { Button, Box } from "@mui/material";
export default function Repo({
  fullName,
  installation_id,
}: {
  fullName: string;
  installation_id: string;
}) {
  const repoName = fullName.split("/")[1];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    ...theme.applyStyles("dark", {
      backgroundColor: "#1A2027",
    }),
  }));
  return (
    <Item>
      <Box>{repoName}</Box>
      <Link
        href={`feedback/${fullName}?installation_id=${installation_id}`}
        className="flex justify-center mt-8"
      >
        <Button variant="outlined">feedback</Button>
      </Link>
    </Item>
  );
}
