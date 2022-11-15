import { createStyles, Container, Group, Text, Anchor, Card } from "@mantine/core";
import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { CiStar, CiUser } from "react-icons/ci";
import moment from "moment";

const useStyles = createStyles((theme) => ({
  back: {
    border: "1px solid",
    borderColor: theme.colorScheme === 'light' ? theme.colors.dark[7] : theme.white,
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    padding: "8px",
    margin: "20px 0",
    color: theme.colorScheme === 'light' ? theme.colors.dark[7] : theme.white,
  },
  card: {
    border: '1px solid',
    borderColor: theme.colorScheme === 'light' ? theme.colors.dark[1] : theme.white,
    borderRadius: theme.radius.md,
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  title: {
    fontWeight: 400,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
    fontSize: '2rem',
  },
  group: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px'
  },
  url: {
    fontSize: '1.1rem'
  },
  comments: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '1rem',
  },
}));

export default function NewsPage() {
  const { classes } = useStyles();
  let id = useParams();

  return (
    <Container maw={"95%"}>
      <Link to="/">
        <IoArrowBackSharp className={classes.back} />
      </Link>
      <Card className={classes.card}>
        <Text
          transform="uppercase"
          weight={600}
          size="md"
          className={classes.author}
        >
          <CiUser />
          Author
        </Text>
        <Text size="md"  mt="xs" mb="xs">
          12.12.12
          {/* {moment
                .unix(Number(story?.time))
                .format("MMMM Do YYYY, h:mm:ss a")} */}
        </Text>
        <Text className={classes.title} mt="xs" mb="md">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Text>
        <Group className={classes.group}>
        <Anchor href="https://mantine.dev/" target="_blank" className={classes.url}>Link to original news</Anchor> 
          <Text size="xs" className={classes.comments}>
              12 comments
              {/* {(story?.kids?.length ? story?.kids?.length : null)} */}
            </Text>
        </Group>
      </Card>
    </Container>
  );
}
