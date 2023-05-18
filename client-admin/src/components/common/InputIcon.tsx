import { FC, memo } from "react";
import {
  makeStyles,
  FormControl,
  InputLabel,
  OutlinedInput,
  OutlinedInputProps,
} from "@material-ui/core";
import clsx from "clsx";

interface Props extends Omit<OutlinedInputProps, "icon"> {
  content: string;
  className?: string;
}

const InputIcon: FC<Props> = (props) => {
  const { content, className, ...otherProps } = props;
  const defaultClasses = useStyles();

  return (
    <FormControl
      className={clsx(defaultClasses.formInput, className)}
      variant="outlined"
    >
      <InputLabel>{content}</InputLabel>
      <OutlinedInput {...otherProps} />
    </FormControl>
  );
};

export default memo(InputIcon);

const useStyles = makeStyles(() => ({
  formInput: {
    width: "100%",
    margin: "20px 0 10px",
  },
}));
