const roleHarvester = require('roles/role.harvester')
const roleUpgrader = require('roles/role.upgrader')
const roleBuilder = require('roles/role.builder')
const structureSpawn = require('structures/spawn')

module.exports.loop = function () {
  // запускаем цикл по всем нашим спавнам
  for (let name in Game.spawns) {
    const spawn = Game.spawns[name]
    structureSpawn.run(spawn)
  }

  // запускаем цикл по всем нашим юнитам
  for (let name in Game.creeps) {
    const creep = Game.creeps[name]

    switch (creep.memory.role) {
      case 'harvester':
        roleHarvester.run(creep)
        break
      case 'upgrader':
        roleUpgrader.run(creep)
        break
      case 'builder':
        roleBuilder.run(creep)
        break
    }

  }
}