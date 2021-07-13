import { FC, memo } from "react";
import PropTypes from "prop-types";
import { makeStyles, Button } from "@material-ui/core";
import clsx from "clsx";

type IButtonProps = PropTypes.InferProps<typeof propTypes>;

const ButtonNative: FC<IButtonProps> = (props) => {
  const { content, maxWidth, className, ...otherProps } = props;
  const defaultClasses = useStyles({ maxWidth: maxWidth });

  return (
    <Button className={clsx(defaultClasses.root, className)} {...otherProps}>
      {content}
    </Button>
  );
};

const propTypes = {
  content: PropTypes.string.isRequired,
  maxWidth: PropTypes.bool,
  className: PropTypes.string,
  otherProps: PropTypes.any,
};

const defaultProps = {};

ButtonNative.propTypes = propTypes;
ButtonNative.defaultProps = defaultProps;

export default memo(ButtonNative);

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: "#EF5845",
    color: "#FFFF",
    textTransform: "none",
    minWidth: (props: any) => (props.maxWidth ? "100%" : 100),
    borderRadius: 2,
    "&:hover": {
      backgroundColor: "#D93444",
      boxShadow:
        "0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
    },
  },
}));
