import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { applyMiddleware } from 'redux';

import auth from './auth';

export default applyMiddleware(
    thunk,
    logger,
    auth
)