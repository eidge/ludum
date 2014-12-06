world = {
  last_id: 0,
  players: {},

  addPlayer: function() {
    this.last_id += 1;
    this.players['' + this.last_id] = {};
    return ''+this.last_id;
  }
};

module.exports = world;
