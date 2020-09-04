import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid';
import ScrollToTopOnMount from './ScrollTopOnMount'


const useStyles = theme => ({
    root: {
        display: 'flex',
        marginTop: '10vh',
        marginBottom: '10vh',
        // minHeight: 800,
    },
});


class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }

    render() {
        const {classes} = this.props;

        return (
            <Container className={classes.root}>
                <ScrollToTopOnMount/>
                <Grid
                    container
                    spacing={0}
                    direction="row"
                    alignItems="flex-start"
                    justify="center"
                >
                    <Grid container item xs={12} md={9} justify="center">
                        <h1>About</h1>
                    </Grid>
                </Grid>

            </Container>
        );
    }
}

export default withStyles(useStyles)(About);
