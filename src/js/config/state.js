// TODO: https://codeincomplete.com/posts/javascript-game-foundations-state-management/
var cfg = {

  state: {
    initial: 'booting',
    events: [
      // { name: 'ready',  from: 'booting',               to: 'menu'     }, // initial page loads images and sounds then transitions to 'menu'
      // { name: 'start',  from: 'menu',                  to: 'starting' }, // start a new game from the menu
      // { name: 'load',   from: ['starting', 'playing'], to: 'loading'  }, // start loading a new level (either to start a new game, or next level while playing)
      // { name: 'play',   from: 'loading',               to: 'playing'  }, // play the level after loading it
      // { name: 'help',   from: ['loading', 'playing'],  to: 'help'     }, // pause the game to show a help topic
      // { name: 'resume', from: 'help',                  to: 'playing'  }, // resume playing after showing a help topic
      // { name: 'lose',   from: 'playing',               to: 'lost'     }, // player died
      // { name: 'quit',   from: 'playing',               to: 'lost'     }, // player quit
      // { name: 'win',    from: 'playing',               to: 'won'      }, // player won
      // { name: 'finish', from: ['won', 'lost'],         to: 'menu'     }  // back to menu
    ],
  },

  pubsub: [
    // { event: EVENT.MONSTER_DEATH,      action: function(monster, by, nuke) { this.onMonsterDeath(monster, by, nuke);     } },
    // { event: EVENT.GENERATOR_DEATH,    action: function(generator, by)     { this.onGeneratorDeath(generator, by);       } },
    // { event: EVENT.DOOR_OPENING,       action: function(door, speed)       { this.onDoorOpening(door, speed);            } },
    // { event: EVENT.DOOR_OPEN,          action: function(door)              { this.onDoorOpen(door);                      } },
    // { event: EVENT.TREASURE_COLLECTED, action: function(treasure, player)  { this.onTreasureCollected(treasure, player); } },
    // { event: EVENT.WEAPON_COLLIDE,     action: function(weapon, entity)    { this.onWeaponCollide(weapon, entity);       } },
    // { event: EVENT.PLAYER_COLLIDE,     action: function(player, entity)    { this.onPlayerCollide(player, entity);       } },
    // { event: EVENT.MONSTER_COLLIDE,    action: function(monster, entity)   { this.onMonsterCollide(monster, entity);     } },
    // { event: EVENT.PLAYER_NUKE,        action: function(player)            { this.onPlayerNuke(player);                  } },
    // { event: EVENT.PLAYER_FIRE,        action: function(player)            { this.onPlayerFire(player);                  } },
    // { event: EVENT.MONSTER_FIRE,       action: function(monster)           { this.onMonsterFire(monster);                } },
    // { event: EVENT.PLAYER_EXITING,     action: function(player, exit)      { this.onPlayerExiting(player, exit);         } },
    // { event: EVENT.PLAYER_EXIT,        action: function(player)            { this.onPlayerExit(player);                  } },
    // { event: EVENT.FX_FINISHED,        action: function(fx)                { this.onFxFinished(fx);                      } },
    // { event: EVENT.PLAYER_DEATH,       action: function(player)            { this.onPlayerDeath(player);                 } }
  ],
}