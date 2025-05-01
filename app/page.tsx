import Introduction from "./home/Introduction";
import Benefit from "./home/Benefit";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
    <Container className="p-12">
      <Typography variant="h4" gutterBottom>
        Transform your GitHub READMEs into clear, professional presentations
      </Typography>
      <Introduction />
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          alignItems: "center",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Typography>
          One of the reasons developers don't land that dream job is, they still
          fail to present their coding projects clearly, making it hard for
          recruiters or interviewers to understand the value of their work.
          Without a well-crafted README or live demo, even great projects WILL
          go unnoticed!
        </Typography>
        <Image
          src="/frustrated_developer.jpg"
          width={300}
          height={200}
          alt="Frustrated developer not getting any callbacks for interviews"
        />
      </Box>
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "50px",
          marginBottom: "50px",
        }}
      >
        <Image
          src="/mena_agina.png"
          width={500}
          height={200}
          alt="mena agina"
        />
        <Box sx={{ width: { xs: "100%", md: "50%" } }}>
          <Typography>
            Hello, I’m Mena Agina, a software developer and the founder of this
            website. Through my years as a developer, I’ve learned that it’s not
            just about what you know, but how well you can communicate it. Many
            of you have amazing projects in your repositories, but the problem
            is they’re not presented well in your README, making it harder to
            land interviews.
          </Typography>
          <Typography style={{ marginTop: "20px", marginBottom: "20px" }}>
            But don’t worry—there’s a solution! Introducing <b>ReadmeBoost</b>:
            a service that transforms your GitHub README into a professional
            presentation that will impress recruiters. If you don’t have a
            README yet, we’ll create one for you, showcasing your project in the
            best light and pushing it directly to GitHub
          </Typography>
          <Typography>
            What are you waiting for? Click the "Get Started" button to turn
            your GitHub READMEs into clear, professional presentations
          </Typography>
          <Introduction />
        </Box>
      </Box>
      <Typography
        variant="h4"
        style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px" }}
      >
        What you can expect
      </Typography>
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Benefit
          title="Clarity and Confidence"
          body="You will no longer be guessing what to say in an interview or review about your code"
          imgPath="/clarity_and_confidence.jpg"
        />
        <Benefit
          title="A Recruiter-Ready First Impression"
          body="Higher chances of callbacks, interviews, or portfolio reviews that actually lead somewhere"
          imgPath="/recruiter_ready_first_impression.jpg"
        />
        <Benefit
          title="A Professional README"
          body="Something you are proud to show off on GitHub, LinkedIn, resumes, or during interviews"
          imgPath="/professional_readme.jpg"
        />
        <Benefit
          title="Reusability & Scale"
          body=" It’s not a one-time fix — it’s a repeatable system that you can use for all of your future projects."
          imgPath="/reusability_and_scale.jpg"
        />
      </Box>
      <Introduction />
    </Container>
  );
}
