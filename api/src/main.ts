import './environment';
import { establishConnection } from './database';
import { createApi } from './api';

establishConnection(() => {
    createApi().listen(3000, () => console.log('API is listening on port 3000'));
});
