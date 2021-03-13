import { Race } from '../race';
import { Racer } from '../racer';
import * as racerService from '../services/racerService';

const CosmosClient = require('@azure/cosmos').CosmosClient
const config = require('../config')
const endpoint = config.endpoint
const key = config.key
const databaseId = config.database.id
const trueskill = require('trueskill');
const client = new CosmosClient({ endpoint, key })

export const addRaceApi = async (racerNames: string[]) => {

  const racers: Racer[] = await racerService.loadRacersApi();

  var filtered = racers.filter((racer) => {
        return racerNames.indexOf(racer.name) > -1;
      }
  );

  const players = filtered.map(racer => {
      return {
          id: racer.id,
          name: racer.name,
          twitchId: racer.twitchId,
          skill: [racer.ratingMu, racer.ratingSigma],
          rank: racerNames.indexOf(racer.name) 
      }
  })

  trueskill.AdjustPlayers(players);

  players.forEach(async (player) => {
    await client
    .database(databaseId)
    .container('racer')
    .item(player.id).replace({
      id: player.id,
      name: player.name,
      twitchId: player.twitchId,
      ratingMu: player.skill[0],
      ratingSigma: player.skill[1]
    })
  });

  const races = await GetRacesApi();

  const results = {
      raceId: races.length,
      positions: racerNames.map(racer => {
        return {
            racerName: racer,
            position: racerNames.indexOf(racer)
            }
        })
    }

  await client
  .database(databaseId)
  .container('race')
  .items.upsert(results)
};

export const GetRacesApi = async (): Promise<Race[]> => {
  const querySpec = {
    query: 'SELECT * FROM racer',
  }

  const { resources: results } = await client
    .database(databaseId)
    .container('race')
    .items.query(querySpec)
    .fetchAll()

  return results;
};