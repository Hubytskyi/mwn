import React from "react";
import usePostsQuery from './postsQuery'
const algoliasearch = require("algoliasearch");

const client = algoliasearch("9MXQ9FB8OC", "7f602904f3ec1eae052e86b704e1f89c");
const index = client.initIndex("mwn");

const Nav = () => {

    const data = usePostsQuery()

    const newData = data.allMarkdownRemark.edges.map(el => {
        return {...el.node.frontmatter, objectID: el.node.id}
    })
    console.log(newData)

    index
        .saveObjects(newData)
        .then(({ objectIDs }) => {
            console.log(objectIDs);
        })
        .catch(err => {
            console.log(err);
        });



    return (
        <div>Nav</div>
    )
}

export default Nav