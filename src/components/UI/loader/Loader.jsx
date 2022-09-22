import React from 'react';
import classes from './loader.module.css'

const Loader = () => {
    return (
        <div className={classes.loaderWrap}>
            <div className={classes.loader}></div>
        </div>
    );
};

export default Loader;