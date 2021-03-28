import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'
import PreviewCompatibleImage from './PreviewCompatibleImage'

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
        <ul className="posts__list">
          {posts &&
          posts.map(({ node: post }) => (
              <li className="post__card" key={post.id}>
                <article
                    className={`blog-list-item tile is-child box notification ${
                        post.frontmatter.featuredpost ? 'is-featured' : ''
                    }`}
                >
                  <header>
                    {post.frontmatter.featuredimage ? (
                        <div className="post__thumbnail">
                          <PreviewCompatibleImage
                              imageInfo={{
                                image: post.frontmatter.featuredimage,
                                alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                              }}
                          />
                        </div>
                    ) : null}
                    <div className="post__meta">
                      <Link
                          className="post__title"
                          to={post.fields.slug}
                      >
                        <h2>{post.frontmatter.title}</h2>
                      </Link>
                      <div className="post__date-block text__small">
                        <span> &bull; </span>
                        <span className="post__date">
                      {post.frontmatter.date}
                    </span>
                      </div>
                    </div>
                  </header>
                  <p className="post__short-description">
                    {post.excerpt}
                  </p>
                  <Link className="post__button" to={post.fields.slug}>
                    Детальніше →
                  </Link>
                </article>
              </li>
          ))}
        </ul>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
    <StaticQuery
        query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fluid(maxWidth: 120, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
        render={(data, count) => <BlogRoll data={data} count={count} />}
    />
)
