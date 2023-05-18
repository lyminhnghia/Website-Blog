import { FC, memo, useState } from "react";
import {
  makeStyles,
  AppBar,
  Box,
  IconButton,
  Avatar,
  ClickAwayListener,
  Paper,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

interface IProps {
  isDisplayMenuIcon: boolean;
  onChangeSidebar: () => void;
}

const Header: FC<IProps> = ({ isDisplayMenuIcon, onChangeSidebar }) => {
  const defaultClasses = useStyles();

  const [isShow, setIsShow] = useState<boolean>(false);

  const onLogout = () => {
    setIsShow(false);
  };

  return (
    <AppBar color="inherit" position="sticky">
      <Box className={defaultClasses.root}>
        <Box>
          {isDisplayMenuIcon && (
            <IconButton onClick={onChangeSidebar}>
              <Menu className={defaultClasses.iconMenu} />
            </IconButton>
          )}
        </Box>
        <IconButton onClick={() => setIsShow(true)}>
          <Avatar alt={"123"} src={"123"} />
        </IconButton>
        {isShow && (
          <ClickAwayListener onClickAway={() => setIsShow(false)}>
            <Paper className={defaultClasses.profileAction}>
              <List component="div">
                <ListItem button className={defaultClasses.actionItem}>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="inherit">
                        Đăng xuất
                      </Typography>
                    }
                    onClick={onLogout}
                  />
                </ListItem>
              </List>
            </Paper>
          </ClickAwayListener>
        )}
      </Box>
    </AppBar>
  );
};

export default memo(Header);

const useStyles = makeStyles({
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#3e4045",
  },
  iconMenu: {
    color: "#FFF",
  },
  profileAction: {
    position: "absolute",
    top: 56,
    right: 16,
  },
  actionItem: {
    minWidth: 190,
    paddingTop: 3,
    paddingBottom: 3,
  },
});
