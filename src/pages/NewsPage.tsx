import {
  createStyles,
  Container,
  Group,
  Text,
  Anchor,
  Card,
  Button,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { CommentSection } from "../components/CommentSection";
import moment from "moment";
import { useAppSelector } from "../hooks/redux";
import { Story } from "../types";

const useStyles = createStyles((theme) => ({
  head: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  back: {
    border: "1px solid",
    borderColor:
      theme.colorScheme === "light" ? theme.colors.dark[7] : theme.white,
    borderRadius: "100%",
    width: "50px",
    height: "50px",
    padding: "8px",
    margin: "20px 0",
    color: theme.colorScheme === "light" ? theme.colors.dark[7] : theme.white,
  },
  card: {
    backgroundColor:
      theme.colorScheme === "light" ? theme.colors.gray[1] : theme.white[1],
    borderRadius: theme.radius.md,
    marginBottom: "20px",
  },
  author: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  title: {
    fontWeight: 400,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
    fontSize: "2rem",
  },
  group: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  url: {
    fontSize: "1.1rem",
    marginRight: "20px",
  },
  comments: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1rem",
  },
}));

type Id = {
  id: string;
};

export default function NewsPage() {
  const { classes } = useStyles();
  let id = useParams<Id>();
  const storyList = useAppSelector((state) => state.storyList.storyList);
  const [currentNews, setCurrentNews] = useState<Story>();
  const [update, setUpdate] = useState<boolean>(false)

  const news = storyList.find((item) => item.id === Number(id.id));

  useEffect(() => {
    setCurrentNews(news);
  }, []);

  // console.log(currentNews?.kids)

  return (
    <Container maw={"95%"}>
      <Group className={classes.head}>
        <Link to="/">
          <IoArrowBackSharp className={classes.back} />
        </Link>
        <Button color="orange" size="md" onClick={() => setUpdate(true)}>
          Refresh comments
        </Button>
      </Group>
      <Card className={classes.card}>
        <Text
          transform="uppercase"
          weight={600}
          size="md"
          className={classes.author}
        >
          <CiUser />
          {currentNews?.by}
        </Text>
        <Text size="md" mt="xs" mb="xs">
          {moment.unix(Number(currentNews?.time)).startOf("minute").fromNow()}
        </Text>
        <Text className={classes.title} mt="xs" mb="md">
          {currentNews?.title}
        </Text>
        <Group className={classes.group}>
          <Anchor
            href={currentNews?.url}
            target="_blank"
            className={classes.url}
          >
            Link to original news
          </Anchor>
          <Text size="xs" className={classes.comments}>
            {currentNews?.descendants ? null : "no comments"}
            {currentNews?.descendants === 1 ? `1 comment` : null}
            {Number(currentNews?.descendants) > 1
              ? `${currentNews?.descendants} comments`
              : null}
          </Text>
        </Group>
      </Card>
      {currentNews?.kids
        ? currentNews?.kids.flat().map((item: number) => (
            <div key={item}>
              <CommentSection id={item} update={update}/>
            </div>
          ))
        : null}
    </Container>
  );
}
