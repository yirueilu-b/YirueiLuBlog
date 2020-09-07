import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import ScrollToTopOnMount from './ScrollTopOnMount'
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const useStyles = theme => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(4),
        marginBottom: '10vh',
        // minHeight: 800,
    },
    content: {
        // backgroundColor: theme.palette.background.paper,
    },
    ml: {
        "& h4": {
            padding: 24,
        },
        // height: '40vh',
        // backgroundColor: 'rgba(55, 168, 218, 0.1)',
    },
    web: {
        "& h4": {
            padding: 24
        },
        // height: '40vh',
        // backgroundColor: 'rgba(168, 55, 218, 0.1)',
        // backgroundColor: theme.palette.background.paper,
    },
    coding: {
        "& h4": {
            padding: 24
        },
        // height: '40vh',
        // backgroundColor: 'rgba(168, 218, 55, 0.1)',
        // backgroundColor: theme.palette.background.paper,
    },
    other: {
        "& h4": {
            padding: 24
        },
        // height: '40vh',
        // backgroundColor: 'rgba(55, 218, 168, 0.1)',
        // backgroundColor: theme.palette.background.paper,
    }
});


class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        const {classes} = this.props;

        return (
            <Container className={classes.root}>
                <ScrollToTopOnMount/>
                <Grid
                    container
                    spacing={4}
                    direction="row"
                    alignItems="center"
                    justify="center"
                >
                    <Grid className={classes.ml} container item xs={12} md={5} justify="center">
                        <ImgMediaCard title='Machine Leaning'
                                      image='https://s3.amazonaws.com/prod-www-blackline-com/blog/wp-content/uploads/2019/01/29163118/A-Conversation-With-BlackLines-Machine-Learning-Experts-720x405.jpg'/>
                    </Grid>
                    <Grid className={classes.web} container item xs={12} md={5} justify="center">
                        <ImgMediaCard title='Web Application'
                                      image='https://programmingnation.com/Assets/images/web-application.png'/>
                    </Grid>
                    <Grid className={classes.coding} container item xs={12} md={5} justify="center">
                        <ImgMediaCard title='Coding'
                                      image='https://miro.medium.com/max/3118/1*iwPLQjyFYRTVeQ2cb4S9rA.png'/>
                    </Grid>
                    <Grid className={classes.other} container item xs={12} md={5} justify="center">
                        <ImgMediaCard title='Others'
                                      image='https://www.popsci.com/resizer/BCzg7OFClEuOuXZzAVICvgYB538=/760x428/arc-anglerfish-arc2-prod-bonnier.s3.amazonaws.com/public/XQRMY2UEXZE4VACIXD7SUC2GBU.jpg'/>
                    </Grid>
                </Grid>

            </Container>
        );
    }
}

const cardStyle = makeStyles({
    root: {
        // maxWidth: 345,
        maxHeight: 300,
    },
    overlay_text: {
        padding:12,
        position: 'absolute',
        bottom: 24,
        left: 24,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    card_media:{
        height: 300,
        width: 400,
    }
});

function ImgMediaCard(props) {
    const classes = cardStyle();
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.card_media}
                    component="img"
                    image={props.image}
                />
                <Typography className={classes.overlay_text} variant="h5" component="h2">
                    {props.title}
                </Typography>
            </CardActionArea>
        </Card>
    );
}

export default withStyles(useStyles)(Category);
