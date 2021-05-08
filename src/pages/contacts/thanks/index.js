import React from 'react'
import { Link } from 'gatsby'
import MainLayout from '../../../components/layouts/MainLayout'
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    title: {
        marginBottom: theme.spacing(2)
    },
    description: {
        marginBottom: theme.spacing(2)
    },
    button: {
        marginRight: theme.spacing(2)
    },
    linkFirst: {
        color: '#fff'
    },
    linkSecond: {
        color: '#3f51b5'
    }
}))

export default () => {

    const classes = useStyles();

    return (
        <MainLayout>
            <section className="section">
                <div className="container">
                    <div className="content">
                        <h1 className={classes.title}>Дякуємо!</h1>
                        <p className={classes.description}>Найближчим часом ми з Вами зв'яжемось.</p>
                        <div>
                            <Button className={classes.button} variant="contained" color="primary" size="large">
                                <Link className={classes.linkFirst} to="/">Головна</Link>
                            </Button>
                            <Button variant="outlined" color="primary" size="large">
                                <Link className={classes.linkSecond} to="/contacts">Контакти</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}