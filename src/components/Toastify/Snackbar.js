import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { CLOSE_TOASTIFY } from "../../store/actionTypes/toastify";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const useRedux = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.toastifyReducer.open);
  const msg = useSelector((state) => state.toastifyReducer.msg);
  const type = useSelector((state) => state.toastifyReducer.type);
  const setSnackbar = () =>
    dispatch({
      type: CLOSE_TOASTIFY,
    });
  return { setSnackbar, open, msg, type };
};

export default function CustomizedSnackbars(props) {
  const classes = useStyles();
  const { setSnackbar, open, msg, type } = useRedux();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbar();
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
}
