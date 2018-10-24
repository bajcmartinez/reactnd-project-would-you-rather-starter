import React from 'react';
import ReactLoading from 'react-loading';


import * as style from './Loading.module.scss';

export default function Loading() {
    return (
        <div className={style.loading}>
            <ReactLoading type="bars" color="#357edd" />
        </div>
    )
}

