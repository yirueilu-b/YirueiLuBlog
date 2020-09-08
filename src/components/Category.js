import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import ScrollToTopOnMount from './ScrollTopOnMount'
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Fade from '@material-ui/core/Fade';

const useStyles = theme => ({
    root: {
        display: 'flex',
        marginTop: theme.spacing(4),
        marginBottom: '10vh',
        // minHeight: 800,
    },
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
                    <Grid container item xs={12} md={5} justify="center">
                        <ImgMediaCard title='Machine Leaning'
                                      image='https://s3.amazonaws.com/prod-www-blackline-com/blog/wp-content/uploads/2019/01/29163118/A-Conversation-With-BlackLines-Machine-Learning-Experts-720x405.jpg'/>
                    </Grid>
                    <Grid container item xs={12} md={5} justify="center">
                        <ImgMediaCard title='Web Application'
                                      image='https://webfoundation.org/docs/2017/03/March-12-Letter.jpg'/>
                    </Grid>
                    <Grid container item xs={12} md={5} justify="center">
                        <ImgMediaCard title='Coding'
                                      image='https://miro.medium.com/max/3118/1*iwPLQjyFYRTVeQ2cb4S9rA.png'/>
                    </Grid>
                    <Grid container item xs={12} md={5} justify="center">
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
    card_area:{
        display: 'flex',
        justifyContent: 'center',
    },
    overlay_text: {
        padding: 12,
        position: 'absolute',
        // bottom: 24,
        // left: 24,
        color: 'white',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    card_media: {
        height: 320,
        width: 480,
    }
});

function ImgMediaCard(props) {
    const classes = cardStyle();
    return (

        <Fade in={true} timeout={3000}>
            <Card className={classes.root}>
                <CardActionArea className={classes.card_area}>
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
        </Fade>
    );
}

export default withStyles(useStyles)(Category);
