import React from 'react'
import {kebabCase} from 'lodash'
import {Link, graphql} from 'gatsby'
import {i18n} from "../i18n";
import {StaticQuery} from "../../.cache/gatsby-browser-entry";

const Tags = () => (
    <StaticQuery
        query={graphql`
      query {
        allMarkdownRemark(limit: 1000) {
            group(field: frontmatter___tags) {
                fieldValue
                totalCount
            }
        }
       }
    `}
        render={data => {
            return (
                <ul className="category__list">
                    {data.allMarkdownRemark.group.map((tag) => (
                        <li key={tag.fieldValue} className="catagory__item">
                            <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                                {i18n(`genre.${tag.fieldValue}`)} ({tag.totalCount})
                            </Link>
                        </li>
                    ))}
                </ul>
            )
        }}
    />
);

export default Tags

