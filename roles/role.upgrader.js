const roleUpgrader = {

  run: function(creep) {
    if (creep.store.getFreeCapacity() === 0) {
      const sources = creep.room.find(FIND_SOURCES);
      if(sources.length > 0 && creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0])
      }
    } else {
      if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller)
      }
    }
  }
}

module.exports = roleUpgrader