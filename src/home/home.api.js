const steem = require('steem')

async function getFeed () {
  console.log('Requesting start');
  var response = await steem.api.getDiscussionsByTrendingAsync({ tag: "", limit: 10 })
  console.log(response);
  return response;
}

exports.getFeed = getFeed
