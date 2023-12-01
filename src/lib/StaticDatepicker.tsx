import { FC, useEffect } from 'react'
import { StaticDatepickerProps } from './types'
import useDatepicker from './useDatepicker'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(() => ({
    root: {
        position: 'relative'
    }
}))

const StaticDatepicker: FC<StaticDatepickerProps> = ({ renderInput: _renderInput, ...props }) => {
    const { Component, LoadingOverlayComponent, handleMonthChange } = useDatepicker(props)
    const classes = useStyles()

    useEffect(() => {
        handleMonthChange()
    }, [])

    return (
        <div className={classes.root}>
            {Component}
            {LoadingOverlayComponent}
        </div>
    )
}

StaticDatepicker.defaultProps = {
    displayStaticWrapperAs: 'static',
    dateFormat: 'MMM DD, YYYY',
    views: ['year', 'month', 'date'],
    showToolbar: false,
    allowKeyboardControl: false
}

export default StaticDatepicker
