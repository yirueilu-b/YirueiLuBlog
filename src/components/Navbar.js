import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Zoom from '@material-ui/core/Zoom';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from './Menu'

const Title = "YirueiLu's Blog";

const appBarStyle = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '10%',
            paddingRight: '10%',
        },
        paddingLeft: '0%',
        paddingRight: '0%',
    },
    iconButton1: {
        marginRight: theme.spacing(0),
        paddingLeft: 0
    },
    iconButton2: {
        marginRight: 0,
        marginLeft: 'auto'
    },
}));

const backToTopStyles = makeStyles((theme) => ({
    root: {
        zIndex: 100,
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function HideOnScroll(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({target: window ? window() : undefined});

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

function ScrollTop(props) {
    const {children, window} = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });
    const classes = backToTopStyles();

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({behavior: 'smooth', block: 'end'});
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default function BackToTop(props) {
    const classes = appBarStyle();
    return (
        <React.Fragment>
            <CssBaseline/>
            <HideOnScroll {...props}>
                <AppBar className={classes.root} color="default">
                    <Toolbar>
                        {/*{props.menu}*/}
                        {/*<Tooltip title="Menu">*/}
                            {/*<IconButton className={classes.iconButton1}*/}
                                        {/*edge="end"*/}
                                        {/*color="default"*/}
                                        {/*onClick={props.onToggleDark}>*/}
                                {/*<MenuIcon/>*/}
                            {/*</IconButton>*/}
                        {/*</Tooltip>*/}
                        <Menu/>
                        <Typography variant="h6">
                            {Title}
                        </Typography>
                        <Tooltip
                            title={props.theme.palette.type === "light" ? 'Switch to dark theme' : 'Switch to light theme'}>
                            <IconButton className={classes.iconButton2}
                                        edge="end"
                                        color="default"
                                        onClick={props.onToggleDark}>
                                {props.theme.palette.type === "light" ? <Brightness7Icon/> : <Brightness4Icon/>}
                            </IconButton>
                        </Tooltip>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Toolbar/>
            <ScrollTop {...props}>
                <Fab color="default" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon/>
                </Fab>
            </ScrollTop>
        </React.Fragment>
    );
}
