import { FC } from 'react'
import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { alpha } from '@mui/material/styles'

const useStyles = makeStyles(({ spacing, palette: { background: { paper }, grey } }: Theme) => ({
    root: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 54,
        bottom: 0,
        zIndex: 1,
        backgroundColor: alpha(paper, 0.7),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dots: {
        position: 'relative',
        '& $dot1, & $dot2, & $dot3': {
            top: 0,
            position: 'absolute',
            width: spacing(1),
            height: spacing(1),
            borderRadius: spacing(0.5),
            backgroundColor: grey[500],
            animationName: '$dot-loading',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationDuration: '0.6s'
        }
    },
    dot1: {
        left: 0
    },
    dot2: {
        left: spacing(-3),
        animationDelay: '-0.15s'
    },
    dot3: {
        left: spacing(3),
        animationDelay: '0.15s'
    },
    '@keyframes dot-loading': {
        '0%, 50%, 100%': { transform: 'scale(1)' },
        '25%': { transform: 'scale(1.25)' },
        '75%': { transform: 'scale(0.75)' }
    }
}))

const Loading: FC = () => {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <div className={classes.dots}>
                <div className={classes.dot1} />
                <div className={classes.dot2} />
                <div className={classes.dot3} />
            </div>
        </div>
    )
}

export default Loading
