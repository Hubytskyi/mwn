import React from 'react'
import { Helmet } from 'react-helmet'
import { Link, graphql } from 'gatsby'
import MainLayout from '../components/layouts/MainLayout'
import {i18n} from "../i18n";
import PostCard from "../components/layouts/PostCard";

class TagRoute extends React.Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges
    const postLinks = posts.map((post) => (
        <PostCard
            post={post.node}
            key={post.node.frontmatter.imdbid}
        />
    ))
    const tag = this.props.pageContext.tag
    const title = this.props.data.site.siteMetadata.title
    const totalCount = this.props.data.allMarkdownRemark.totalCount
    const tagHeader = `${totalCount} в категорії ${i18n(`genre.${tag}`)}`

    return (
      <MainLayout>
        <section className="tag-posts">
          <Helmet title={`${tag} | ${title}`} />
          <div className="container container-padding">
            <div className="row">
              <h3 className="tag-posts__title">{tagHeader}</h3>
              <ul className="tag-posts__list">{postLinks}</ul>
              <div>
                <Link to="/tags/">Переглянути всі категорії</Link>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
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
          html
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
