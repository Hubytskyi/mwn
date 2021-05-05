import React, {useRef, useEffect} from "react";
import {Link} from "gatsby"
import videoo from "../../../assets/video/lupin.mp4"

const PostCard = ({post}) => {

    const refVideo = useRef(null);

    useEffect(() => {
        if (!refVideo.current) {
            return;
        }
        refVideo.current.defaultMuted = true;
        refVideo.current.muted = true;

    }, []);

    console.log(post)

    return (
        <li className="post__item">
            <Link to={post.frontmatter.slug} className="post__item-link"
                // onMouseOver={playVideo}
                // onMouseLeave={pauseVideo}>
            >
                <div className="post__item-image">
                    <video className="post__item-video"
                           poster={post.frontmatter.featuredimage.childImageSharp.fluid.src} ref={refVideo}
                           autoPlay>
                        <source src={post.frontmatter.trailer} type="video/mp4"/>
                    </video>
                    <img className="post__item-img" src={post.frontmatter.featuredimage.childImageSharp.fluid.src}
                         alt="" style={{display: 'none'}}/>
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