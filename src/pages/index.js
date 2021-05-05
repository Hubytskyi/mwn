import React from 'react'
import MainLayout from '../components/layouts/MainLayout'
import PostsCategory from "../components/templates/PostsCategory";

const HomePage = () => {
    return (
        <MainLayout>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <PostsCategory/>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default HomePage;