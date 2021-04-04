import React from 'react'
import PropTypes from 'prop-types'
import {graphql} from 'gatsby'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'

const Index = () => {
    return (
        <Layout>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <BlogRoll/>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Index;