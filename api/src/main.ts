import './environment';
import { establishConnection } from './database';
import api from './api';

establishConnection();
 
const port = process.env.PORT || 3000
api.listen(port, () => console.log(`API is listening on port ${port}`));
