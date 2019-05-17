const { merge } = require('lodash');
const { normalize, denormalize, schema } = require('normalizr');

/** Simulated Store */
let store = {};
const populateEntities = (entities) => {
  store = merge(store, entities);
};

/** ============ Entities - Start ============ */
/**
 * Builder Entity
 */
const builderEntity = new schema.Entity(
  'builders',
  {},
  { idAttribute: 'builderId' },
);
/**
 * Community Entity
 */
const communityEntity = new schema.Entity(
  'communities',
  {},
  { idAttribute: 'communityId' },
);
/** ============ Entities - End ============ */

/** ============ Schema Definition - Start ============ */
builderEntity.define({
  communities: [communityEntity],
});
communityEntity.define({
  builder: builderEntity,
});
/** ============ Schema Definition - End ============ */

/** ============ Entities to be normalized - Start ============ */
const builder = {
  builderId: 11650,
  communities: [{
    communityId: 123,
    communityName: 'Test',
  }],
};
const community = {
  communityId: 123,
  communityName: 'Test',
  builder: {
    builderId: 11650,
    builderName: 'Test',
  },
};
/** ============ Entities to be normalized - End ============ */


/** ============ Normalizing entities - Start ============ */
const builderNormalized = normalize(builder, builderEntity);
populateEntities(builderNormalized.entities);

const communityNormalized = normalize(community, communityEntity);
populateEntities(communityNormalized.entities);
/** ============ Normalizing entities - End ============ */


/** ============ Denormalizing entities - Start ============ */
console.log(denormalize(11650, builderEntity, store));
/** ============ Denormalizing entities - end ============ */
