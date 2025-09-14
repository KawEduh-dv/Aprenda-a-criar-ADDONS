// Importe BlockPermutation junto com os outros módulos
import { world, system, BlockPermutation } from "@minecraft/server";

world.afterEvents.itemUse.subscribe(event => {
    const { itemStack, source } = event;
    if (itemStack.typeId === "tutorial:ruby_pickaxe") {
        const block = source.getBlockFromViewDirection()?.block
        world.sendMessage(`${block.getTags()}`);
    }
});


world.afterEvents.entitySpawn.subscribe(event => {
    const { entity } = event;
    if (entity.typeId === "tutorial:stone_golem") {
        // Envia uma mensagem para o chat
        world.sendMessage(`§6[Golem de Pedra]:§r Olá, Mundo!`);
    }
});

world.afterEvents.playerPlaceBlock.subscribe((event) => {
    const { block, dimension } = event;

    if (block.typeId === "minecraft:carved_pumpkin") {
        const blockBelow = block.below();

        if (blockBelow && blockBelow.typeId === "minecraft:stone") {
            system.run(() => {
                const blockLocation = block.location;

                block.dimension.runCommand(`gamerule dotiledrops false`);
                block.dimension.runCommand(`fill ${blockLocation.x} ${blockLocation.y} ${blockLocation.z} ${blockLocation.x} ${blockLocation.y-1} ${blockLocation.z} air 0 destroy`);
                block.dimension.runCommand(`gamerule dotiledrops true`);

                // block.setPermutation(BlockPermutation.resolve('minecraft:air'));

                // blockBelow.setPermutation(BlockPermutation.resolve('minecraft:air'));

                dimension.spawnEntity("tutorial:stone_golem", {
                    x: blockLocation.x + 0.5,
                    y: blockLocation.y - 1,
                    z: blockLocation.z + 0.5,
                });
            });
        }
    }
});