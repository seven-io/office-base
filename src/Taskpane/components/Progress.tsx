import React from 'react';
import {Spinner, SpinnerSize} from 'office-ui-fabric-react';

import {title} from '../constants';

export default function Progress() {
    return <section className='ms-welcome__progress ms-u-fadeIn500'>
        <img width='90' height='90' src='assets/logo-filled.png' alt=''/>

        <h1 className='ms-fontSize-su ms-fontWeight-light ms-fontColor-neutralPrimary'>{title}</h1>

        <Spinner size={SpinnerSize.large} label='Please sideload your addin to see app body.'/>
    </section>;
}
