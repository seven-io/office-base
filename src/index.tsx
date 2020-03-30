import 'office-ui-fabric-react/dist/css/fabric.min.css';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import {initializeIcons} from 'office-ui-fabric-react/lib/Icons';

import Taskpane from './Taskpane/Taskpane';

initializeIcons();

let isOfficeInitialized = 'development' === process.env.NODE_ENV;

Office.initialize = () => {
    isOfficeInitialized = true;

    render();
};

render();

export default function render() {
    ReactDOM.render(
        <Taskpane isOfficeInitialized={isOfficeInitialized}/>,
        document.getElementById('container')
    );
}