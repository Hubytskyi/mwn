import {graphql, useStaticQuery} from "gatsby";

const usePostsCategoryQuery = () => {
    const data = useStaticQuery(
        graphql`
            query PostsCategoryQuery{
                allMarkdownRemark {
                    group(field: frontmatter___tags, limit: 10) {
                        fieldValue
                        edges {
                            node {
                                html
                                frontmatter {
                                    title
                                    trailer
                                    slug
                                    imdbid
                                    description
                                    date(formatString: "DD/MM/YYYY")
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
            }
        `
    )
    return data
}

export default usePostsCategoryQuery