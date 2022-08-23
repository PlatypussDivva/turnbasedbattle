export const wait = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

export const attack = ({ attacker, defender }) => {
  const receivedDamage =
    attacker.attack - (attacker.level - defender.level) * 1.25;

  const finalDamage = receivedDamage - defender.defense / 2;

  return finalDamage;
};

export const magic = ({ attacker, defender }) => {
  const receivedDamage =
    attacker.magic - (attacker.level - defender.level) * 1.25;

  const finalDamage = receivedDamage - defender.magicDefense / 2;

  return finalDamage;
};

export const heal = ({ defender }) => {
  return defender.magic + defender.level * 0.25;
};
