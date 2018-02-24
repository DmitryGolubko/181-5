var JSON_MENU_DATA = {};

for (let i = 0; i < 10; i++) {
    JSON_MENU_DATA[i] = {};
}

var barsModuleSelectionLetter = "1";
JSON_MENU_DATA[barsModuleSelectionLetter] = {
    "access_r": ["review", "setting", "user"],
    "subpoints": {}
};

var administratorMenuModuleSelectionLetter = "4";
JSON_MENU_DATA[administratorMenuModuleSelectionLetter] = {
    "title": "Меню администратора",
    "param": "administratorMenu",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "variants": {
        "0": "Стоп",
        "1": "Резерв"
    }
};

var blockSelectionMenuModuleSelectionLetter = "11";
var blocksNaming = {
    "bars": "БАРС",
    "pc1": "PC 1",
    "pc2": "РС 2"
};
JSON_MENU_DATA[blockSelectionMenuModuleSelectionLetter] = {
    "title": "Меню выбора блока",
    "param": "blockSelection",
    "access_rw": ["review", "setting", "user"],
    "variants": {
        "0": blocksNaming.pc1,
        "1": blocksNaming.pc1,
        "2": blocksNaming.pc1
    }
};