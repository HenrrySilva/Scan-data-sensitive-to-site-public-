import { v4 as uuid } from 'uuid';
import { uuidAdapterContract } from './contracts/uuid-contract';

export const uuidAdapter: uuidAdapterContract = () => uuid()