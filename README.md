Mod to add dumpsterdiving to you fivem server. Written in typescript.

Feel free to send me PR or add an issue.

## ESX || QBCore??

Script should have support for both frameworks when it comes to recieving money
and items, no need to do anything.

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
