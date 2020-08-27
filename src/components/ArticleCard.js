import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        display: 'flex',
        backgroundColor: theme.palette.background.default,
    },
    card_image: {
        width: '40%',
    },
    card_info: {
        display: 'flex',
        flexDirection: 'column',
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.divider,
        width: '100%',
    },
    card_title: {
        textAlign: 'left',
    },
    card_detail: {
        textAlign: 'right',
    },
    read_button: {
        backgroundColor: 'rgba(56, 163, 216, 1)',
        color: 'white'
    },

}));

export default function MediaControlCard(props) {
    const classes = useStyles();
    return (
        <Card className={classes.root} elevation={0} square={true}>
            <Hidden xsDown>
                <CardMedia
                    className={classes.card_image}
                    image={props.image_url}
                    title=""
                />
            </Hidden>
            <div className={classes.card_info}>
                <CardContent className={classes.card_title}>
                    <Typography gutterBottom variant="h5">
                        {props.post_title}
                    </Typography>
                    <Typography gutterBottom component='h1' variant="caption" color="textSecondary">
                        {props.post_datetime}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {props.post_description}
                    </Typography>
                </CardContent>
                <CardContent className={classes.card_detail}>
                    <Button
                        className={classes.read_button}
                        size="small"
                        variant="contained"
                        endIcon={<ArrowForwardIosIcon style={{fontSize: 12, paddingLeft: 1}}/>}
                        href={props.post_link}
                    >
                        READ MORE
                    </Button>
                </CardContent>
            </div>
        </Card>
    );
}
