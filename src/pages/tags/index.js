import React from 'react'
import {kebabCase} from 'lodash'
import {Helmet} from 'react-helmet'
import {Link, graphql} from 'gatsby'
import MainLayout from '../../components/layouts/MainLayout'
import {i18n} from "../../i18n";

const TagsPage = ({
                      data: {
                          allMarkdownRemark: {group},
                          site: {
                              siteMetadata: {title},
                          },
                      },
                  }) => (
    <MainLayout>
        <section className="tags">
            <Helmet title={`Tags | ${title}`}/>
            <div className="container">
                <div className="row">
                    <h1 className="tags__title">Жанри:</h1>
                    <ul className="taglist">
                        {group.map((tag) => (
                            <li key={tag.fieldValue}>
                                <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                                    {i18n(`genre.${tag.fieldValue}`)} ({tag.totalCount})
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    </MainLayout>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 1000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
