import { createStyles, Card, Text, Group } from "@mantine/core";
import { FC } from "react";
import moment from "moment";
import { CiStar, CiUser } from "react-icons/ci";
import { BiComment } from "react-icons/bi";
import { Story } from "../types";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    margin: "10px 0",
    "&:hover": {
      boxShadow: "0 0px 5px rgb(210, 210, 210)",
      cursor: "pointer",
    },
  },

  title: {
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1.2,
  },

  body: {
    padding: theme.spacing.md,
  },
  info: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
}));

interface StoryCardProps {
  story: Story;
}

const StoryCard: FC<StoryCardProps> = ({ story }) => {
  const { classes } = useStyles();

  return (
    <>
      {story && (
        <Card withBorder radius="md" p={0} className={classes.card}>
          <Group noWrap spacing={0}>
            <div className={classes.body}>
              <Text
                transform="uppercase"
                color="dimmed"
                weight={700}
                size="xs"
                className={classes.info}
              >
                <CiUser />
                {story.by}
              </Text>
              <Text className={classes.title} mt="xs" mb="md">
                {story.title}
              </Text>
              <Group noWrap spacing="xs">
                <Text size="xs" color="dimmed">
                  {moment
                    .unix(Number(story.time))
                    .format("MMMM Do YYYY, h:mm:ss a")}
                </Text>
                <Text size="xs" color="dimmed">
                  •
                </Text>
                <Text
                  size="xs"
                  color="dimmed"
                  className={classes.info}
                  miw={60}
                >
                  <CiStar />
                  {story.score === 1
                    ? `${story.score} point`
                    : `${story.score} points`}
                </Text>
                <Text size="xs" color="dimmed">
                  •
                </Text>
                <Text size="xs" color="dimmed" className={classes.info}>
                  <BiComment />
                  {story.descendants}
                </Text>
              </Group>
            </div>
          </Group>
        </Card>
      )}
    </>
  );
};

export default StoryCard;
