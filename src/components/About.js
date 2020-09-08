import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import ScrollToTopOnMount from './ScrollTopOnMount'
import Typography from '@material-ui/core/Typography';

const section_height = '80vw';
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
        // backgroundColor: theme.palette.background.paper,
    },
    profile: {
        "& h4":{
            padding: 24
        },
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '15vw',
            paddingRight: '15vw',
        },
        height: section_height,
        backgroundColor: 'rgba(55, 168, 218, 0.1)',
    },
    experience: {
        "& h4":{
            padding: 24
        },
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '15vw',
            paddingRight: '15vw',
        },
        height: section_height,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        // backgroundColor: theme.palette.background.paper,
    },
    project: {
        "& h4":{
            padding: 24
        },
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '15vw',
            paddingRight: '15vw',
        },
        height: section_height,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        // backgroundColor: theme.palette.background.paper,
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
                        <Typography variant='h4'>Profile</Typography>
                    </Grid>
                    <Grid className={classes.experience} container item xs={12} justify="flex-start">
                        <Typography variant='h4'>Experiences</Typography>
                    </Grid>
                    <Grid className={classes.project} container item xs={12} justify="flex-start">
                        <Typography variant='h4'>Projects</Typography>
                    </Grid>
                </Grid>

            </Container>
        );
    }
}


export default withStyles(useStyles)(About);
