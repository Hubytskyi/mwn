import React from 'react'
import MainLayout from '../../components/layouts/MainLayout'
import Form from "../../components/templates/Form";

const Contacts = () => {

    const styles = {
        title: {
            marginBottom: '16px'
        },
        wrapper: {
            display: 'flex',
            justifyContent: 'start',
            flexDirection: 'column',
            alignItems: 'center'
        }
    }

    return (
        <MainLayout>
            <section className="contacts">
                <div className="container">
                    <div className="row">
                        <div style={styles.wrapper}>
                            <h1 style={styles.title}>Contact</h1>
                            <Form/>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default Contacts