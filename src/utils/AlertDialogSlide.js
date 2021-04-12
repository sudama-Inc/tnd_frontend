import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
    const {open, dialogTitle, dialogBody, negativeBtnText, positiveBtnText, onNegativeBtnClick, onPositiveBtnClick} = props;

    const handleClose = () => {
        if (typeof onNegativeBtnClick === 'function') {
            onNegativeBtnClick();
        }
    };

    const handlePositiveBtnClick = () => {
        onPositiveBtnClick();
    };

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            maxWidth={'md'}
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {dialogBody}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {negativeBtnText && <Button onClick={handleClose} color="primary">
                    {negativeBtnText}
                </Button>}
                <Button onClick={handlePositiveBtnClick} color="primary">
                    {positiveBtnText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
