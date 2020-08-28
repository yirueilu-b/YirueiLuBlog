import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

const alignment = 'center';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align={alignment}>
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Yiruei Lu
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        // marginTop: theme.spacing(8),
        padding: theme.spacing(6, 0),
        textAlign: {alignment},
    },
    iconButton1: {
        marginLeft: -12,
    },
    iconButton2: {
    }
}));

export default function Footer(props) {
    const classes = useStyles();
    // const {description, title} = props;

    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Tooltip title='LinkedIn'>
                    <IconButton
                        className={classes.iconButton1}
                        edge="end"
                        color="inherit"
                        href='https://www.linkedin.com/in/a02496104/'
                        target='_blank'
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
                        target='_blank'
                    >
                        <GitHubIcon/>
                    </IconButton>
                </Tooltip>
                {/*<Typography variant="h6" align="center" gutterBottom>*/}
                {/*{title}*/}
                {/*</Typography>*/}
                {/*<Typography variant="subtitle1" align="center" color="textSecondary" component="p">*/}
                {/*{description}*/}
                {/*</Typography>*/}
                <Copyright/>
            </Container>
        </footer>
    );
}
