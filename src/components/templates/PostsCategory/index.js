import React from "react";
import {graphql, StaticQuery} from "gatsby";
import PostCard from "../../layouts/PostCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import {i18n} from "../../../i18n";

SwiperCore.use([Navigation]);

const PostsCategory = () => (

    <StaticQuery
        query={graphql`
          query {
            allMarkdownRemark {
                group(field: frontmatter___tags) {
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
    `}
        render={data => {
            return (
                <ul className="posts__category">
                    {data.allMarkdownRemark.group.map(el => {
                        return (
                            <li className="posts__category-item" key={el.fieldValue}>
                                <h2 className="posts__category-title">{i18n(`genre.${el.fieldValue}`)}</h2>
                                <ul className="posts__list">
                                    <Swiper
                                        className="post__card--swiper"
                                        spaceBetween={5}
                                        slidesPerView={4.3}
                                        navigation
                                        // onSlideChange={() => console.log('slide change')}
                                        // onSwiper={(swiper) => console.log(swiper)}
                                    >
                                    {el.edges.map(post => {
                                        return (
                                            <SwiperSlide>
                                                <PostCard
                                                    post={post.node}
                                                    key={post.node.frontmatter.imdbid}
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                                    </Swiper>
                                </ul>
                            </li>
                        )
                    })}
                </ul>
            )
        }}
    />
);
export default PostsCategory

