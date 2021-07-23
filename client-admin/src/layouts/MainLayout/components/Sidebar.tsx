import { FC, memo } from "react";
import { makeStyles, List, Box } from "@material-ui/core";
import { ListAlt } from "@material-ui/icons";
import { PathConstant } from "../../../const";
import SidebarWithChildren, { Children } from "./SidebarWithChildren";
import SidebarItem from "./SidebarItem";

const Sidebar: FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <List className={classes.list}>
        {SIDEBAR_DATA.map((item, index) =>
          Boolean(item?.children) ? (
            <SidebarWithChildren data={item} key={index} />
          ) : (
            <></>
            // <SidebarItem item={item} key={index} />
          )
        )}
      </List>
    </Box>
  );
};

export default memo(Sidebar);

const DRAWER_WIDTH_OPEN = 210;

interface IPropsChildren {
  text: string;
  icon: JSX.Element;
  children: Children[];
}

interface IProps {
  text: string;
  icon: Node;
  path: string;
}

const SIDEBAR_DATA: Array<IPropsChildren> = [
  {
    text: "Blogs",
    icon: <ListAlt color="inherit" />,
    children: [
      {
        text: "Đăng bài",
        path: PathConstant.BLOGS_ADD,
      },
      {
        text: "Quản lý bài đăng",
        path: PathConstant.BLOGS,
      },
      {
        text: "Quản lý danh mục",
        path: PathConstant.BLOGS_CATEGORIES,
      },
    ],
  },
];

const useStyles = makeStyles({
  root: {
    position: "sticky",
    width: DRAWER_WIDTH_OPEN,
    height: "calc(100vh - 56px)",
    minWidth: DRAWER_WIDTH_OPEN,
    top: 56,
    overflowY: "auto",
    background: "#18191a",
  },
  list: {
    padding: 0,
  },
});
