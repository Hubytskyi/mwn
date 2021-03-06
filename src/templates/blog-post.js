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
import {Box} from "@material-ui/core/";
import {makeStyles} from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
    player: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridColumnGap: 40
    },

    playerEmpty: {
        gridTemplateColumns: '1fr',
    },

    [theme.breakpoints.down('md')]: {
        player: {
            gridTemplateColumns: '1fr',
            gridRowGap: 40
        },
    }
}))

export const BlogPostTemplate = ({
                                     content,
                                     description,
                                     tags,
                                     title,
                                     helmet,
                                     imdb,
                                     personalRating,
                                     url
                                 }) => {
    const classes = useStyles();

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
                                            <td>?????????????????? ??????????????:</td>
                                            <td><img className="article__info-star"
                                                     src={star2}
                                                     alt=""/><span
                                                className="text__dark-bold">
                                                {personalRating !== null ? personalRating : '-'}</span> / 10
                                            </td>
                                        </tr>
                                        {tags && tags.length ? (
                                            <tr>
                                                <td>????????:</td>
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
                                            <td>??????????????:</td>
                                            <td>{imdb.imdb.Director}</td>
                                        </tr>
                                        <tr>
                                            <td>????????????:</td>
                                            <td>{imdb.imdb.Actors}</td>
                                        </tr>
                                        <tr>
                                            <td>??????:</td>
                                            <td>{i18n(`type.${imdb.imdb.Type}`)}</td>
                                        </tr>
                                        <tr>
                                            <td>??????:</td>
                                            <td>{imdb.imdb.Year}</td>
                                        </tr>
                                        <tr>
                                            <td>????????????:</td>
                                            <td>{imdb.imdb.Country}</td>
                                        </tr>
                                        <tr>
                                            <td>????????????????????:</td>
                                            <td>{imdb.imdb.Runtime}</td>
                                        </tr>
                                        <tr>
                                            <td>????????????????????:</td>
                                            <td>
                                                <div className="s9-widget-wrapper"></div>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div> : '...'}
                        <Box className={url ? classes.player : classes.playerEmpty}>
                            {url &&
                            <iframe className="lazy"
                                    src={url}
                                    width="100%" height="370" frameBorder="0" allowFullScreen=""></iframe>
                            }
                            <div className="article__content" dangerouslySetInnerHTML={{__html: content}}/>
                        </Box>
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
                url={post.frontmatter.url}
                personalRating={post.frontmatter.personalRating}
                helmet={
                    <Helmet titleTemplate="%s | ????????">
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
                url
            }
        }
    }
`
