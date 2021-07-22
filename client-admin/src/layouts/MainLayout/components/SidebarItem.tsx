import { memo, FC } from "react";
import {
  makeStyles,
  ListItemText,
  ListItem,
  Typography,
  ListItemIcon,
} from "@material-ui/core";
import { Link, useLocation } from "react-router-dom";

interface IProps {
  item: {
    text: string;
    icon?: Node;
    path: string;
  };
}

const SidebarItem: FC<IProps> = ({ item }) => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Link to={item.path} className="no-style-link">
      <ListItem
        button
        classes={{ root: classes.item, selected: classes.selectedItem }}
        selected={item.path === location.pathname}
      >
        <ListItemIcon className={classes.itemIcon}>{item.icon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography variant="body2" color="inherit">
              {item.text}
            </Typography>
          }
        />
      </ListItem>
    </Link>
  );
};

export default memo(SidebarItem);

const useStyles = makeStyles((theme) => ({
  item: {
    minHeight: 36,
    color: "white",
    "&:hover": {
      background: theme.palette.primary.main,
    },
    "&$selectedItem": {
      background: theme.palette.primary.main,
      "&:hover": {
        background: theme.palette.primary.main,
      },
    },
    "& svg": {
      fontSize: 16,
    },
  },
  itemIcon: {
    minWidth: 30,
    color: "inherit",
  },
  selectedItem: {},
}));
