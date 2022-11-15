import React from "react";
import {
  createStyles,
  Header,
  Container,
  Switch,
  useMantineColorScheme,
  useMantineTheme,
  Image,
  Title,
  Group,
} from "@mantine/core";
import logo from '../hackerNewsLogo.svg';
import { RiMoonClearLine, RiSunLine } from "react-icons/ri";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    maxWidth: "95%",
  },
  switch: {
    height: '100%',
    lineHeight: 'normal'
  }
}));

export default function PageHeader() {
  const { classes, cx } = useStyles();

  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Header height={60}>
      <Container className={classes.header}>
        <Group spacing={5}>
          <Image src={logo} alt='logo' width={"40px"}></Image>
          <Title  order={2}>Hacker News</Title>
        </Group>
        <Switch
           className={classes.switch}
          checked={colorScheme === "dark"}
          onChange={() => toggleColorScheme()}
          size="lg"
          color="orange"
          onLabel={<RiSunLine color={theme.white} size={20} />}
          offLabel={<RiMoonClearLine color={theme.colors.gray[6]} size={20} />}
        />
      </Container>
    </Header>
  );
}
