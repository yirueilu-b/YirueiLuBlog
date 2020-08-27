import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';


const blog_title = "YirueiLu's Blog";
const blog_description = "Some notes about web, machining learning and coding.";

const post = {
    title: 'Title of a longer featured blog post',
    description:
        "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
    image: 'https://source.unsplash.com/random',
    imgText: 'main image description',
};

const useStyles = makeStyles((theme) => ({
    mainFeaturedPost: {
        paddingLeft: '10%',
        paddingRight: '10%',
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: 287,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        textAlign: 'left',
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
            padding: theme.spacing(6),
            paddingRight: 0,
        },
    },
    iconButton1: {
        marginLeft: -12,
        // color: 'rgba(91, 192, 222, 1)',
        // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    iconButton2: {
        // marginLeft: 24,
        // color: 'rgba(91, 192, 222, 1)',
        // backgroundColor: 'rgba(0, 0, 0, 0.3)',
    }
}));

export default function MainFeaturedPost(props) {
    const classes = useStyles();
    // const {post} = props;

    return (
        <Paper
            className={classes.mainFeaturedPost}
            style={{backgroundImage: `url(${post.image})`}}
        >
            {/* Increase the priority of the hero background image */}
            {<img style={{display: 'none'}} src={post.image} alt='imageText'/>}
            <div className={classes.overlay}/>
            <Grid container>
                <Grid item md={6}>
                    <div className={classes.mainFeaturedPostContent}>
                        <Typography gutterBottom variant="h4" color="inherit" id="back-to-top-anchor">
                            {blog_title}
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" color="inherit">
                            {blog_description}
                        </Typography>
                        <Tooltip title='LinkedIn'>
                            <IconButton
                                className={classes.iconButton1}
                                edge="end"
                                color="inherit"
                                href='https://www.linkedin.com/in/a02496104/'
                            >
                                <LinkedInIcon/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title='Github'>
                            <IconButton
                                className={classes.iconButton2}
                                edge="end"
                                color="inherit"
                                href='https://github.com/yirueilu-b'
                            >
                                <GitHubIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </Grid>
            </Grid>
        </Paper>
    );
}

MainFeaturedPost.propTypes = {
    post: PropTypes.object,
};