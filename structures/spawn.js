const typeUnits = require('config/type.units')

const Spawn = {
  run: (spawn) => {
    const typeCreeps = this.getTypeNewCreeps()

    if (typeCreeps) {
      this.createCreeps(spawn, typeCreeps)
    }

    if (spawn.spawning) {
      this.saySpawning(spawn, Game.creeps[spawn.spawning.name].memory.role)
    }
  },

  saySpawning: (spawn, text) => {
    spawn.room.visual.text(
      '🛠️' + text,
      spawn.pos.x + 1,
      spawn.pos.y,
      {
        align: 'left',
        opacity: 0.8
      }
    )
  },

  getTypeNewCreeps: () => {
    const creepsToRoom = spawn.room.find(FIND_MY_CREEPS)
    let countCreepsByType = {}

    for (const name in creepsToRoom) {
      const role = creepsToRoom[name].memory.role
      countCreepsByType[role] = (countCreepsByType[role] ?? 0) + 1;
    }

    // подумать как автоматизировать
    if (countCreepsByType['harvester'] && countCreepsByType['harvester'].length < 5) {
      return 'harvester'
    }

    if (countCreepsByType['upgrader'] && countCreepsByType['upgrader'].length < 5) {
      return 'upgrader'
    }

    if (countCreepsByType['builder'] && countCreepsByType['builder'].length < 5) {
      return 'builder'
    }

    return null
  },

  createCreeps: (spawn, typeCreeps) => {
    // получить всего в комноте сколько энергии в зданиях
    // исходя из максимума расчитать кого можем строить
    // проверить сколько энергии в расположение
    if (spawn.spawning || spawn.store.getUsedCapacity(RESOURCE_ENERGY) < 300) return

    spawn.spawnCreep(
      typeUnits[typeCreeps].body,
      typeUnits[typeCreeps].role + Game.time,
      // может как небудь сложить?
      {
        memory: {
          role: typeUnits[typeCreeps].role
        }
      }
    )
  }
}

module.exports = Spawn