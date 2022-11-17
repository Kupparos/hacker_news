import { createStyles, Text, Group, UnstyledButton } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { getComment } from "../hooks/getData";
import { Comment } from "../types";
import moment from "moment";
import { IoChevronDownSharp } from "react-icons/io5";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 20,
    paddingTop: theme.spacing.sm,
  },
  openComments: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginTop: "5px",
    color: theme.colorScheme === "light" ? theme.colors.dark[7] : theme.white,
    fontSize: "14px",
  },
}));

interface CommentSimpleProps {
  id: number;
  update: boolean;
  setUpdate: (update: boolean) => void
  open?: boolean;
}

export const CommentSection: FC<CommentSimpleProps> = ({ id, update, setUpdate, open }) => {
  const { classes } = useStyles();
  const [comment, setComment] = useState<Comment>();
  const [openComments, setOpenComments] = useState<boolean>(open || false);

  const getCommentById = async () => {
    const data = await getComment(id);

    if (data instanceof Error) {
      console.log(data)
    } else {
      setComment(data);
    }
  };

  useEffect(() => {
    getCommentById();
    return setUpdate(false)
  }, [update]);

  console.log(update)

  function parseHTMLTags(comment: Comment): string {
    if (comment) {
      const div = document.createElement("div");
      div.innerHTML = comment.text;
      return div.textContent || div.innerText || "";
    }
    return "";
  }

  return (
    <>
      {comment?.by && comment.text && comment.time ? (
        <div style={{ margin: "10px" }}>
          <Group>
            <div>
              <Text size="sm">{comment?.by}</Text>
              <Text size="xs" color="dimmed">
                {moment.unix(Number(comment?.time)).startOf("minute").fromNow()}
              </Text>
            </div>
          </Group>
          <Text className={classes.body} size="sm">
            {parseHTMLTags(comment)}
          </Text>
          {comment.kids?.length !== 0 ? (
            <UnstyledButton
              className={classes.openComments}
              onClick={() => setOpenComments((prevState) => !prevState)}
            >
              <IoChevronDownSharp
                style={
                  !openComments ? undefined : { transform: "rotate(180deg)" }
                }
              />{" "}
              comments
            </UnstyledButton>
          ) : null}
          {openComments && comment.kids
            ? comment.kids.flat().map((item: number) => (
                <div key={item} style={{ marginLeft: "3vw" }}>
                  <CommentSection id={item} update={update} setUpdate={setUpdate} open={openComments} />
                </div>
              ))
            : null}
        </div>
      ) : null}
    </>
  );
};
