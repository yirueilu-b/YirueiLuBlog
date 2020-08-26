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
        flex: '1 0 auto',
        textAlign: 'left',
    },
    card_detail: {
        flex: '1 0 auto',
        textAlign: 'right',
        textJustify: 'bottom',
        VerticalAlign: 'text-bottom',
    },
    read_button: {
        backgroundColor: 'rgba(56, 163, 216, 1)',
        color: 'white'
    },

}));

export default function MediaControlCard() {
    const classes = useStyles();
    return (
        <Card className={classes.root} elevation={0} square={true}>
            <Hidden xsDown>
                <CardMedia
                    className={classes.card_image}
                    image="https://miro.medium.com/max/3118/1*iwPLQjyFYRTVeQ2cb4S9rA.png"
                    title="Live from space album cover"
                />
            </Hidden>
            <div className={classes.card_info}>
                <CardContent className={classes.card_title}>
                    <Typography gutterBottom variant="h5">
                        This Is a Demo Post Card, Here Is Title
                    </Typography>
                    <Typography gutterBottom component='h1' variant="caption" color="textSecondary">
                        2020-08-26 10:30 AM
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Some description about this post here, get this description from reading the cleaned up file
                        which is generated from all markdown files.
                    </Typography>
                </CardContent>
                <CardContent className={classes.card_detail}>
                    <Button className={classes.read_button}
                        size="small"
                        variant="contained"
                        endIcon={<ArrowForwardIosIcon style={{fontSize: 12, paddingLeft: 1}}/>}
                    >
                        READ MORE
                    </Button>
                    {/*<Button className={classes.read_button}*/}
                            {/*size="small"*/}
                            {/*variant="contained"*/}
                            {/*href="#contained-buttons"*/}
                            {/*color="default"*/}
                    {/*>*/}
                        {/*<Typography variant="button" color="textSecondary">*/}
                            {/*READ MORE*/}
                        {/*</Typography>*/}
                        {/*<ArrowForwardIosIcon color="primary" style={{fontSize: 12, paddingLeft: 1}}/>*/}
                    {/*</Button>*/}
                </CardContent>
            </div>
        </Card>
    );
}
