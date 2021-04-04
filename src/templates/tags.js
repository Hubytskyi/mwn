import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import {i18n} from "../i18n";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map((post) => (
        <li className="post__card" key={post.node.id}>
          <article
              className={`blog-list-item tile is-child box notification ${
                  post.node.frontmatter.featuredpost ? 'is-featured' : ''
              }`}
          >
            <header>
              {post.node.frontmatter.featuredimage ? (
                  <div className="post__thumbnail">
                    <PreviewCompatibleImage
                        imageInfo={{
                          image: post.node.frontmatter.featuredimage,
                          alt: `featured image thumbnail for post ${post.node.frontmatter.title}`,
                        }}
                    />
                  </div>
              ) : null}
              <div className="post__meta">
                <Link
                    className="post__title"
                    to={post.node.fields.slug}
                >
                  <h2>{post.node.frontmatter.title}</h2>
                </Link>
                <div className="post__date-block text__small">
                  <span> &bull; </span>
                  <span className="post__date">
                      {post.node.frontmatter.date}
                    </span>
                </div>
              </div>
            </header>
            <p className="post__short-description">
              {post.node.excerpt}
            </p>
            <Link className="post__button" to={post.node.fields.slug}>
              Детальніше →
            </Link>
          </article>
        </li>
    ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} в категорії ${i18n(`genre.${tag}`)}`

    return (
      <Layout>
        <section className="tags-posts">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container">
            <div className="row">
              <h3 className="tags-posts__title">{tagHeader}</h3>
              <ul className="taglist">{postLinks}</ul>
              <div>
                <Link to="/tags/">Переглянути всі категорії</Link>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}

export default TagRoute

export const tagPageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            slug
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            featuredpost
            featuredimage {
              childImageSharp {
                fluid {
                   ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`
