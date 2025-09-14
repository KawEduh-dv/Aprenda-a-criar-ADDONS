import { world } from '@minecraft/server';

world.afterEvents.playerInteractWithEntity.subscribe(event => {
    const { player, target } = event; // quem clicou e a entidade

    if (target.typeId === 'tutorial:stone_golem') {
        player.sendMessage(`Um Golem de Pedra diz: Olá, Mundo!`);
    }
});
