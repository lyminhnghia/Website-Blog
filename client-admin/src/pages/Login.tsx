import { FC, memo, useState } from "react";
import {
  makeStyles,
  Avatar,
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import { LockOutlined, PersonOutlined } from "@material-ui/icons";
import { ButtonNative } from "../components";
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

  return (
    <Box className={defaultClasses.root}>
      <Box className={defaultClasses.paper}>
        <Avatar>
          <LockOutlined />
        </Avatar>
        <Typography>Đăng nhập</Typography>
        <FormControl className={defaultClasses.formInput} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Tài khoản</InputLabel>
          <OutlinedInput
            name="username"
            onChange={onChangeInput}
            value={formLogin.username}
            startAdornment={<PersonOutlined />}
            labelWidth={75}
          />
        </FormControl>
        <FormControl className={defaultClasses.formInput} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">Mật khẩu</InputLabel>
          <OutlinedInput
            name="password"
            onChange={onChangeInput}
            value={formLogin.password}
            startAdornment={<LockOutlined />}
            labelWidth={75}
          />
        </FormControl>
        <ButtonNative content="Đăng nhập" maxWidth />
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
  formInput: {
    width: "100%",
    margin: "20px 0 10px",
  },
}));
