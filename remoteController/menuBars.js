var JSON_MENU_BARS = {
    "0": {
        "title": "Настройки",
        "access_r": ["review", "setting", "user"],
        "subpoints": {
            "0": {
                "title": "IP-адрес",
                "param": "settingsIpAddress",
                "default": "000.000.000.000",
                "validationPattern": "ip_address",
                "access_r": ["review"],
                "access_rw": ["setting", "user"]
            },
            "1": {
                "title": "Маска подсети",
                "param": "settingsMask",
                "default": "000.000.000.000",
                "validationPattern": "ip_address",
                "access_r": ["review"],
                "access_rw": ["setting", "user"]
            },
            "2": {
                "title": "Маршруты",
                "param": "settingsRoutes",
                "access_r": ["review", "setting", "user"],
                "subpoints": {
                    "0": {
                        "title": "Маршрут №",
                        "param": "settingsRouteNumber",
                        "validationPattern": "number",
                        "default": '0',
                        "min": "0",
                        "max": "10",
                        "access_r": ["review"],
                        "access_rw": ["setting", "user"]
                    },
                    "1": {
                        "title": "PC",
                        "param": "settingsCurrentPcBlock",
                        "access_r": ["review"],
                        "access_rw": ["setting", "user"],
                        "variants": {
                            "0": "PC1",
                            "1": "PC2",
                            "2": "Не уст."
                        }
                    },
                    "2": {
                        "title": "IP-адрес",
                        "param": "settingsPcBlockIpAddress",
                        "default": "000.000.000.000",
                        "validationPattern": "ip_address",
                        "access_r": ["review"],
                        "access_rw": ["setting", "user"]
                    },
                    "3": {
                        "title": "IP маска",
                        "param": "settingsPcBlockIpMask",
                        "default": "000.000.000.000",
                        "validationPattern": "ip_address",
                        "access_r": ["review"],
                        "access_rw": ["setting", "user"]
                    }
                }
            }
        }
    },
    "1": {
        "title": "Информация",
        "access_r": ["review", "setting", "user"],
        "subpoints": {
            "0": {
                "title": "Версия ПО",
                "access_r": ["review", "setting", "user"],
                "subpoints": {
                    "0": {
                        "title": "Терминал",
                        "param": "infoRemoteCtrlVersionBARS",
                        "validationPattern": "info",
                        "info": "27"
                    },
                    "1": {
                        "title": "x86",
                        "param": "infoCPUModuleBARS",
                        "validationPattern": "info",
                        "info": "257"
                    }
                }
            },
            "1": {
                "title": "Температура",
                "param": "infoTemperatureBARS",
                "access_r": ["review", "setting", "user"],
                "validationPattern": "info",
                "info": "21 ℃"
            }
        }
    },
    "2": {
        "title": "Доступ",
        "access_r": ["review", "setting", "user"],
        "subpoints": {
            "0": {
                "title": "Пользователь",
                "param": "setAccessUser",
                "access_rw": ["review", "setting"],
                "verification": "password",
                "validationPattern": "number",
                "default": "0000",
                "min": "0",
                "max": "9999"
            },
            "1": {
                "title": "Обзор",
                "param": "setAccessReview",
                "access_rw": ["setting", "user"],
                "verification": "password",
                "validationPattern": "number",
                "default": "0000",
                "min": "0",
                "max": "9999"
            },
            "2": {
                "title": "Настройка",
                "param": "setAccessSetting",
                "access_rw": ["review", "user"],
                "verification": "password",
                "validationPattern": "number",
                "default": "0000",
                "min": "0",
                "max": "9999"
            },
            "3": {
                "title": "Смена пароля",
                "param": "password",
                "access_rw": ["setting"],
                "validationPattern": "number",
                "default": "1234",
                "min": "0",
                "max": "9999"
            }
        }
    }
};
var MAIN_SCREEN_CONFIG = {
    "param": "mainScreen",
    "leftInfo": "УКВ-А-ФРЧ",
    "rightInfo": "УКВ-Ц-ФРЧ"
};

