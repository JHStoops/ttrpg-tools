# ttrpg-tools

[![Npm package version](https://badgen.net/npm/v/ttrpg-tools)](https://npmjs.com/package/ttrpg-tools)
[![Npm package total downloads](https://badgen.net/npm/dt/ttrpg-tools)](https://npmjs.com/package/ttrpg-tools)
[![GitHub issues](https://img.shields.io/github/issues/jhstoops/ttrpg-tools.svg)](https://GitHub.com/jhstoops/ttrpg-tools/issues/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/jhstoops/ttrpg-tools/graphs/commit-activity)
[![Maintainer](https://img.shields.io/badge/maintainer-JHStoops-blue)](https://GitHub.com/jhstoops)
[![Twitter](https://badgen.net/badge/icon/twitter?icon=twitter&label)](https://twitter.com/jhstoops)

Library for generating random dice rolls, NPCs, towns, names, etc. for TTRPG campaigns.

1. [How To Import](#how-to-import)
2. [API](#api)
    - [Standard Dice](#standard-dice)
    - [Custom Dice](#custom-dice)
    - [Coin Flips](#coin-flips)
    - [Name Generators](#name-generators)
    - [NPC Generator](#npc-generator)
    - [Town Generator](#town-generator)
3. [Supported Races](#supported-races)
4. [Supported Classes](#supported-classes)
5. [Contribute](#contribute)
6. [Contact Information](#contact-information)

## How to Import

ES Module

```js
import ttrpgTools from 'ttrpg-tools' // default export

const {
  coin, d4, d6, d8, d10, d12, d20, d100, diceRoll,
  generateNpcName, generateTownName, generateNpc,
  generateTown
} = ttrpgTools
```

CommonJS

```js
const {
  coin, d4, d6, d8, d10, d12, d20, d100, diceRoll,
  generateNpcName, generateTownName, generateNpc,
  generateTown
} = require('ttrpg-tools').default
```

## API

### Standard Dice

```js
import ttrpgTools from 'ttrpg-tools'

const { d4, d6, d8, d10, d12, d20, d100 } = ttrpgTools

const d4Roll = d4() // Defaults to a single die
const d6RollThreeDice = d6(3)
const d8RollFiveDiceVerbose = d8(5, true)
const d10Roll = d10()
const d12Roll = d12()
const d20Roll = d20()
const d100Roll = d100()
```

```json
// d4 roll - single die
{ "4": 3 }

// d6 roll - three dice
{ "6": 15 }

// d8 roll - five dice, verbose
{ "8": {
  "rolls": [3, 7, 4, 8, 6],
  "total": 28
}}

// d10 roll - single die
{ "10": 8 }

// d12 roll - single die
{ "12": 5 }

// d20 roll - single die
{ "20": 16 }

// d100 roll - single die
{ "100": 42 }
```

#### _Parameters: d4, d6, d8, d10, d12, d20, and d100_

| Property | Type | Description |
| -------- | ---- | ----------- |
| dieCount | Number | How many dice to roll. Default: 1 |
| verbose | Boolean | Whether to return an object with individual roll results and total. |

### Custom Dice

```js
import ttrpgTools from 'ttrpg-tools'

const { diceRoll } = ttrpgTools

const rollManyDieTypes = diceroll({
  "4": 2,
  "6": 1,
  "8": 2,
  "10": 3,
  "12": 1,
  "42": 1
}, true)
```

```json
// diceRoll with multiple die types
{
  "4": {
    "rolls": [2, 1],
    "total": 3
  },
  "6": {
    "rolls": [5],
    "total": 5
  },
  "8": {
    "rolls": [5, 7],
    "total": 12
  },
  "10": {
    "rolls": [10, 2, 6],
    "total": 18
  },
  "12": {
    "rolls": [9],
    "total": 9
  },
  // NOTE: You can also roll custom die types
  "42": {
    "rolls": [42],
    "total": 42 // The Meaning of life, the universe, and everything!
  }
}
```

#### _Parameters: diceRoll_

| Property | Type | Description |
| -------- | ---- | ----------- |
| dice | Object | How many coins to flip. Default: 1 |
| asNumeric | Boolean | Whether to return an object with 1 and 0 instead of "heads" and "tails", respectively. |

### Coin Flips

```js
import ttrpgTools from 'ttrpg-tools'

const { coin } = ttrpgTools

const flippedCoin = coin() // Defaults to one coin flip
const flippedCoins = coin(3)
const flippedCoinsNumericResults = coin(3, true) // Replace "heads" and "tails" with 1 and 0 respectively.
```

```json
// flippedCoin
{ "heads": 1,  "tails": 0 }

// flippedCoins
{ "heads": 2,  "tails": 1 }

// flippedCoins with numeric results
{ "1": 2,  "0": 1 }
```

#### _Parameters: coin_

| Property | Type | Description |
| -------- | ---- | ----------- |
| coinFlips | Number | Specify which die types and their counts to be rolled. |
| verbose | Boolean | Whether to return an object with individual roll results and total. |

### Name Generators

```js
import ttrpgTools from 'ttrpg-tools'

const { generateNpcName, generateTownName } = ttrpgTools

const npcName = generateNpcName('male')
const townName = generateTownName()
```

```json
// Randomly generated NPC name
"David Heder"

// Randomly generated town name
"Lower Spruceport"
```

#### _Parameters: generateNpcName_

| Property | Type | Description |
| -------- | ---- | ----------- |
| sex | String | (Required) the sex of the NPC: 'male' or 'female'. |

#### _Parameters: generateTownName_

None

### NPC Generator

```js
import ttrpgTools from 'ttrpg-tools'

const { generateNpc } = ttrpgTools

const npc = generateNpc()
const npcWithSpecifiedName = generateNpc({ givenName: 'Tina', familyName: 'Fey' })
```

```json
{
  // NPC's name
  "fullName": "Tina Fey",
  "givenName": "Tina",
  "familyName": "Fey",

  // NPC's sex
  "sex": "female",

  // Randomized town name for NPC's hometown
  "homeTown": "New York City",

  // NPC's occupation
  "occupation": "Inn Keep",

  // NPC's class. Unless specified or `randomizeClass` flag is passed, NPCs will only have a class 10% of the time.
  "class": "Bard",

  // Languages spoken by the NPC
  "languages": [ "Common" ],

  // NPC's race
  "race": {
      "name": "Human",
      "avgAgeOfDeath": 100,
      "avgHeight": 6,
      "avgWeight": 180,
      "size": "medium",
      "baseClimbSpeed": 15,
      "baseFlightSpeed": 0,
      "baseSwimSpeed": 15,
      "baseWalkSpeed": 30,
      "languages": [ "Common" ]
    }
}
```

#### _Parameters: generateNpc_

The parameters are passed in as a single object, with the property names defined below.

| Property | Type | Description |
| -------- | ---- | ----------- |
| familyName | String | Specify NPC's family/last name. (Must be present with `givenName`) |
| givenName | String | Specify NPC's given/first name. (Must be present with `familyName`) |
| homeTown | String | Specify name of NPC's hometown. |
| languages | Array[Strings] | Specify the languages spoken by the NPC. |
| npcClass | String | Specify NPC's class. (Can deviate from `Supported Classes` section below.) |
| occupation | String | Specify NPC's occupation. |
| race | Array[Strings] | Specify the NPC's race. (Must match races from `Supported Races` section below.) |
| randomizeClass | Boolean | Whether to ensure the NPC has a class. If false, then NPC has 10% of having a class. |
| sex | String | Specify NPC's sex. |

### Town Generator

```js
import ttrpgTools from 'ttrpg-tools'

const { generateTown } = ttrpgTools

const town = generateTown()
const townWithSpecifiedName = generateTown({ name: 'Feywild City' })
```

```json
{
  // Town name
  "name": "Oakport",

  // Population size
  "size": 124,

  // 1-5 prevalent races in the town.
  "races": [
    {
      "name": "Halfling",
      "avgAgeOfDeath": 250,
      "avgHeight": 3,
      "avgWeight": 40,
      "size": "small",
      "baseClimbSpeed": 12,
      "baseFlightSpeed": 0,
      "baseSwimSpeed": 12,
      "baseWalkSpeed": 25,
      "languages": [ "Common",  "Halfling" ]
    },
    ...
  ],

  // Languages spoken in the town
  "languages": [ "Common", "Halfling" ],

  // Is one of the prevalent races, speaks all town's languages.
  "leader": randomizedNpcObject
}
```

#### _Parameters: generateTown_

The parameters are passed in as a single object, with the property names defined below.

| Property | Type | Description |
| -------- | ---- | ----------- |
| name     | String | Specify the town name. |
| races    | Array[Strings] | Specify the prevalent races in the town. Must match races from `Supported Races` section below. |
| size     | String | Specify the town population size ranges.  xs: 5-20, sm: 21-50, md: 51-100, lg: 101-250, xl: 251-1000 |

## Supported Races

Currently, the only races supported are form D&D 5e.

<details>
  <summary>See full list of supported races</summary>

- Aarakocra
- Aasimar
- Air Genasi
- Bugbear
- Centaur
- Changeling
- Deep Gnome
- Dragonborn
- Duergar
- Dwarf
- Earth Genasi
- Eladrin
- Elf
- Fairy
- Firbolg
- Fire Genasi
- Githyanki
- Githzerai
- Gnome
- Goblin
- Goliath
- Grung
- Half-Elf
- Halfling
- Half-Orc
- Harengon
- Hobgoblin
- Human
- Kalashtar
- Kenku
- Kobold
- Leonin
- Lizardfolk
- Locathah
- Loxodon
- Minotaur
- Orc
- Owlin
- Satyr
- Sea Elf
- Shadar-kai
- Shifter
- Tabaxi
- Tiefling
- Tortle
- Triton
- Vedalken
- Verdan
- Warforged
- Water Genasi
- Yuan-ti

</details>

## Supported Classes

Currently, the only classes supported are the basic D&D 5e class. More will be added.

<details>
  <summary>See full list of classes</summary>

- Artificer
- Barbarian
- Bard
- Cleric
- Druid
- Fighter
- Monk
- Paladin
- Ranger
- Rogue
- Sorcerer
- Warlock
- Wizard

</details>

## Contribute

I welcome any help you are willing to provide! Simply add an "Issue" in the [Issues section in Github](https://github.com/JHStoops/ttrpg-tools/issues) or fork the [project](https://github.com/JHStoops/ttrpg-tools) and create a pull request. Feel free to send me an email or tweet if you want to have a conversation.

Thank you for you support!

## Contact Information

Email: Joseph.H.Stoops@Gmail.com

Twitter: [@JHStoops](https://twitter.com/JHStoops)
