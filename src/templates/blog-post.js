import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import {Helmet} from 'react-helmet'
import {graphql, Link} from 'gatsby'
import Layout from '../components/Layout'
import Content, {HTMLContent} from '../components/Content'
import axios from 'axios';
import star from '../img/star.svg'
import {i18n} from "../i18n";

export const BlogPostTemplate = ({
                                     content,
                                     contentComponent,
                                     description,
                                     tags,
                                     title,
                                     helmet,
                                     imdb
                                 }) => {
    console.log(imdb)

    const PostContent = contentComponent || Content

    return (
        <section className="article">
            {helmet || ''}
            <div className="container">

                <div className="row">
                    <div className="article__inner">
                        <h1 className="article__title">{title}</h1>
                        {imdb.imdbLoaded ?
                            <div className="article__top">
                                <div className="article__top--left">
                                    <img className="article__poster" src={imdb.imdb.Poster} alt=""/>
                                </div>
                                <div className="article__top-right">
                                    <table className="article__info">
                                        <tbody>
                                        <tr>
                                            <td>IMDb:</td>
                                            <td><img className="article__info-star"
                                                     src={star}
                                                     alt=""/><span
                                                className="text__dark-bold">{imdb.imdb.imdbRating}</span> / 10 <span
                                                className="text__light">({imdb.imdb.imdbVotes})</span>
                                            </td>
                                        </tr>
                                        {tags && tags.length ? (
                                            <tr>
                                                <td>Жанр:</td>
                                                <td>
                                                    <ul className="taglist">
                                                        {tags.map((tag) => (
                                                            <li key={tag + `tag`}>
                                                                <Link
                                                                    to={`/tags/${kebabCase(tag)}/`}>{i18n(`genre.${tag}`)}</Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </td>
                                            </tr>
                                        ) : null}
                                        <tr>
                                            <td>Актори:</td>
                                            <td>{imdb.imdb.Actors}</td>
                                        </tr>
                                        <tr>
                                            <td>Тип:</td>
                                            <td>{i18n(`type.${imdb.imdb.Type}`)}</td>
                                        </tr>
                                        <tr>
                                            <td>Рік:</td>
                                            <td>{imdb.imdb.Year}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> : '...'}
                        <div className="article__short-description">
                            {description}
                        </div>
                        <div className="article__content">
                            <PostContent content={content}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

BlogPostTemplate.propTypes = {
    content: PropTypes.node.isRequired,
    contentComponent: PropTypes.func,
    description: PropTypes.string,
    title: PropTypes.string,
    helmet: PropTypes.object,
}

const BlogPost = ({data}) => {
    const {markdownRemark: post} = data

    const [imdb, setImdb] = useState({})

    useEffect(() => {
        axios.get(`http://www.omdbapi.com/?apikey=78f8c2e&i=${post.frontmatter.imdbid}&plot=full`).then(res => {
            setImdb({imdb: res.data, imdbLoaded: true})
        })
    }, [])

    return (
        <Layout>
            <BlogPostTemplate
                content={post.html}
                contentComponent={HTMLContent}
                description={post.frontmatter.description}
                imdb={imdb}
                helmet={
                    <Helmet titleTemplate="%s | Блог">
                        <title>{`${post.frontmatter.title}`}</title>
                        <meta
                            name="description"
                            content={`${post.frontmatter.description}`}
                        />
                    </Helmet>
                }
                tags={post.frontmatter.tags}
                title={post.frontmatter.title}
            />
        </Layout>
    )
}

BlogPost.propTypes = {
    data: PropTypes.shape({
        markdownRemark: PropTypes.object,
    }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        imdbid
        tags
      }
    }
  }
`
