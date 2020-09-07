const useStyles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: "90vh",
    },
    article_section: {
        marginTop: 24,
        marginBottom: 24,
        borderBottom: `3px solid ${theme.palette.divider}`,
    },
    comment_section: {
        marginTop: 24,
        marginBottom: 100
    },
    disqus: {
        width: "100%",
        "& a": {
            color: "rgba(55, 168, 218, 1)"
        }
    },
    markdown_style: {
        lineHeight:'1.5em',
        padding: theme.spacing(3),
        maxWidth: "100%",
        textAlign: 'left',
        wordWrap: "break-word",
        "& img": {
            display: 'block',
            marginTop: 20,
            marginBottom: 20,
            // marginLeft: 'auto',
            // marginRight: 'auto',
            // width: '80%',
            // [theme.breakpoints.up('sm')]: {
            //     width: '100%',
            // },
        },
        "& .katex": {
            display: 'inline-block',
            maxWidth: '100%',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
            verticalAlign: 'middle',
        },
        // material ui css
        ...theme.typography.body1,
        color: theme.palette.text.primary,
        '& .anchor-link': {
            marginTop: -96, // Offset for the anchor.
            position: 'absolute',
        },
        '& pre': {
            margin: theme.spacing(3, 'auto'),
            padding: theme.spacing(2),
            background: '#2b2b2b',
            color: '#bababa',
            maxWidth: 'calc(100vw - 32px)',
            [theme.breakpoints.up('md')]: {
                maxWidth: 'calc(100vw - 32px - 16px)',
            },
        },

        // inline code
        '& *': {
            '& code': {
                display: 'inline-block',
                verticalAlign: 'middle',
                padding: '2px 6px',
                backgroundColor: theme.palette.type === 'light' ?
                    'rgba(0, 0, 0, 0.1)' :
                    'rgba(255, 255, 255, 0.1)',
                    'rgba(0, 0, 0, 0.1)' :
                    'rgba(255, 255, 255, 0.1)',
                fontSize: '.85em',
                lineHeight: 'inherit',
                wordBreak: 'break-all',
            },
            '& code[class*="language-"]': {
                overflowX: 'auto',
                WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
                backgroundColor: '#272c34',
                color: '#fff',
                // Avoid layout jump after hydration (style injected by prism)
                lineHeight: 1.5,
            }
        },
        '& .hljs': {
            whiteSpace: 'pre !important',
            wordBreak: 'keep-all !important',
            WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
            display: 'block',
            overflowX: 'auto',
            padding: '0.5em',
            background: '#2b2b2b',
            color: '#bababa',
        },
        // code blocks
        '& pre code': {
            whiteSpace: 'pre !important',
            wordBreak: 'keep-all !important',
            WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
            display: 'block',
            overflowX: 'auto',
            padding: '0.5em',
            background: '#2b2b2b',
            color: '#bababa',
        },
        '& .token.operator': {
            background: 'transparent',
        },
        '& h1': {
            paddingBottom: "16px",
            borderBottom: `1px solid ${theme.palette.divider}`,
            ...theme.typography.h3,
            fontSize: 40,
            margin: '16px 0',
        },
        '& .description': {
            ...theme.typography.h5,
            margin: '0 0 40px',
        },
        '& h2': {
            ...theme.typography.h4,
            fontSize: 30,
            margin: '40px 0 16px',
        },
        '& h3': {
            ...theme.typography.h5,
            margin: '40px 0 16px',
        },
        '& h4': {
            ...theme.typography.h6,
            margin: '32px 0 16px',
        },
        '& h5': {
            ...theme.typography.subtitle2,
            margin: '32px 0 16px',
        },
        '& p, & ul, & ol': {
            marginTop: 0,
            marginBottom: 16,
        },
        '& ul': {
            paddingLeft: 30,
        },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
            fontWeight: theme.typography.fontWeightBold,
            '& .anchor-link-style': {
                // To prevent the link to get the focus.
                display: 'none',
            },
            '&:hover .anchor-link-style': {
                display: 'inline-block',
                padding: '0 8px',
                color: theme.palette.text.secondary,
                '&:hover': {
                    color: theme.palette.text.primary,
                },
                '& svg': {
                    width: '0.7em',
                    height: '0.7em',
                    fill: 'currentColor',
                },
            },
        },
        '& table': {
            // Trade display table for scroll overflow
            display: 'block',
            wordBreak: 'normal',
            width: '100%',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
            borderCollapse: 'collapse',
            marginTop: '16px',
            marginBottom: '16px',
            borderSpacing: 0,
            overflow: 'hidden',
            '& .prop-name': {
                fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
            },
            '& .required': {
                color: theme.palette.type === 'light' ? '#006500' : '#a5ffa5',
            },
            '& .prop-type': {
                fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
                color: theme.palette.type === 'light' ? '#932981' : '#ffb6ec',
            },
            '& .prop-default': {
                fontFamily: 'Consolas, "Liberation Mono", Menlo, monospace',
                borderBottom: `1px dotted ${theme.palette.divider}`,
            },
        },
        '& td': {
            ...theme.typography.body2,
            border: `1px solid ${theme.palette.divider}`,
            padding: 12,
            color: theme.palette.text.primary,
        },
        '& td code': {
            lineHeight: 1.6,
        },
        '& th': {
            backgroundColor: theme.palette.type === 'light' ?
                'rgba(0, 0, 0, 0.1)' :
                'rgba(255, 255, 255, 0.1)',
            lineHeight: theme.typography.pxToRem(12),
            fontWeight: theme.typography.fontWeightBold,
            color: theme.palette.text.primary,
            whiteSpace: 'pre',
            border: `1px solid ${theme.palette.divider}`,
            borderBottom: `2px solid ${theme.palette.divider}`,
            padding: 12,
            textAlign: "left",
        },
        '& blockquote': {
            borderLeft: '2px solid rgba(55, 168, 218, 0.6)',
            backgroundColor: 'rgba(55, 168, 218, 0.2)',
            padding: '4px 24px',
            margin: '12px 0',
            '& p': {
                marginTop: '16px',
            },
        },
        '& a, & a code': {
            // Style taken from the Link component
            color: "rgba(55, 168, 218, 1)",
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
        '& img, video': {
            maxWidth: '100%',
        },
        '& hr': {
            height: 1,
            margin: theme.spacing(6, 0),
            border: 'none',
            flexShrink: 0,
            backgroundColor: theme.palette.divider,
        },
        '& kbd': {
            // Style taken from GitHub
            padding: '2px 5px',
            font: '11px Consolas,Liberation Mono,Menlo,monospace',
            lineHeight: '10px',
            color: '#444d56',
            verticalAlign: 'middle',
            backgroundColor: '#fafbfc',
            border: '1px solid #d1d5da',
            borderRadius: 3,
            boxShadow: 'inset 0 -1px 0 #d1d5da',
        },

    },
});

export default useStyles