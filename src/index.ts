import { merge } from './merge.js';

const collection_1 = [1, 4, 7];
const collection_2 = [2, 5, 8];
const collection_3 = [9, 6, 3, 0];

console.log('Collection 1 (ascending):', collection_1);
console.log('Collection 2 (ascending):', collection_2);
console.log('Collection 3 (descending):', collection_3);
console.log('Merged result (ascending):', merge(collection_1, collection_2, collection_3));
