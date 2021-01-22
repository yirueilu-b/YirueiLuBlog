import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import ArticleCard from './ArticleCard'
import Grid from '@material-ui/core/Grid';
import article_list from '../article_list.json'
import Pagination from '@material-ui/lab/Pagination';
import ScrollToTopOnMount from './ScrollTopOnMount'

import {Helmet} from 'react-helmet-async';
import Fade from '@material-ui/core/Fade';

const ARTICLE_PER_PAGE = 5;

const useStyles = theme => ({
    root: {
        display: 'flex',
        marginTop: '0vh',
        marginBottom: '10vh',
        // minHeight: 800,
    },
    card_grid: {
        margin: '24px 0',
    },
    pagination: {
        marginTop: 24,
        // sizeSmall: true,
        // [theme.breakpoints.up('sm')]: {
        //     sizeSmall: false
        // },
    }
});


class MediaControlCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articleList: [],
            currentArticleList: [],
            current_page: 1,
        };
    }

    componentDidMount() {
        let articleList = JSON.parse(article_list);
        this.setState({articleList: articleList});
        let start_point = ARTICLE_PER_PAGE * (this.state.current_page - 1);
        let end_point = start_point + ARTICLE_PER_PAGE;
        this.setState({currentArticleList: articleList.slice(start_point, end_point)});
    }

    handlePageChange = (event, value) => {
        window.scrollTo(0, 0, {behavior: 'smooth', block: 'end'});
        this.setState({current_page: value});
        let start_point = ARTICLE_PER_PAGE * (value - 1);
        let end_point = start_point + ARTICLE_PER_PAGE;
        this.setState({currentArticleList: this.state.articleList.slice(start_point, end_point)});
    };

    render() {
        const {classes} = this.props;
        let ArticleCards = [];
        for (let i = 0; i < this.state.currentArticleList.length; i++) {
            ArticleCards.push(
                <Fade in={true} timeout={1000} key={i}>
                    <Grid item xs={12} md={9} className={classes.card_grid}>
                        <ArticleCard
                            post_title={this.state.currentArticleList[i]["article_title"]}
                            post_datetime={this.state.currentArticleList[i]["article_datetime"]}
                            post_description={this.state.currentArticleList[i]["article_description"]}
                            image_url={this.state.currentArticleList[i]["article_cover_image_url"]}
                            // post_link={'blog/'+ this.state.currentArticleList[i]["article_md_path"]}
                            post_link={'blog/' + this.state.currentArticleList[i]["uuid"]}
                        />
                    </Grid>
                </Fade>
            )
        }

        return (
                <Container className={classes.root}>
                    <Helmet>
                        <title>YirueiLu's Blog</title>
                        <meta name="description"
                              content="Some notes about web applications, machine learning and coding"/>
                        <meta name="og:title" property="og:title" content="YirueiLu's Blog"/>
                        <meta name="og:description" property="og:description" content="Some notes about web applications, machine learning and coding"/>
                        <meta name="og:image" property="og:image" content={process.env.PUBLIC_URL + '/code.png'}/>
                    </Helmet>
                    <ScrollToTopOnMount/>
                    <Grid
                        container
                        spacing={0}
                        direction="row"
                        alignItems="flex-start"
                        justify="center"
                    >
                        {ArticleCards}

                        <Grid container item xs={12} md={9} justify="center">
                            <Pagination
                                onChange={this.handlePageChange}
                                defaultPage={1}
                                className={classes.pagination}
                                count={Math.ceil(this.state.articleList.length / ARTICLE_PER_PAGE)}
                                variant="outlined"
                                shape="rounded"
                                size='small'
                                hideNextButton={this.state.current_page === Math.ceil(this.state.articleList.length / ARTICLE_PER_PAGE)}
                                hidePrevButton={this.state.current_page === 1}
                                showFirstButton={this.state.current_page !== 1}
                                showLastButton={this.state.current_page !== Math.ceil(this.state.articleList.length / ARTICLE_PER_PAGE)}
                            />
                        </Grid>
                    </Grid>

                </Container>
        );
    }
}

export default withStyles(useStyles)(MediaControlCard);
