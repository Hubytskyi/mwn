import React from "react";
import {graphql, StaticQuery, Link} from "gatsby";
import {kebabCase} from 'lodash'
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperCore, {Navigation} from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.min.css';
import PostCard from "../PostCard";
import usePostsCategoryQuery from './postsCategoryQuery'
import {i18n} from "../../../i18n";
import Nav from "../Nav";

SwiperCore.use([Navigation]);

const PostsCategory = () => {

    const data = usePostsCategoryQuery()

    return (
        <ul className="posts__category">
            {data.allMarkdownRemark.group.map(el => {
                return (
                    <li className="posts__category-item" key={el.fieldValue}>
                        <div className="post__category-header">
                            <h2 className="posts__category-title">{i18n(`genre.${el.fieldValue}`)}</h2>
                            <Link to={`/tags/${kebabCase(el.fieldValue)}/`}>
                                <IconButton>
                                    <ArrowForwardIcon/>
                                </IconButton>
                            </Link>
                        </div>
                        <ul className="posts__list">
                            <Swiper
                                navigation
                                className="post__card--swiper"
                                spaceBetween={10}
                                slidesPerView={1.25}
                                breakpoints={{
                                    768: {
                                        slidesPerView: 2.25,
                                    },
                                    1024: {
                                        slidesPerView: 3.3,
                                    },
                                    1366: {
                                        slidesPerView: 4.3,
                                    },
                                }}
                                // onSlideChange={() => console.log('slide change')}
                                // onSwiper={(swiper) => console.log(swiper)}
                            >
                                {el.edges.map(post => {
                                    return (
                                        <SwiperSlide key={post.node.frontmatter.imdbid}><PostCard
                                            post={post.node}/></SwiperSlide>
                                    )
                                })}
                            </Swiper>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

export default PostsCategory

