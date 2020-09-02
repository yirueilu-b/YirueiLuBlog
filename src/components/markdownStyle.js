const useStyles = theme => ({
    root: {
        flexGrow: 1,
        minHeight: "90vh",
    },
    article_section: {
        marginTop: 50,
        marginBottom: 100
    },
    markdown_style: {
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
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '50%',
            },
        },
        "& .katex": {
            display: 'inline-block',
            maxWidth: '100%',
            overflowX: 'scroll',
            verticalAlign: 'middle',
        },
        // material ui css
        ...theme.typography.body1,
        color: theme.palette.text.primary,
        wordBreak: 'break-word',
        '& .anchor-link': {
            marginTop: -96, // Offset for the anchor.
            position: 'absolute',
        },
        '& pre': {
            margin: theme.spacing(3, 'auto'),
            padding: theme.spacing(2),
            direction: 'ltr',
            // borderRadius: theme.sh.borderRadius,
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch', // iOS momentum scrolling.
            maxWidth: 'calc(100vw - 32px)',
            [theme.breakpoints.up('md')]: {
                maxWidth: 'calc(100vw - 32px - 16px)',
            },
        },

        // inline code
        '& p': {
            '& code': {
                direction: 'ltr',
                lineHeight: 1.4,
                display: 'inline-block',
                fontFamily: 'Consolas, "Liberation Mono", Menlo, Courier, monospace',
                WebkitFontSmoothing: 'subpixel-antialiased',
                padding: '2px 6px',
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.type === 'light' ?
                    'rgba(0, 0, 0, 0.1)' :
                    'rgba(255, 255, 255, 0.1)',
                fontSize: '.85em',
                borderRadius: 2,
            },
            '& code[class*="language-"]': {
                backgroundColor: '#272c34',
                color: '#fff',
                // Avoid layout jump after hydration (style injected by prism)
                lineHeight: 1.5,

            }
        },

        // code blocks
        '& pre code': {
            fontSize: '1em',
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
        '& h1, & h2, & h3, & h4': {
            fontWeight: theme.typography.fontWeightBold,
            '& code': {
                fontSize: 'inherit',
                lineHeight: 'inherit',
                // Remove scroll on small screens.
                wordBreak: 'break-all',
            },
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