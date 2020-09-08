import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import ClassIcon from '@material-ui/icons/Class';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    list: {
        width: 264,
        marginTop: '30vh'
    },
    fullList: {
        width: 'auto',
    },
    iconButton1: {
        marginRight: theme.spacing(0),
        // paddingLeft: 0
    },
}));

export default function TemporaryDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const menu_items = {
        Blog: {
            icon:<HomeIcon/>,
            link:'/blog'
        },
        About: {
            icon:<AccountCircleIcon/>,
            link:'/about'
        },
        // Category: {
        //     icon:<ClassIcon/>,
        //     link:'/category'
        // },
    };
    // const listItems = Object.keys(tifs).map(function (key) {
    //     return <option value={key}>{tifs[key]}</option>
    // });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({...state, [anchor]: open});
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {/*<List>*/}
            {/*{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (*/}
            {/*<ListItem button key={text}>*/}
            {/*<ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>*/}
            {/*<ListItemText primary={text}/>*/}
            {/*</ListItem>*/}
            {/*))}*/}
            {/*</List>*/}
            {/*<Divider/>*/}
            <List>
                {Object.keys(menu_items).map((key, index) => (
                    <ListItem button component={Link} to={menu_items[key]['link']}  key={key}>
                        <ListItemIcon>{menu_items[key]['icon']}</ListItemIcon>
                        <ListItemText primary={key}/>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <div>
            <React.Fragment key={'left'}>
                {/*<Button >*/}
                <Tooltip title="Menu">
                    <IconButton
                        onClick={toggleDrawer('left', true)}
                        className={classes.iconButton1}
                        edge="end"
                        color="default"
                    >
                        <MenuIcon/>
                    </IconButton>
                </Tooltip>
                {/*</Button>*/}
                <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                    {list('left')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}