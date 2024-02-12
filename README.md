Mod to add dumpsterdiving to you fivem server. Written in typescript.

Feel free to send me PR or add an issue.

1. [ESX or QBCore](#esx-or-qbcore)
2. [Images](#images)
3. [Override styling](#override-styling)
4. [Configure](#configure)

## ESX or QBCore

Script should have support for both frameworks when it comes to recieving money
and items, no need to do anything.

You can also edit customFramework.js to override ESX or QBCore add events with your own addItem, addMoney.

## Images

![interaction text](https://i.ibb.co/cgBb5TL/Five-M-b2944-GTAProcess-2024-02-12-10-54-20.png)
![searching](https://i.ibb.co/QkYpKHx/Five-M-b2944-GTAProcess-2024-02-12-10-54-31.png)
![nothing found](https://i.ibb.co/vHv664r/Five-M-b2944-GTAProcess-2024-02-12-10-55-04.png)
![recieve item](https://i.ibb.co/J5QDR1T/Five-M-b2944-GTAProcess-2024-02-12-10-55-29.png)

## Override styling

If you wish to override any css styling for the progressbar or notification
popup you can ovveride css variables or edit styles.css

```
    --main-bg-color: rgba(39, 39, 39,1);
    --text-color: #fff;
    --progressbar-default-bg: rgb(32, 32, 32);
    --progressbar-default-inset: #1a1a1a;
    --progressbar-complete-bg: rgb(68, 141, 68);
    --progressbar-complete-inset: rgb(169, 218, 169);
    --item-color:rgba(114, 204, 114, 1);
```

## Configure

**config.json** needs to be in the [config] folder

**enabled** set enabled to true or false to easily toggle dumpsterdiving on you server

### Style interaction text

You can style the interaction text shown on dumpsters

```
"textStyle" : {
        "font": 4,
        "scale": 0.0,
        "size": 0.45,
        "color" : {
            "red": 255,
            "green": 255,
            "blue":255,
            "alpha": 255
        },
        "textDropShadow": {
            "distance":2,
            "red": 255,
            "green": 255,
            "blue":255,
            "alpha": 255
        }
},
```

### Translations

Translate texts used in the mod

```
    "translations": {
        "dumpsterdive": "[~g~E~s~] Look through trash",
        "searching":"Searching..",
        "recievedItem": "You found ",
        "recievedNoItem": "You found nothing",
        "alreadyLooted": "You've already looked here, found nothing",
        "notAllowedToLoot": "You looked through enough trash today, you stink"
    },
```

### Items

Configure lootable items

**amount** can be number or a 2 number array for a range, player will recieve an
amount between those 2 numbers.

**chance** is 0-100 as loot chance percentage

**label** the label is the text displayed when recieveing the loot.

**id** id of item much match id in database.

```
    "items": [
        {
            "id":"cash",
            "label": "kronor",
            "amount": [7,100],
            "chance": 10,
            "type":"cash"
        },{
            "id": "weapon_minismg",
            "label": "a cool weapon",
            "amount": 1,
            "chance": 50,
            "type":"weapon"
        },
        {
            "id": "meth",
            "label": "meth",
            "amount": 1,
            "chance": 50,
            "type":"item"
        },
        {
            "id": "oxy",
            "label": "oxy",
            "amount": 1,
            "chance": 50,
            "type":"item"
        }
    ],

```

### Models

Configure gta models to apply dumpster diving to.

```
    "dumpsterModels": [
        "p_dumpster_t",
        "prop_cs_dumpster_01a",
        "prop_dumpster_01a",
        "prop_dumpster_02a",
        "prop_dumpster_02b",
        "prop_dumpster_3a",
        "prop_dumpster_4a",
        "prop_dumpster_4b",
        "prop_snow_dumpster_01"
    ],
```

### Rules

**maxDumpstersPerRS** max number of dumpsters a player can loot per server
restart.

**lootProbabilityPercent** (optional) if you wish to apply a possibility that
player can recieve no loot.

```
    "rules": {
        "maxDumpstersPerRS": 8,
        "lootProbabilityPercent": 100
    }
```
