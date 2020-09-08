import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import ScrollToTopOnMount from './ScrollTopOnMount'
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';

const section_padding_small = '5vh 10vw';
const section_padding = '20vw';
const section_divider = '1px';
const useStyles = theme => ({
    root: {
        display: 'flex',
        padding: 0,
        maxWidth: '100vw',
    },
    content: {
        // [theme.breakpoints.up('sm')]: {
        //     paddingLeft: '10vw',
        //     paddingRight: '10vw',
        // },
    },
    profile: {
        padding: section_padding_small,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: section_padding,
            paddingRight: section_padding,
        },
        borderBottom: `${section_divider} solid ${theme.palette.divider}`,
        backgroundImage: theme.palette.type === 'dark' ?
            'url(https://thumbs.gfycat.com/UnequaledLazyGrayreefshark-size_restricted.gif)' :
            'url(https://thumbs.gfycat.com/FrightenedNaughtyDarwinsfox-size_restricted.gif)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    experience: {
        padding: section_padding_small,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: section_padding,
            paddingRight: section_padding,
        },
        borderBottom: `${section_divider} solid ${theme.palette.divider}`,
    },
    project: {
        padding: section_padding_small,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: section_padding,
            paddingRight: section_padding,
        },
    }
});


class About extends React.Component {
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
                    className={classes.content}
                    container
                    spacing={0}
                    direction="row"
                    alignItems="flex-start"
                    justify="center"
                >
                    <Grid className={classes.profile} container item xs={12} justify="flex-start">
                        <Profile/>
                    </Grid>
                    <Grid className={classes.experience} container item xs={12} justify="flex-start">
                        <Experience/>
                    </Grid>
                    <Grid className={classes.project} container item xs={12} justify="flex-start">
                        <Project/>
                    </Grid>
                </Grid>

            </Container>
        );
    }
}

const profileStyle = makeStyles((theme) => ({
    root: {
        '& * h5': {
            fontWeight: 500,
        }
    },
    left: {
        // height: '100%',
        textAlign: 'center',
    },
    right: {
        // height: '100%',
        textAlign: 'left',
    },
    right1: {},
    right2: {
        marginTop: 24,
    },
    avatar: {
        margin: theme.spacing(5),
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));

function Profile(props) {
    const classes = profileStyle();

    return (
        <Fade in={true} timeout={3000}>
            <Grid
                className={classes.root}
                container
                spacing={0}
                alignItems="center"
                justify="center"
            >
                <Grid className={classes.left} container item xs={12} md={4} justify="center" alignItems="center">
                    {/*<Avatar className={classes.avatar} alt="Yi-Ruei, Lu" src={process.env.PUBLIC_URL + '/code.ico'}/>*/}
                    <Avatar className={classes.avatar}/>
                </Grid>
                <Grid className={classes.right} container item xs={12} md={8} justify="flex-start">
                    <Grid container item xs={12} justify="flex-start" alignItems="flex-start">
                        <Typography gutterBottom variant='h5'>About Me</Typography>
                        <Typography gutterBottom variant='subtitle1'>I am a software engineer in Institute for
                            Information Industry ( III ) and I am responsible for developing web applications and
                            researching the latest deep learning algorithms.</Typography>
                    </Grid>
                    <Grid className={classes.right2} container item xs={12} justify="flex-start"
                          alignItems="flex-start">
                        <Typography gutterBottom variant='h5'>Skills</Typography>
                        <Typography gutterBottom variant='subtitle1'>Skilled in Python and JavaScript, Hands-on
                            experience in Django and Flask, Familiar with Deep Learning algorithms, Hands-on experience
                            in Tensorflow and Keras, Strong background knowledge of Computer Science</Typography>
                    </Grid>
                </Grid>

            </Grid>
        </Fade>
    );
}

const experienceStyles = makeStyles((theme) => ({
    root: {
        // wordBreak: 'break-word',
        marginBottom: 48,
        '& * h4, & * h5': {
            fontWeight: 500,
        }
    },
    title: {
        borderBottom: `5px solid rgba(55, 168, 218, 0.3)`,
        marginTop: 48,
        textAlign: 'left',
    },
    detail: {
        marginTop: 24,
        textAlign: 'left',
    },
    logo: {
        marginTop: 24,
    },
    avatarLogo: {
        backgroundColor: theme.palette.type === 'dark' ?
            'rgba(250, 250, 250, 0.87)' :
            'rgba(187, 187, 187,0.87)',
        width: theme.spacing(12),
        height: theme.spacing(12),
        marginTop: 24,
    }
}));

function Experience() {
    const classes = experienceStyles();

    return (
        <Fade in={true} timeout={3000}>
            <Grid
                className={classes.root}
                container
                spacing={0}
                alignItems="flex-start"
                justify="flex-start"
            >
                <Grid className={classes.title} container item xs={12} justify="flex-start"
                      alignItems="flex-start">
                    <Typography gutterBottom variant='h4'>Work Experience</Typography>
                </Grid>

                <Grid container item xs={12} justify="flex-start" alignItems="flex-start">

                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Grid className={classes.logo} container item xs={12} md={3} justify="center">
                            <Avatar className={classes.avatarLogo}
                                    alt="Institute for Information Industry"
                                    src="https://www.dtataiwan.org/img/back/original/aboutMember2/2020-06-30/20200630151150218.png"/>
                        </Grid>
                        <Grid className={classes.detail} item xs={12} md={9}>
                            <Typography gutterBottom variant='h5'>
                                Institute for Information Industry
                            </Typography>
                            <Typography gutterBottom variant='subtitle1'>
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Grid className={classes.logo} container item xs={12} md={3} justify="center">
                            <Avatar className={classes.avatarLogo}
                                    alt="Institute of Information Science, Academia Sinica"
                                    src="https://d13i5xhouzkrd.cloudfront.net/assets/publisher-logos/logo-asiis-color.png"/>
                        </Grid>
                        <Grid className={classes.detail} item xs={12} md={9}>
                            <Typography display='block' gutterBottom variant='h5'>
                                Institute of Information Science, Academia Sinica
                            </Typography>
                            <Typography display='block' gutterBottom variant='subtitle1'>
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid className={classes.title} container item xs={12} md={12} justify="flex-start"
                      alignItems="flex-start">
                    {/*<Avatar className={classes.avatar} alt="Yi-Ruei, Lu" src={process.env.PUBLIC_URL + '/code.ico'}/>*/}
                    <Typography gutterBottom variant='h4'>Education</Typography>
                </Grid>

                <Grid container item xs={12} md={12} justify="flex-start">
                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Grid className={classes.logo} container item xs={12} md={3} justify="center">
                            <Avatar className={classes.avatarLogo}
                                    alt="Institute for Information Industry"
                                    src="https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/NCTU_emblem.svg/1200px-NCTU_emblem.svg.png"/>
                        </Grid>
                        <Grid className={classes.detail} item xs={12} md={9}>
                            <Typography gutterBottom variant='h5'>
                                National Chiao Tung University
                            </Typography>
                            <Typography gutterBottom variant='subtitle1'>
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} justify="center" alignItems="center">
                        <Grid className={classes.logo} container item xs={12} md={3} justify="center">
                            <Avatar className={classes.avatarLogo}
                                    alt="Institute for Information Industry"
                                    src="https://wwwtve.ntut.edu.tw/var/file/90/1090/msys_1090_3212376_26605.png"/>
                        </Grid>
                        <Grid className={classes.detail} item xs={12} md={9}>
                            <Typography gutterBottom variant='h5'>
                                National Taipei University of Technology
                            </Typography>
                            <Typography gutterBottom variant='subtitle1'>
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                                Here is some descriptions of the experience in this section
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Fade>
    );
}

const pojectStyle = makeStyles({
    root: {
        display: 'flex',
        margin: '24px 0',
        width: '100%',
        height: 250,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
});

const pojects_info = [
    {
        image: 'https://cdn-images-1.medium.com/max/500/1*q1uVc-MU-tC-WwFp2yXJow.gif',
        title: 'Real-time Object Detection',
    },
    {
        image: 'https://thumbs.gfycat.com/DimSarcasticCockerspaniel-size_restricted.gif',
        title: 'Segmentation on Traffic',
    },
    {
        image: 'https://1.bp.blogspot.com/-H71UdvAObkQ/XVrSxUc2rFI/AAAAAAAAEhU/h7NuEZ23Pu4XAdwCcaKNxakGbN4nJUc2wCLcBGAs/s400/image2.gif',
        title: 'Hand Tracking and Gesture Recognition',
    },
    {
        image: 'https://thumbs.gfycat.com/CoordinatedDentalIggypops-max-1mb.gif',
        title: 'Stock Price Prediction',
    }
];

function Project(props) {
    const classes = pojectStyle();
    let ProjectCards = [];
    for (let i = 0; i < pojects_info.length; i++) {
        ProjectCards.push(
            <Grid key={i} className={classes.left} container item xs={12} justify="center">
                <Fade in={true} timeout={3000}>
                    <div className={classes.root}>
                    </div>
                </Fade>
            </Grid>
        )
    }
    return (
        <React.Fragment>
            {ProjectCards}
        </React.Fragment>
    );
}

export default withStyles(useStyles)(About);
