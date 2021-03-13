import { User } from '../user';

const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('../config')
const endpoint = config.endpoint
const key = config.key
const databaseId = config.database.id
const containerId = 'user'

const client = new CosmosClient({ endpoint, key })

export const addUserApi = async (user: User) => {
    await client
    .database(databaseId)
    .container(containerId)
    .items.upsert(user)
};

export const loadUsersApi = async () => {
    // query to return all children in a family
    // Including the partition key value of lastName in the WHERE filter results in a more efficient query
    const querySpec = {
      query: 'SELECT * FROM users',
    }
  
    const { resources: results } = await client
      .database(databaseId)
      .container(containerId)
      .items.query(querySpec)
      .fetchAll()

    return results.map((user: any) => {
        return user.userName
    });
}