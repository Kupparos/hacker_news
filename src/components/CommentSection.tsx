import { createStyles, Text, Group } from "@mantine/core";
import { FC, useEffect, useState } from "react";
import { getComment } from "../hooks/getData";
import { Comment } from "../types";
// import { compile } from "html-to-text";
import moment from "moment";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 20,
    paddingTop: theme.spacing.sm,
  },
}));

interface CommentSimpleProps {
  id: number;
  update: boolean;
}

export const CommentSection: FC<CommentSimpleProps> = ({ id, update }) => {
  const { classes } = useStyles();
  const [comment, setComment] = useState<Comment>();

  // const dispatch = useAppDispatch()

  const getStoryById = async () => {
    const data = await getComment(id);

    if (data instanceof Error) {
      // setError(true);
    } else {
      setComment(data);
      // dispatch(addStoryInList(data))
    }
  };

  useEffect(() => {
    getStoryById();
  }, [update]);

  function parseHTMLTags(comment: Comment): string {
    
    if (comment) {
      const div = document.createElement("div");
      div.innerHTML = comment.text;
      return div.textContent || div.innerText || "";
    }
    return ''
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
          {comment?.kids
            ? comment?.kids.flat().map((item: number) => (
                <div key={item} style={{ marginLeft: "6vw" }}>
                  <CommentSection id={item} update={update} />
                </div>
              ))
            : null}
        </div>
      ) : null}
    </>
  );
};
