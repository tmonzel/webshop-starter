import './environment';
import { establishConnection } from './database';
import api from './api';

establishConnection();

api.listen(3000, () => console.log('API is listening on port 3000'));
