# Progress Quest Next

- [Demo](https://greenya.github.io/pqnext/)
- Original idea: [ProgressQuest](http://progressquest.com/)
- Awesome reincarnation: [pq-cli](https://github.com/rr-/pq-cli)

## Screenshot

![Screenshot](screenshot.png)

## Bundle

```
deno run --unstable --allow-net --allow-read --allow-write bundle.ts
```

## Debug

```
deno run debug.ts
```

## Todos and Ideas

- remove "giants"
- add human mobs
- add more mobs to swamp and water biomes

- add value to attributes:
    + str (more bag slots),
    - dex (lesser chance to die),
    - int (more mana allows longer non-stop combat; each mob takes 20 mana; when no mana -> eat-and-drink action)
- add dying; on death -> run to corpse (50% of town distance) -> eat-and-drink
- add chance to fail when fighting mob; removes a lot of gear durability and takes time to run to corpse

- add gear durability and its loss, when < 10% (?) => move-to-town; add need for repair while in town (chance if durability < 50%)
- add unique/rare mobs with notable loot
- add spell book
- add quest log
- add travel distance tracking
- add achivements (e.g. Hit Level 10 yay!, Killed 1000 mobs!, First gold coin!, Travelled 1 km! etc.)
- add Underground zone type with worms, skeletons, zombies, witches, fire giants etc
- add legendary items; unique names and maybe stats/effects; maybe obtainable only from high-end quests (?)
- add gear item flavor text generation (for rare+ with small chance)
- maybe add ability to choose geneder (male/female); action texts should be enchanced to support it

- web: fix item attributes order in the tooltip; should be consistent; maybe use array (for item.gear.attr), not an object

- add perks; player can choose one at start when creating hero; each perk has pros and cons, examples:
    - Quest hater (pro: more exp from killing mobs; con: chance to skip getting quest)
    - Quest lover (pro: higher chance progressing quest on mob kill; con: higher chance to die from mobs)
    - Mythic raider (pro: all mobs you kill always progresses quest; con: part of your bag is reserved for consumables)
    - Iron man (pro: never die from mobs; con: use only Poor and Common gear)
    - Pack mule (pro: more bag slots; con: traveling from wilderness to town takes much longer)
    - Looter (pro: higher chance for mob to drop an item; con: never get gear as quest reward)
    - Tinker (pro: gear is indestructible; con: run from town on death)
    - Steel bladder (pro: lesser chance to go afk; con: high chance to forget to repair gear while in town)
    - Roleplayer (pro: move faster between town and wilderness; con: chance to start roleplaying while in town) // "roleplaying" is a special time consuming "afk" action
    - Mailbox dancer (pro: you get gold for afk actions; con: chance to start dancing on mail box while in town) // "dancing on mail box" is a special time consuming "afk" action
    - Minmaxer (pro: chance to one-shot a mob; con: chance to start minmaxing while in town) // "minmaxing" is a special time consuming "afk" action

- some con: you lose all items in the bag on death
- some pro: chance of getting higher quality rings and necklaces

- base chance to die from a mob is 10% (?) and more dex decreases this chance (?)
