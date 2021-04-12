import {
    Edit,
    required,
    SimpleForm,
    TextInput,
    useNotify,
    useRedirect,
    useRefresh,
    Toolbar,
    SaveButton,
    maxLength,
    NumberInput,
    Create
} from "react-admin";
import * as React from "react";
import { withStyles, Typography } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


const toolbarStyles = {
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
    },
};

export const CustomerCreate = (props) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = ({ data }) => {
        notify("Changes to Customer saved", "info", {}, false); // the last argument forces the display of 'undo' in the notification
        redirect("/customer");
        refresh();
    };

    const onFailure = (error) => {
        console.log(error.response.data);
        let error_body = error.response.data;
        let error_message = error_body.non_field_errors;
        if (!error_message)
            error_message = "please check the values you have entered";
        notify(`Error occurred: ${error_message}`, "info", {}, true);
    };

    const CustomToolbar = withStyles(toolbarStyles)((props) => (
        <Toolbar {...props}>
            <SaveButton />
            {/*<DeleteButton undoable={false} />*/}
        </Toolbar>
    ));

    return (
        <Create {...props} undoable={false} onSuccess={onSuccess} onFailure={onFailure}>
            <SimpleForm toolbar={<CustomToolbar />}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Add Customer Details
                        </Typography>
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <TextInput fullWidth variant="outlined" label="Name" source="name" validate={[required(), maxLength(255)]} />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <TextInput fullWidth variant="outlined" label="Nick Name" source="nick_name" validate={[maxLength(50)]} />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <NumberInput fullWidth variant="outlined" label="Age" source="age" validate={[required()]} />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <TextInput fullWidth variant="outlined" label="Mobile" source="mobile" validate={[required(), maxLength(10)]} />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <TextInput fullWidth variant="outlined" label="Address" source="address" validate={[required(), maxLength(255)]} />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <TextInput fullWidth variant="outlined" label="Education" source="education" validate={[required(), maxLength(255)]} />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <TextInput fullWidth variant="outlined" label="Occupation" source="occupation" validate={[required(), maxLength(50)]} />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <NumberInput fullWidth variant="outlined" label="Salary" source="salary" validate={[required()]} />
                    </Grid>
                    <Grid item lg={4} xs={12}>
                        <TextInput fullWidth variant="outlined" label="Hobbies" source="hobbies" validate={[required(), maxLength(255)]} />
                    </Grid>
                </Grid>
            </SimpleForm>
        </Create>
    );
};

export default CustomerCreate;
