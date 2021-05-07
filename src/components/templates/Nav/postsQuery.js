import {graphql, useStaticQuery} from "gatsby";

const usePostsQuery = () => {
    const data = useStaticQuery(
        graphql`
            query PostsQuery{
                allMarkdownRemark(sort: {order: DESC, fields: frontmatter___date}) {
                    edges {
                        node {
                            id
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
        `
    )
    return data
}

export default usePostsQuery