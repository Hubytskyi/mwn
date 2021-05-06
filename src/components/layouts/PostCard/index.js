import React from "react";
import {Link} from "gatsby"

const PostCard = ({post}) => {

    return (
        <li className="post__item">
            <Link to={'/'+ post.frontmatter.slug} className="post__item-link">
                <div className="post__item-image">
                    <img className="post__item-img" src={post.frontmatter.featuredimage.childImageSharp.fluid.src}
                           alt="" />
                    <img className="post__item-img" src={post.frontmatter.featuredimage.childImageSharp.fluid.src}
                         alt=""/>
                </div>
                <div className="post__item-text">
                    <h5 className="post__item-title">{post.frontmatter.title}</h5>
                    <div className="post__item-description" dangerouslySetInnerHTML={{__html: post.html}}/>
                </div>
            </Link>
        </li>
    )
}

export default PostCard