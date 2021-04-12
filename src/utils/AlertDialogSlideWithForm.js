import React from 'react';
import {
    Button, SaveButton, FormWithRedirect
} from 'react-admin';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconCancel from '@material-ui/icons/Cancel';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlideWithForm(props) {
    const [dialogBodyContent, setDialogBodyContent] = React.useState(null);

    const { open, resource, dialogTitle, dialogBody, negativeBtnText, positiveBtnText, onNegativeBtnClick, onPositiveBtnClick, loading, validate, initialValues = null } = props;

    React.useEffect(() => {
        setDialogBodyContent(dialogBody)
    }, [initialValues]);

    const handleClose = () => {
        onNegativeBtnClick();
    };

    const handleSubmit = async values => {
        onPositiveBtnClick(values);
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
            <FormWithRedirect
                resource={resource}
                save={handleSubmit}
                validate={validate}
                record={initialValues}
                render={({ handleSubmitWithRedirect, pristine, saving }) => (
                    <>
                        <DialogContent>
                            {dialogBodyContent}
                        </DialogContent>
                        <DialogActions>
                            <Button
                                label={negativeBtnText}
                                onClick={handleClose}
                                disabled={loading}
                                style={{ padding: '8px' }}
                            >
                                <IconCancel />
                            </Button>
                            <SaveButton
                                label={positiveBtnText}
                                handleSubmitWithRedirect={
                                    handleSubmitWithRedirect
                                }
                                pristine={pristine}
                                saving={saving}
                                disabled={loading}
                            />
                        </DialogActions>
                    </>
                )}
            />
        </Dialog>
    );
}
