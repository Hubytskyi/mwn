import React, {useEffect, useState} from "react";
import {Link} from "gatsby"
import ReactPlayer from 'react-player'

const PostCard = ({post}) => {

    return (
        <li className="post__item">
            <Link to={'/'+ post.frontmatter.slug} className="post__item-link"
                // onMouseOver={() => {
                //     setPlay({play: true})
                // }}
                // onMouseLeave={() => {
                //     setPlay({play: false})
                // }}
            >
                <div className="post__item-image">
                    {/*{play ? <ReactPlayer*/}
                    {/*    className='post__item-video'*/}
                    {/*    url={post.frontmatter.trailer}*/}
                    {/*    width='100%'*/}
                    {/*    height='100%'*/}
                    {/*    playing={true}*/}
                    {/*    loop={true}*/}
                    {/*    muted={true}*/}
                    {/*/> : <img className="post__item-img" src={post.frontmatter.featuredimage.childImageSharp.fluid.src}*/}
                    {/*          alt="" style={{display: 'none'}}/>}*/}
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