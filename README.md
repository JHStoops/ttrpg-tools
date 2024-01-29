# ttrpg-tools

[![Npm package version](https://badgen.net/npm/v/ttrpg-tools)](https://npmjs.com/package/ttrpg-tools)
[![Npm package total downloads](https://badgen.net/npm/dt/ttrpg-tools)](https://npmjs.com/package/ttrpg-tools)
[![GitHub issues](https://img.shields.io/github/issues/jhstoops/ttrpg-tools.svg)](https://GitHub.com/jhstoops/ttrpg-tools/issues/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/jhstoops/ttrpg-tools/graphs/commit-activity)
[![Maintainer](https://img.shields.io/badge/maintainer-JHStoops-blue)](https://GitHub.com/jhstoops)
[![Twitter](https://badgen.net/badge/icon/twitter?icon=twitter&label)](https://twitter.com/jhstoops)
[![Maintainability](https://api.codeclimate.com/v1/badges/c2c180192985adf4db7c/maintainability)](https://codeclimate.com/github/JHStoops/ttrpg-tools/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c2c180192985adf4db7c/test_coverage)](https://codeclimate.com/github/JHStoops/ttrpg-tools/test_coverage)

Library for generating random dice rolls, NPCs, towns, names, etc. for TTRPG campaigns.

1. [How To Import](#how-to-import)
2. [API](#api)
    - [Standard Dice](#standard-dice)
    - [Custom Dice](#custom-dice)
    - [Coin Flips](#coin-flips)
    - [Name Generators](#name-generators)
    - [NPC Generator](#npc-generator)
    - [Town Generator](#town-generator)
3. [Customize Data](#customize-data)
    - [Classes, Languages, and Occupations](#classes-languages-and-occupations)
    - [Races](#races)
    - [NPC Name Parts](#npc-name-parts)
    - [Town Name Parts](#town-name-parts)
4. [Supported Races](#supported-races)
5. [Supported Classes](#supported-classes)
6. [Contribute](#contribute)
7. [Contact Information](#contact-information)

## How to Import

ES Module Default Export

```js
import ttrpgTools from 'ttrpg-tools'

const {
  coin, d4, d6, d8, d10, d12, d20, d100, diceRoll, data,
  generateNpcName, generateTownName, generateNpc, generateTown
} = ttrpgTools
```

ES Module Named Exports

```js
import {
  coin, d4, d6, d8, d10, d12, d20, d100, diceRoll, data,
  generateNpcName, generateTownName, generateNpc, generateTown
}  from 'ttrpg-tools'
```

## API

### Standard Dice

| Parameter          | Type    | Default | Description |
| ---------          | ----    | ------- | ----------- |
| dieCount           | Number  | 1       | How many dice to roll. |
| verbose            | Boolean | false   | Whether to return an object with individual roll results and total. |
| modifier            | Number  | 0       | Add modifier to roll. |
| withAdvantage      | Boolean | false   | Whether to roll with advantage. |
| withDisadvantage   | Boolean | false   | Whether to roll with disadvantage. |

```js
import { d4, d6, d8, d10, d12, d20, d100 } from 'ttrpg-tools'

const d4Roll = d4() // Defaults to a single die
const d6RollThreeDice = d6(3)
const d8RollFiveDiceVerbose = d8(5, true)
const d10RollWithModifier = d10(1, false, 2)
const d12RollWithAdvantage = d12(1, false, 0, true)
const d20RollWithDisadvantage = d20(1, false, 0, false, true)
const d100RollWithClashingAdvantage = d100(1, false, 0, true, true) // First roll is used
```

```js
// d4 roll - single die
{ "4": 3 }

// d6 roll - three dice
{ "6": 15 }

// d8 roll - five dice, verbose
{ "8": {
    "rolls": [3, 7, 4, 8, 6],
    "total": 28
  }
}

// d10 roll - single die
{ "10": 8 }

// d12 roll - single die
{ "12": 5 }

// d20 roll - single die
{ "20": 16 }

// d100 roll - single die
{ "100": 42 }
```

<br />

### Custom Dice

| Parameter          | Type    | Default | Description |
| --------           | ----    | ------- | ----------- |
| dice               | Object  |         | (Required) How many coins to flip. |
| asNumeric          | Boolean | false   | Whether to return an object with 1 and 0 instead of "heads" and "tails", respectively. |
| modifier            | Number  | 0       | Add modifier to roll. |
| withAdvantage      | Boolean | false   | Whether to roll with advantage. |
| withDisadvantage   | Boolean | false   | Whether to roll with disadvantage. |

```js
import { diceRoll } from 'ttrpg-tools'

const rollManyDieTypes = diceroll({
  "4": 2,
  "6": 1,
  "8": 2,
  "10": 3,
  "12": 1,
  "42": 1
}, true)
```

```js
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

<br />

### Coin Flips

| Parameter          | Type    | Default | Description |
| --------           | ----    | ------- | ----------- |
| coinFlips          | Number  | 1       | Specify which die types and their counts to be rolled. |
| verbose            | Boolean | false   | Whether to return an object with individual roll results and total. |
| modifier            | Number  | 0       | Add modifier to coin toss. |
| withAdvantage      | Boolean | false   | Whether to toss coin with advantage. |
| withDisadvantage   | Boolean | false   | Whether to toss coin with disadvantage. |

```js
import { coin } from 'ttrpg-tools'

const flippedCoin = coin() // Defaults to one coin flip
const flippedCoins = coin(3)
const flippedCoinsNumericResults = coin(3, true) // Replace "heads" and "tails" with 1 and 0 respectively.
```

```js
// flippedCoin
{ "heads": 1,  "tails": 0 }

// flippedCoins
{ "heads": 2,  "tails": 1 }

// flippedCoins with numeric results
{ "1": 2,  "0": 1 }
```

<br />

### Name Generators

| Parameter      | Type    | Default | Description |
| ---------      | ----    | ------- | ----------- |
| *generateNpcName*
| sex            | String  |         | (Required) The sex of the NPC: 'male' or 'female'. |
|
| *generateTownName*
| withDescriptor     | Boolean | false   | Whether to guarantee a descriptor name part. If false, there's only a 20% chance to add it. |
| withPostDescriptor | Boolean | false   | Whether to guarantee a postDescriptor name part. If false, there's only a 20% chance to add it. |
| usePremade         | Boolean | false   | Whether to use a premade town name instead of a generated name. |

```js
import { generateNpcName, generateTownName } from 'ttrpg-tools'

const npcName = generateNpcName('male')
const townName = generateTownName()
const townNameWithDescriptor = generateTownName(true)
```

```js
// Randomly generated NPC name
"Jon Heder"

// Randomly generated town name
"Spruceport"

// Randomly generated town name with guaranteed descriptor name part
"Little Redwoods"
```

<br />

### NPC Generator

The parameters are passed in as a single object, with the property names defined below.

| Property       | Type           | Default | Description |
| --------       | ----           | ------- | ----------- |
| familyName     | String         |         | Specify NPC's family/last name. |
| givenName      | String         |         | Specify NPC's given/first name. |
| homeTown       | String         |         | Specify name of NPC's hometown. |
| languages      | Array[Strings] |         | Specify the languages spoken by the NPC. |
| npcClass       | String         |         | Specify NPC's class. (Can deviate from `Supported Classes` section below.) |
| occupation     | String         |         | Specify NPC's occupation. |
| race           | Array[Strings] |         | Specify the NPC's race. (Must match races from `Supported Races` section below.) |
| randomizeClass | Boolean        |         | Whether to ensure the NPC has a class. If false, then NPC has 10% of having a class. |
| sex            | String         |         | Specify NPC's sex. |

```js
import { generateNpc } from 'ttrpg-tools'

const npc = generateNpc()
const npcWithSpecifiedName = generateNpc({ givenName: 'Tina', familyName: 'Fey' })
```

```js
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
  "occupation": "Actor",

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

<br />

### Town Generator

The parameters are passed in as a single object, with the property names defined below.

| Property | Type           | Description |
| -------- | ----           | ----------- |
| name     | String         | Specify the town name. |
| races    | Array[Strings] | Specify the prevalent races in the town. Must match races from `Supported Races` section below. |
| size     | String         | Specify the town population size ranges.  xs: 5-20, sm: 21-50, md: 51-100, lg: 101-250, xl: 251-1000 |

```js
import { generateTown } from 'ttrpg-tools'

const town = generateTown()
const townWithSpecifiedName = generateTown({ name: 'Feywild City' })
```

```js
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

<br />

## Customize Data

This library is intended to continually grow its data to provide the best procedurally generative experience possible, but may not grow as fast as you would like. In an attempt to roll high initiative in that combat, I introduce to you the ability to customize the data!

The data methods are made available via the `data` named export.

```js
import { data } from 'ttrpg-tools'
```

### Classes, Languages, and Occupations

Classes, Languages, and Occupations data are all arrays of strings. The examples below could be appllied to any of these three data sets.

```js
// Get the available list of classes (customized or not)
data.classes.get()

// Get the list of classes provided originally by ttrpg-tools
// It can be useful to use this if you want to use most classes, but filter out a few for when you call the customize method.
data.classes.getOriginal()

// Customize the available classes (Append to existing classes)
// Note: This will append your list of new classes to the end of the available list.
// Note: Duplicates are removed.
data.classes.customize(['Couch Potato'])

// Customize the available classes (Replace existing classes)
// Note: This will replace the existing classes with the list of classes you provide here.
data.classes.customize(['Couch Potato'], true)

// Reset to factory settings
data.classes.reset()
```

<br />

### Races

Races data is stored in this format:

```js
{
  "Human": {
    "name": "Human",
    "avgAgeOfDeath": 100,
    "avgHeight": 6.0,
    "avgWeight": 180.0,
    "size": "medium",
    "baseClimbSpeed": 15,
    "baseFlightSpeed": 0,
    "baseSwimSpeed": 15,
    "baseWalkSpeed": 30,
    "languages": [
      "Common"
    ]
  }
}
```

Note: Any missing properties will be filled in with the Human's values.
Note: You can add custom properties to a race.
Note: You can override a race by using the same key name with a new race object.

```js
// Get the available races (customized or not)
data.races.get()

// Get the races data originally provided by ttrpg-tools
data.races.getOriginal()

// Customize the available races (Append to existing races)
// Note: The remaining expected properties will be filled in using Human values.
data.races.customize({
  'Couch Potato': {
    name: 'Couch Potato', // Required
    avgAgeOfDeath: 30,
    size: 'large',
    customPropertyThatIWouldLikeToInclude: 42
  }
 })

// Customize the available races (Replace existing races)
// Note: This will replace all races with the races provided.
data.races.customize({
  'Couch Potato': {
    name: 'Couch Potato', // Required
    avgAgeOfDeath: 30,
    size: 'large',
    customPropertyThatIWouldLikeToInclude: 42
  }
 }, true)

// Reset to factory settings
data.races.reset()
```

<br />

### NPC Name Parts

NPC Name Parts data is stored in this format:

```js
{
  givenNames: {
    female: ['Brienna'],
    male: ['Bryce'],
  },
  familyNames: ['Lastnamington']
}
```

Note: You do not have to customize all name parts arrays when you call the `customize` method. For example, you could only pass in `{ givenNames: { male: ['Brad', 'Chad', 'Lad']}}` to just affect the male givenNames.

```js
// Get the available NPC name parts (customized or not)
data.npcNames.get()

// Get the NPC name parts data originally provided by ttrpg-tools
data.npcNames.getOriginal()

// Customize the available NPC name parts (Append to existing name parts)
// Note: This example adds the female and male given names to the available name parts data, and it leaves the familyNames as it is.
data.npcNames.customize({
  givenNames: {
    female: [ 'Lynn', 'Patricia', 'Gertrude' ],
    male: [ 'Carl', 'Buster' ]
  }
})

// Customize the available NPC name parts (Replace existing NPC name parts)
// Note: This will replace all femilyNames with the provided list, but the male and female given names will be left alone.
data.npcNames.customize({ familyNames: ['Owlbearslayer'] }, true)

// Reset to factory settings
data.npcNames.reset()
```

<br />

### Town Name Parts

Town Name Parts data is stored in this format:

```js
{
  descriptors: ['Little', 'Higher', 'Grand']
  prefixes: ['Red', 'Asp']
  suffixes: ['woods', 'river', ' Town']
  postDescriptors: ['in the East', 'City', 'Creek'],
  premades: ['Rivendell', 'Hobbiton', 'Gondor']
}
```

Note: You do not have to customize all name parts arrays when you call the `customize` method. For example, you could only pass in `{ descriptors: ['Brad', 'Chad', 'Lad'] }` to just affect the male descriptor name parts.

```js
// Get the available town name parts (customized or not)
data.townNames.get()

// Get the NPC name parts data originally provided by ttrpg-tools
data.townNames.getOriginal()

// Customize the available town name parts (Append to existing name parts)
// Note: This example adds the descriptor, prefix, and postDescriptor name parts to the currently available town name parts data.
data.townNames.customize({ descriptors: ['Lower'], prefixes: ['Green', 'Oak'], postDescriptors: ['Landing'] })

// Customize the available town name parts (Replace existing town name parts)
// Note: This will replace suffix name parts and premades data with the provided lists of suffixes and premades.
data.townNames.customize({ suffixes: ['Owlbear', 'Mound'], premades: ['Mordor']}, true)

// Reset to factory settings
data.townNames.reset()
```

<br />

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
<br/>

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
<br/>

## Contribute

I welcome any help you are willing to provide! Simply add an "Issue" in the [Issues section in Github](https://github.com/JHStoops/ttrpg-tools/issues) or fork the [project](https://github.com/JHStoops/ttrpg-tools) and create a pull request. Feel free to send me an email or tweet if you want to have a conversation.

Thank you for you support!

<br/>

## Contact Information

Email: Joseph.H.Stoops@Gmail.com

Twitter: [@JHStoops](https://twitter.com/JHStoops)
