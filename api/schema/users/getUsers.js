const { GraphQLInt, GraphQLList, GraphQLString } = require('graphql');
const { createLimitedQuery, db } = require('../../db');
const { User } = require('./type');

const getUsers = {
  args: {
    limit: {
      type: GraphQLInt,
    },
    search: {
      type: GraphQLString,
    },
  },
  description: 'Search for a user by part of their username',
  resolve: (_, { limit, search }) =>
    createLimitedQuery(
      db
        .table('users')
        .filter(user => user('username').match(`(?i)${search}`))
    )(limit)
      .run(),
  type: new GraphQLList(User),
};

module.exports = getUsers;
