import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {kebabCase} from 'lodash'
import {Helmet} from 'react-helmet'
import {graphql, Link} from 'gatsby'
import MainLayout from '../components/layouts/MainLayout'
import axios from 'axios';
import star from '../assets/images/star.svg'
import star2 from '../assets/images/star2.svg'
import {i18n} from "../i18n";

export const BlogPostTemplate = ({
                                     content,
                                     description,
                                     tags,
                                     title,
                                     helmet,
                                     imdb,
                                     personalRating,
                                 }) => {

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
                                        <tr>
                                            <td>Особистий рейтинг:</td>
                                            <td><img className="article__info-star"
                                                     src={star2}
                                                     alt=""/><span
                                                className="text__dark-bold">
                                                {personalRating !== null ? personalRating : '-'}</span> / 10
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
                                            <td>Режисер:</td>
                                            <td>{imdb.imdb.Director}</td>
                                        </tr>
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
                                        <tr>
                                            <td>Країна:</td>
                                            <td>{imdb.imdb.Country}</td>
                                        </tr>
                                        <tr>
                                            <td>Тривалість:</td>
                                            <td>{imdb.imdb.Runtime}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> : '...'}
                        <div className="article__short-description">
                            {description}
                        </div>
                        <div className="article__content" dangerouslySetInnerHTML={{__html: content}}/>
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
        axios.get(`https://www.omdbapi.com/?apikey=78f8c2e&i=${post.frontmatter.imdbid}&plot=full`).then(res => {
            setImdb({imdb: res.data, imdbLoaded: true})
        })
    }, [])

    return (
        <MainLayout>
            <BlogPostTemplate
                content={post.html}
                description={post.frontmatter.description}
                imdb={imdb}
                personalRating={post.frontmatter.personalRating}
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
        </MainLayout>
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
                personalRating
            }
        }
    }
`
