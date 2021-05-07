import React from "react";
import MainLayout from "../components/layouts/MainLayout";
import usePostsQuery from "../components/templates/Nav/postsQuery";
import PostCard from "../components/templates/PostCard";

const AllMovies = () => {

    const data = usePostsQuery()

    return (
        <MainLayout>
            <section className="all-movies">
                <div className="container">
                    <div className="row">
                        <div className="all-moviews__inner">
                            <h2 className="all-moviews__title">Усі фільми</h2>
                            <ul className="tag-posts__list">
                                {data.allMarkdownRemark.edges.map(post => {
                                    return (
                                        <PostCard post={post.node} key={post.node.frontmatter.imdbid}/>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    )
}

export default AllMovies