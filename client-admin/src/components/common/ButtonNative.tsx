import { FC, memo } from "react";
import { makeStyles, Button, ButtonProps } from "@material-ui/core";
import clsx from "clsx";

interface Props extends Omit<ButtonProps, "color"> {
  content: string;
  className?: string;
}

const ButtonNative: FC<Props> = (props) => {
  const { content, className, ...otherProps } = props;
  const defaultClasses = useStyles();

  return (
    <Button className={clsx(defaultClasses.root, className)} {...otherProps}>
      {content}
    </Button>
  );
};

export default memo(ButtonNative);

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#2979ff",
    color: "#FFFF",
    textTransform: "none",
    padding: "6px 16px",
    borderRadius: 2,
    "&:hover": {
      backgroundColor: "#2962ff",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
}));
