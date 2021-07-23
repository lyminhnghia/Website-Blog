import { FC, memo, useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import {
  makeStyles,
  ListItem,
  Collapse,
  ListItemText,
  Typography,
  Box,
  ListItemIcon,
} from "@material-ui/core";
import SidebarItem from "./SidebarItem";
import { PathConstant } from "../../../const";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import clsx from "clsx";

export interface Children {
  text: string;
  path: string;
}

interface IProps {
  data: {
    text: string;
    icon: JSX.Element;
    children: Children[];
  };
}

const SidebarWithChildren: FC<IProps> = (props) => {
  const { data } = props;
  const location = useLocation();
  const classes = useStyles();

  // Todo
  let isRoot = true;

  const [isShowChildren, setIsShowChildren] = useState(false);

  const onClickItem = () => setIsShowChildren(!isShowChildren);

  useEffect(() => {
    let checkCurrentPage = data.children
      .map((item) => item.path)
      .includes(location.pathname);
    setIsShowChildren(checkCurrentPage);
  }, [data, location]);

  return (
    <Box className={clsx(isShowChildren && classes.root)}>
      <ListItem button className={classes.item} onClick={onClickItem}>
        {Boolean(data?.icon) && (
          <ListItemIcon className={classes.itemIcon}>{data.icon}</ListItemIcon>
        )}
        <ListItemText
          primary={
            <Typography variant="body2" color="inherit">
              {data.text}
            </Typography>
          }
        />
        {isShowChildren ? <ExpandMore /> : <ExpandLess />}
      </ListItem>

      <Collapse in={isShowChildren} timeout="auto" unmountOnExit>
        {data?.children.map(
          (item, index) =>
            (isRoot || (!isRoot && item.path !== PathConstant.ACCOUNT)) && (
              <SidebarItem item={item} key={index} />
            )
        )}
      </Collapse>
    </Box>
  );
};

export default memo(SidebarWithChildren);

const useStyles = makeStyles({
  root: {
    background: "rgba(41, 98, 255, 0.2)",
  },
  item: {
    minHeight: 48,
    padding: "8px 14px",
    color: "white",
    borderRadius: 4,
    "&:hover": {
      background: "rgba(41, 98, 255, 0.3)",
    },
    "& svg": {
      fontSize: 16,
    },
  },
  itemIcon: {
    minWidth: 30,
    color: "inherit",
  },
});
