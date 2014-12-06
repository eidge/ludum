World = function() {
  this.$world = $("#world");
};

World.prototype.draw = function() {
  _this = this;

  $.each(world.players, function(key, player) {
    if(!player || !player.pos) return;

    player_ship = $('#' + key);
    if(!player_ship.length) {
      player_ship = $('<div id="' + key + '" class="ship"></div>');
      _this.$world.append(player_ship)
    }

    player_ship.css('left', player.pos.x);
    player_ship.css('top', player.pos.y);
  });
};
