import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import {makeStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    root: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '400px',
        },
        '& > *': {
            margin: theme.spacing(2, 0),
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '400px',
            },
        },
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    button: {
        margin: theme.spacing(2, 0),
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '400px',
        },
    },
}));

const Contacts = () => {

    const handleSubmit = event => {
        event.preventDefault()
        let formData = {
            name: 'test',
            email: 'test@gmail.com',
            message: 'some message...'
        }
        fetch('/', {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: new URLSearchParams(formData).toString()
        }).then(() => console.log('Form successfully submitted')).catch((error) =>
            alert(error))
    }

    const classes = useStyles();

    return (
        <MainLayout>
            <section className="contacts">
                <div className="container">
                    <div className="row">
                        <div className={classes.wrapper}>
                            <h1 className={classes.title}>Contacts</h1>
                            <form
                                className={classes.root}
                                noValidate
                                autoComplete="off"
                                name="contact"
                                method="POST"
                                data-netlify="true"
                                onSubmit={handleSubmit}
                            >
                                <TextField
                                    label="Ім'я"
                                    variant="outlined"
                                    type="text"
                                    required
                                    name="name"
                                />
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    type="email"
                                    required
                                    name="email"
                                />
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Повідомлення"
                                    multiline
                                    rows={8}
                                    variant="outlined"
                                    name="message"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<SendIcon/>}
                                    type="submit"
                                >
                                    Відправити
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default Contacts