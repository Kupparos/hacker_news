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

// function filterData(data: RowData[], search: string) {
//   const query = search.toLowerCase().trim();
//   return data.filter((item) =>
//     keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
//   );
// }

// function sortData(
//   data: RowData[],
//   payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
// ) {
//   const { sortBy } = payload;

//   if (!sortBy) {
//     return filterData(data, payload.search);
//   }

//   return filterData(
//     [...data].sort((a, b) => {
//       if (payload.reversed) {
//         return b[sortBy].localeCompare(a[sortBy]);
//       }

//       return a[sortBy].localeCompare(b[sortBy]);
//     }),
//     payload.search
//   );
// }

interface MainPageProps {
  ids: number[];
}
export const MainPage: FC<MainPageProps> = ({ ids }) => {
  const { classes } = useStyles();
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState<boolean>(false)

  const storyList = useAppSelector((state) => state.storyList.storyList)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    // setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const cardList = ids?.slice(0, 20).map((id: number) => (
    <Link to={{ pathname: `/news/${id}` }} className={classes.link} key={id}>
      <StoryCard id={id} />
    </Link>
  ));

  return (
    <Container maw={"95%"}>
      <Group className={classes.settings}>
        <TextInput
          className={classes.search}
          placeholder="Search by any field"
          icon={<TbSearch size={14} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Button color="orange" onClick={() => setUpdate(true)}>Update news</Button>
      </Group>
      {cardList}
    </Container>
  );
};
