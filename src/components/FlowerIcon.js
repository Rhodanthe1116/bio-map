import React from 'react'

import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as FlowerSvg } from '../img/flower.svg';

function FlowerIcon(props) {
    return (
        <SvgIcon
            component={FlowerSvg}
            viewBox="0 0 600 476.6"
            {...props}
        />
    )
}

export default FlowerIcon