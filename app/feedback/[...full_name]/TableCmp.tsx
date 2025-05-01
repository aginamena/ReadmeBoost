"use client";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function TableCmp({
  summarizedFiles,
  noReadmeFound,
  constructive_feedback,
}: {
  summarizedFiles: string[];
  noReadmeFound: boolean;
  constructive_feedback: { readme_phrase: string; feedback: string }[];
}) {
  sessionStorage.setItem(
    "constructive_feedback",
    JSON.stringify(constructive_feedback)
  );
  sessionStorage.setItem("summarizedFiles", JSON.stringify(summarizedFiles));
  return (
    <Box>
      {noReadmeFound ? (
        <Box>
          <Typography>
            You have no readme at the root of the repository
          </Typography>
          <Link href={`../../optimize`}>
            <Button variant="contained" style={{ marginTop: "12px" }}>
              Write Readme
            </Button>
          </Link>
        </Box>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>README</TableCell>
                  <TableCell>Feedback</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {constructive_feedback.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.readme_phrase}
                    </TableCell>
                    <TableCell>{row.feedback}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Link href={`../../optimize`}>
            <Button variant="contained" style={{ marginTop: "12px" }}>
              Use feedback
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
}
