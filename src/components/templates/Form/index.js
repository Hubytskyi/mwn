import React, {useState} from "react";
import {navigate} from "gatsby-link";
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
            width: '100%',
            marginBottom: theme.spacing(2)
        }
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

function encode(data) {
    return Object.keys(data)
        .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&')
}

const Form = () => {

    const classes = useStyles();
    const [state, setState] = useState({isValidated: false})

    const handleChange = event => {
        setState({[event.target.name]: event.target.value})
    }

   const handleSubmit = event => {
       event.preventDefault()
        const form = event.target
        fetch('/', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: encode({
                'form-name': form.getAttribute('name'),
                ...state,
            }),
        })
            .then(() => navigate(form.getAttribute('action')))
            .catch((error) => alert(error))
    }

    return (
        <form
            className={classes.root}
            name="contact"
            method="post"
            action="/contacts/thanks/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
        >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
                <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={handleChange} />
                </label>
            </div>

                <TextField
                    label="Ім'я"
                    variant="outlined"
                    type="text"
                    required
                    name="name"
                    onChange={handleChange}
                    id="name"
                />

            <TextField
                label="Email"
                variant="outlined"
                type="email"
                required
                name="email"
                onChange={handleChange}
                id="email"
            />

                <TextField
                    id="message"
                    label="Повідомлення"
                    multiline
                    rows={8}
                    variant="outlined"
                    name="message"
                    className="textarea"
                    onChange={handleChange}
                />

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon/>}
                    type="submit"
                    size="large"
                >
                    Відправити
                </Button>
        </form>
    )
}

export default Form