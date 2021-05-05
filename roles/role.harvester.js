const roleHarvester = {
  run: function(creep) {
    // расфосовать по функциям
    if(creep.store.getFreeCapacity() > 0) {
      const sources = creep.room.find(FIND_SOURCES);
      // пытаемся копать. Пока не можем копать - едем к источнику
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], {
          visualizePathStyle: {stroke: '#ffaa00'}
        });
      }
    } else {
      // ищем какие строения еще не заполнены.
      // аккуратнее с башнями. Они ломаются постоянно сами.
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
      })

      if(targets.length !== 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], {
              visualizePathStyle: { stroke: '#ffffff' }
          });
        }
      }
    }
  }
};

module.exports = roleHarvester