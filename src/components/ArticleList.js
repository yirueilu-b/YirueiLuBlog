import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import ArticleCard from './ArticleCard'
import Grid from '@material-ui/core/Grid';
import article_list from '../article_list.json'


const useStyles = {
    root: {
        display: 'flex',
        marginTop: '0vh',
        marginBottom: '10vh',
    },
    card_grid: {
    }
};

class MediaControlCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
        };
    }

    componentDidMount() {
        this.setState({articleList: JSON.parse(article_list)});
    }

    render() {
        const {classes} = this.props;
        let ArticleCards = [];
        for (let i = 0; i < this.state.articleList.length; i++) {
            ArticleCards.push(
                <Grid item xs={12} md={9} key={i} className={classes.card_grid}>
                    <ArticleCard
                        post_title={this.state.articleList[i]["article_title"]}
                        post_datetime={this.state.articleList[i]["article_datetime"]}
                        post_description={this.state.articleList[i]["article_description"]}
                        image_url={this.state.articleList[i]["article_cover_image_url"]}
                        post_link="#"
                    />
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
                    {ArticleCards}

                </Grid>
            </Container>
        );
    }
}

export default withStyles(useStyles)(MediaControlCard);
