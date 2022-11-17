import { FC, useState } from "react";
import {
  createStyles,
  Group,
  TextInput,
  Container,
  Button,
} from "@mantine/core";
import { TbSearch } from "react-icons/tb";
import StoryCard from "../components/StoryCard";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/redux";
import { Story } from "../types";

const useStyles = createStyles((theme) => ({
  settings: {
    display: "flex",
    alignItems: "center",
    margin: "20px 0",
  },
  search: {
    width: "42vw",
  },
  link: {
    textDecoration: "none",
  },
}));
interface MainPageProps {
  update: boolean;
  setUpdate: (update: boolean) => void;
}
export const MainPage: FC<MainPageProps> = ({ update, setUpdate }) => {
  const { classes } = useStyles();
  const [search, setSearch] = useState("");

  const storyList = useAppSelector((state) => state.storyList.storyList);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
  };

  const filterData = (data: Story[], search: string) => {
    const query = search.toLowerCase().trim();
    return data.filter((item) => item.title.toLowerCase().includes(query))
  };

  const cardList = filterData(storyList, search).map((item: Story) => (
    <Link
      to={{ pathname: `/news/${item.id}` }}
      className={classes.link}
      key={item.id}
    >
      <StoryCard story={item} />
    </Link>
  ));

  return (
    <Container maw={"95%"}>
      <Group className={classes.settings}>
        <TextInput
          className={classes.search}
          placeholder="Search by title"
          icon={<TbSearch size={14} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Button color="orange" onClick={() => setUpdate(true)}>
          Update news
        </Button>
      </Group>
      {cardList}
    </Container>
  );
};
