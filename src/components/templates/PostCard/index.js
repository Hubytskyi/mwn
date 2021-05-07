import React from "react";
import {Link} from "gatsby"
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    title: {
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        overflow: "hidden"
    },
    description: {
        lineClamp: 5,
        overflow: "hidden",
        display: "-webkit-box",
        "-webkit-line-clamp": 5,
        "-webkit-box-orient": "vertical",
    },
    media: {
        height: 200,
    },
});
const PostCard = ({post}) => {
    const classes = useStyles();

    return (
        <Card>
            <CardActionArea>
                <Link to={'/' + post.frontmatter.slug}>
                    <CardMedia
                        className={classes.media}
                        image={post.frontmatter.featuredimage.childImageSharp.fluid.src}
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography className={classes.title} gutterBottom variant="h5" component="h2">
                            {post.frontmatter.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div"
                        >
                            <div className={classes.description} dangerouslySetInnerHTML={{__html: post.html}}/>
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Поділитися
                </Button>
                <Button size="small" color="primary">
                    <Link style={{color: "#3f51b5"}} to={'/' + post.frontmatter.slug}>Перейти</Link>
                </Button>
            </CardActions>
        </Card>
    );
}

export default PostCard