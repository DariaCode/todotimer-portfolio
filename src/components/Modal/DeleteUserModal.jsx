/* ----------------------------------------------------
React.js / Delete user modal component

Updated: 03/2026
Author: Daria Vodzinskaia
Website: www.dariacode.dev
-------------------------------------------------------  */
import React, { useState, useRef, useContext } from "react";
import AuthContext from "../../context/auth-context";

// Material-UI components (https://material-ui.com/)
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";

// Style for Material-UI components
const styles = theme => ({
  action: {
    justifyContent: "flex-start",
    padding: theme.spacing(2, 3, 3, 3)
  },
  button: {}
});

const DeleteModal = (props) => {
  const { classes, onCancel } = props;
  const context = useContext(AuthContext);

  const [showError, setShowError] = useState("");
  const [checkOne, setCheckOne] = useState(false);
  const [checkTwo, setCheckTwo] = useState(false);

  const emailEl = useRef();

  const handleCheckBoxOne = () => {
    setCheckOne(prev => !prev);
  };

  const handleCheckBoxTwo = () => {
    setCheckTwo(prev => !prev);
  };

  const handleConfirm = () => {
    const emailInput = emailEl.current.value;
    if (emailInput !== context.email) {
      setShowError("Email is incorrect");
    } else {
      setShowError("");
      // Mocking behavioral feedback for standalone local mode
      console.log("Account deletion mocked. Clearing local session...");
      context.logout();
    }
  };

  return (
    <Dialog open fullWidth aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Delete account</DialogTitle>
      <DialogContent>
        <Typography color="secondary">
          Warning: Deleting account will remove all your data!
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email-confirm"
          label="Please confirm the current email."
          name="email-confirm"
          autoComplete="email"
          type="email"
          inputRef={emailEl}
        />
        {showError && (
          <Alert severity="error">{showError}</Alert>
        )}
        <Grid container direction="row" alignItems="center">
          <Checkbox
            color="primary"
            checked={checkOne}
            onChange={handleCheckBoxOne}
            name="checkedOne"
          />
          <Typography variant="body2">I am aware that deleting account will remove all my data.</Typography>
        </Grid>
        <Grid container direction="row" alignItems="center">
          <Checkbox
            color="primary"
            checked={checkTwo}
            onChange={handleCheckBoxTwo}
            name="checkedTwo"
          />
          <Typography variant="body2">I am sure I want to delete my account.</Typography>
        </Grid>
      </DialogContent>
      <DialogActions className={classes.action}>
        <Button
          onClick={handleConfirm}
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!(checkOne && checkTwo)}
        >
          Confirm
        </Button>
        <Button
          onClick={onCancel}
          variant="outlined"
          color="secondary"
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default withStyles(styles)(DeleteModal);
