import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import ArticleCard from './ArticleCard'
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: '0vh',
        marginBottom: '10vh',
    },
    card_grid:{
        height: 320,
    }
}));

export default function MediaControlCard() {
    const classes = useStyles();

    const Articles = [];

    for (let i = 0; i <= 5; i++) {
        Articles.push(
            <Grid item xs={12} md={9} key={i} className={classes.card_grid}>
                <ArticleCard/>
            </Grid>
        )
    }

    return (
        <Container className={classes.root}>
            <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
            >
                {Articles}

            </Grid>
        </Container>
    );
}
