import { FC, memo, useState } from "react";
import { makeStyles, Avatar, Box, Typography } from "@material-ui/core";
import { LockOutlined, PersonOutlined } from "@material-ui/icons";
import { ButtonNative, InputIcon } from "../components";
import { ILogin } from "../interface";

const Login: FC = () => {
  const defaultClasses = useStyles();

  const [formLogin, setFormLogin] = useState<ILogin>({
    username: "",
    password: "",
  });

  const onChangeInput = (event: any): void => {
    setFormLogin({ ...formLogin, [event.target.name]: event.target.value });
  };

  const onClickButton = (): void => {
    console.log("runnn");
  };

  return (
    <Box className={defaultClasses.root}>
      <Box className={defaultClasses.paper}>
        <Box className={defaultClasses.header}>
          <Avatar className={defaultClasses.avatar}>
            <PersonOutlined className={defaultClasses.iconHeader} />
          </Avatar>
          <Typography className={defaultClasses.contentHeader}>
            Đăng nhập
          </Typography>
        </Box>
        <InputIcon
          content="Tài khoản"
          name="username"
          onChange={onChangeInput}
          value={formLogin.username}
          startAdornment={<PersonOutlined className={defaultClasses.icon} />}
          classes={{
            inputAdornedStart: defaultClasses.inputAdornedStart,
          }}
          labelWidth={75}
        />
        <InputIcon
          content="Mật khẩu"
          name="password"
          type="password"
          onChange={onChangeInput}
          value={formLogin.password}
          startAdornment={<LockOutlined className={defaultClasses.icon} />}
          classes={{
            inputAdornedStart: defaultClasses.inputAdornedStart,
          }}
          labelWidth={75}
        />
        <Box className={defaultClasses.bottom}>
          <ButtonNative content="Đăng nhập" onClick={onClickButton} />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Login);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 396,
    height: "auto",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    boxShadow: "0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    backgroundColor: "#2979ff",
  },
  iconHeader: {
    fontSize: 50,
  },
  contentHeader: {
    fontSize: 36,
    fontWeight: 600,
    margin: "8px 0px 4px",
    color: "rgba(0, 0, 0, 0.5)",
  },
  inputAdornedStart: {
    padding: 16,
  },
  icon: {
    color: "rgba(0, 0, 0, 0.5)",
  },
  bottom: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
  },
}));
