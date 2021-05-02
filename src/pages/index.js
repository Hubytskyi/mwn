import React from 'react'
import Layout from '../components/Layout'
import BlogRoll from '../components/BlogRoll'
import Tags from "../components/Tags";

const Index = () => {
    return (
        <Layout>
            <section className="section">
                <div className="container">
                    <div className="row row__category">
                        <Tags/>
                    </div>
                    <div className="row">
                        <BlogRoll/>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Index;