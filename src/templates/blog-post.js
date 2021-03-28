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

axios.get(`http://www.omdbapi.com/?apikey=78f8c2e&i=tt4574334&plot=full`).then(res => {
  console.log(res)
})

export const BlogPostTemplate = ({
                                   content,
                                   contentComponent,
                                   description,
                                   tags,
                                   title,
                                   helmet
                                 }) => {

  const PostContent = contentComponent || Content

  return (
      <section className="article">
        {helmet || ''}
        <div className="container">

          <div className="row">
            <div className="article__inner">
              <h1 className="article__title">{title}</h1>

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
        tags
      }
    }
  }
`
