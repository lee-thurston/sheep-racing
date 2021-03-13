import { Racer } from '../racer';

const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('../config')
const endpoint = config.endpoint
const key = config.key
const databaseId = config.database.id
const containerId ='racer'

const client = new CosmosClient({ endpoint, key })

export const deleteRacerApi = async (twitchId: string) => {
  await client
    .database(databaseId)
    .container(containerId)
    .item(twitchId)
    .delete(twitchId)
};

export const updateRacerApi = async (racer:  Racer) => {

};

export const addRacerApi = async (racer: Racer) => {
  await client
    .database(databaseId)
    .container(containerId)
    .items.upsert(racer)
};

export const loadRacersApi = async () => {
  const querySpec = {
    query: 'SELECT * FROM racer',
  }

  const { resources: results } = await client
    .database(databaseId)
    .container(containerId)
    .items.query(querySpec)
    .fetchAll()

  return results;
};