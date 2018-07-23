let MODE_MENU_NUMBER = {
    "title": "Номер",
    "param": "channelNumber",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "validationPattern": "number",
    "default": "1",
    "min": "1",
    "max": "99"
};

let MODE_MENU_MODE_SELECTION = {
    "title": "Режим",
    "param": "channelMode",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "subpoints": {
        "0": {
            "title": "ППРЧ",
            "param": "modeSwitcherFRCH",
            "access_r": ["review", "setting", "user"]
        },
        "1": {
            "title": "ФРЧ",
            "access_r": ["review", "setting", "user"],
            "subpoints": {
                "0": {
                    "title": "Цифровой",
                    "access_r": ["review", "setting", "user"],
                    "param": "modeSwitcherDigital",
                },
                "1": {
                    "title": "Аналоговый",
                    "access_r": ["review", "setting", "user"],
                    "subpoints": {
                        "0": {
                            "title": "Фиксированный канал",
                            "param": "modeSwitcherFixedChannel",
                            "access_r": ["review", "setting", "user"],
                        },
                        "1": {
                            "title": "Сканирование",
                            "param": "modeSwitcherScan",
                            "access_r": ["review", "setting", "user"],
                        }
                    }
                }
            }
        }
    }
};

let MODE_MENU_ITEM_PROTOCOL = {
    "title": "Протокол",
    "param": "channelProtocol",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "variants": {
        "0": "Голос",
        "1": "Модем 9600 гарант.",
        "2": "Модем 9600 негарант.",
        "3": "Модем 19200 гарант.",
        "4": "Модем 19200 негарант."
    }
};

let MODE_MENU_NETWORK_NUMBER = {
    "title": "Номер сети",
    "param": "channelNetNumber",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "validationPattern": "number",
    "default": "0",
    "min": "0",
    "max": "99"
};

let MODE_MENU_PRIORITY = {
    "title": "Приоритет",
    "param": "channelPriority",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "variants": {
        "0": "Ведомая",
        "1": "Ведущая"
    }
};

let MODE_MENU_LEAD_ADDRESS = {
    "menu_title": "Адр ведущ",
    "title": "Адрес ведущей",
    "param": "channelLeadingAddress",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "validationPattern": "number",
    "default": "1",
    "min": "1",
    "max": "16777215"
};

let MODE_MENU_TM = {
    "title": "ТМ",
    "param": "channelTonalModulation",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "variants": {
        "0": "Вкл",
        "1": "Выкл"
    }
};

let MODE_MENU_CALL = {
    "title": "Вызов",
    "access_r": ["review", "setting", "user"],
    "param": "callSubMenu",
    "subpoints": {
        "0": {
            "menu_title": "Абонент",
            "title": "Адресс вызова",
            "param": "callMenuAbonentAddress",
            "access_r": ["review"],
            "access_rw": ["setting", "user"],
            "validationPattern": "number",
            "default": "00000001",
            "min": "1",
            "max": "16777215"
        },
        "1": {
            "menu_title": "Группа",
            "title": "Адресс вызова",
            "param": "callMenuGroupAddress",
            "access_r": ["review"],
            "access_rw": ["setting", "user"],
            "validationPattern": "number",
            "default": "00001",
            "min": "1",
            "max": "65535"
        },
        "2": {
            "menu_title": "Циркулярный",
            "title": "Адресс вызова",
            "param": "callMenuCircularAddress",
            "access_r": ["review", "setting", "user"]
        }
    }
};

let MODE_MENU_ADDRESS = {
    "menu_title": "Адрес",
    "title": "Собственный адресс",
    "param": "channelAddress",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "validationPattern": "number",
    "default": "00001",
    "min": "1",
    "max": "65535"
};

let MODE_MENU_GROUP = {
    "menu_title": "Группа",
    "title": "Собственная группа",
    "param": "channelGroup",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "validationPattern": "number",
    "default": "00000001",
    "min": "1",
    "max": "16777215"
};

let MODE_MENU_STANDBY_MODE = {
    "menu_title": "Деж режим",
    "title": "Дежурный режим",
    "param": "channelStandBy",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "variants": {
        "0": "Вкл",
        "1": "Выкл"
    }
};

let MODE_MENU_APPLY = {
    "title": "Применить",
    "param": "save"
};

let MODE_MENU_MODULATION = {
    "title": "Модуляция",
    "param": "modeModulation",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "variants": {
        "0": "ОМ",
        "1": "ЧМ"
    }
};

let MODE_MENU_BROADCAST_FREQ = {
    "menu_title": "Част ПРД",
    "title": "Частота передачи",
    "param": "modeBroadcastFrequency",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "validationPattern": "number",
    "default": "030000",
    "min": "30000",
    "max": "512000"
};

let MODE_MENU_RECEPTION_FREQ = {
    "menu_title": "Част ПРД",
    "title": "Частота передачи",
    "param": "modeReceptionFrequency",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "validationPattern": "number",
    "default": "030000",
    "min": "30000",
    "max": "512000"
};

let MODE_MENU_TABLE_NUMBER = {
    "menu_title": "Таблица",
    "title": "Номер таблицы",
    "param": "modeTableNumber",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "validationPattern": "number",
    "default": "1",
    "min": "1",
    "max": "8"
};

let MODE_MENU_PRIOR_SCAN = {
    "title": " Приор скан",
    "param": "modePriorityScan",
    "access_r": ["review"],
    "access_rw": ["setting", "user"],
    "variants": {
        "0": "Отключено",
        "1": "Включено"
    }
};

var MODE_PPRCH_SLAVE = {
    "0": MODE_MENU_NUMBER,
    "1": MODE_MENU_MODE_SELECTION,
    "2": MODE_MENU_ITEM_PROTOCOL,
    "3": MODE_MENU_NETWORK_NUMBER,
    "4": MODE_MENU_PRIORITY,
    "5": MODE_MENU_TM,
    "6": MODE_MENU_CALL,
    "7": MODE_MENU_ADDRESS,
    "8": MODE_MENU_GROUP,
    "9": MODE_MENU_STANDBY_MODE,
    "10": MODE_MENU_APPLY
};

var MODE_PPRCH_MASTER = {
    "0": MODE_MENU_NUMBER,
    "1": MODE_MENU_MODE_SELECTION,
    "2": MODE_MENU_ITEM_PROTOCOL,
    "3": MODE_MENU_NETWORK_NUMBER,
    "4": MODE_MENU_PRIORITY,
    "5": MODE_MENU_LEAD_ADDRESS,
    "6": MODE_MENU_TM,
    "7": MODE_MENU_CALL,
    "8": MODE_MENU_ADDRESS,
    "9": MODE_MENU_GROUP,
    "10": MODE_MENU_STANDBY_MODE,
    "11": MODE_MENU_APPLY
};

var MODE_FRCH_DIGITAL = {
    "0": MODE_MENU_NUMBER,
    "1": MODE_MENU_MODE_SELECTION,
    "2": MODE_MENU_ITEM_PROTOCOL,
    "3": MODE_MENU_BROADCAST_FREQ,
    "4": MODE_MENU_RECEPTION_FREQ,
    "5": MODE_MENU_TM,
    "6": MODE_MENU_CALL,
    "7": MODE_MENU_ADDRESS,
    "8": MODE_MENU_GROUP,
    "9": MODE_MENU_STANDBY_MODE,
    "10": MODE_MENU_APPLY
};

var MODE_FRCH_ANALOG_FIXED_CHANNEL = {
    "0": MODE_MENU_NUMBER,
    "1": MODE_MENU_MODE_SELECTION,
    "2": MODE_MENU_MODULATION,
    "3": MODE_MENU_BROADCAST_FREQ,
    "4": MODE_MENU_RECEPTION_FREQ,
    "5": MODE_MENU_STANDBY_MODE,
    "6": MODE_MENU_APPLY
};

var MODE_FRCH_ANALOG_SCAN = {
    "0": MODE_MENU_NUMBER,
    "1": MODE_MENU_MODE_SELECTION,
    "2": MODE_MENU_MODULATION,
    "3": MODE_MENU_TABLE_NUMBER,
    "4": MODE_MENU_PRIOR_SCAN,
    "5": MODE_MENU_STANDBY_MODE,
    "6": MODE_MENU_APPLY
};

var JSON_MENU_PC = {
    "0": {
        "title": "Канал",
        "access_r": ["review", "setting", "user"],
        "subpoints": {
            // set dynamically
        }
    },
    "1": {
        "title": "Терминал",
        "access_r": ["review", "setting", "user"],
        "subpoints": {
            "0": {
                "title": "Абонент",
                "param": "subscriberNumber",
                "access_r": ["review"],
                "access_rw": ["setting", "user"],
                "validationPattern": "number",
                "default": "00000001",
                "min": "1",
                "max": "16777215"
            },
            "1": {
                "title": "Группа",
                "param": "groupNumber",
                "access_r": ["review"],
                "access_rw": ["setting", "user"],
                "validationPattern": "number",
                "default": "00000001",
                "min": "1",
                "max": "16777215"
            },
            "2": {
                "title": "Применить"
            }
        }
    },
    "2": {
        "title": "Параметры",
        "access_r": ["review", "setting", "user"],
        "subpoints": {
            "0": {
                "title": "Время\\Дата",
                "param": "settingsDateTime",
                "access_r": ["review"],
                "access_rw": ["setting", "user"],
                "validationPattern": "time"
            },
            "1": {
                "title": "Микрофон",
                "param": "settingsMicro",
                "access_r": ["review"],
                "access_rw": ["setting", "user"],
                "validationPattern": "number",
                "default": "11",
                "min": "0",
                "max": "31"
            },
            "2": {
                "title": "Яркость",
                "param": "settingsBrightness",
                "access_r": ["review"],
                "access_rw": ["setting", "user"],
                "hasBar": "true",
                "variants": {
                    "0": "20",
                    "1": "40",
                    "2": "60",
                    "3": "80",
                    "4": "100"
                }
            },
            "3": {
                "title": "Блок клав",
                "param": "settingsKeyLocked",
                "access_r": ["review"],
                "access_rw": ["setting", "user"],
                "variants": {
                    "0": "Откл",
                    "1": "10",
                    "2": "30",
                    "3": "50"
                }
            }
        }
    },
    "3": {
        "title": "Информация",
        "access_r": ["review", "setting", "user"],
        "subpoints": {
            "0": {
                "title": "Версия ПО",
                "access_r": ["review", "setting", "user"],
                "subpoints": {
                    "0": {
                        "title": "Терминал",
                        "param": "infoRemoteCtrlVersionPC",
                        "validationPattern": "info",
                        "info": "51w"
                    },
                    "2": {
                        "title": "ПЦОС КЗ",
                        "param": "infoPCOCKZPC",
                        "validationPattern": "info",
                        "info": "284"
                    },
                    "3": {
                        "title": "ПЦОС ЧЗ",
                        "param": "infoPCOCCHZPC",
                        "validationPattern": "info",
                        "info": "298-УКВ"
                    },
                    "4": {
                        "title": "МК КЗ",
                        "param": "infoMKKZPC",
                        "validationPattern": "info",
                        "info": "36"
                    },
                    "5": {
                        "title": "МК ЧЗ",
                        "param": "infoMKCHZPC",
                        "validationPattern": "info",
                        "info": "60"
                    },
                    "6": {
                        "title": "x86",
                        "param": "infoCPUModulePC",
                        "validationPattern": "info",
                        "info": "3221"
                    },
                    "7": {
                        "title": "ПЛИС",
                        "param": "infoPLICPC",
                        "validationPattern": "info",
                        "info": "57"
                    }
                }
            },
            "1": {
                "title": "Температура",
                "param": "infoTemperaturePC",
                "access_r": ["review", "setting", "user"],
                "validationPattern": "info",
                "info": "21 ℃"
            }
        }
    },
    "4": {
        "title": "Усилитель мощности",
        "access_r": ["review", "setting", "user"],
        "subpoints": {
            "0": {
                "title": "Раб парам",
                "access_r": ["review", "setting", "user"],
                "subpoints": {
                    "0": {
                        "title": "Мощность",
                        "access_r": ["review"],
                        "access_rw": ["setting", "user"],
                        "param": "amplifierPower",
                        "variants": {
                            "0": "Откл",
                            "1": "25",
                            "2": "50"
                        }
                    },
                    "1": {
                        "title": "Применить"
                    }
                }
            },
            "1": {
                "title": "Настройка УМ",
                "access_r": ["review", "setting", "user"],
                "info": "не доступно! todo"
            }
        }
    },
    "5": {
        "title": "Доступ",
        "access_r": ["review", "setting", "user"],
        "subpoints": {
            "0": {
                "title": "Пользователь",
                "access_r": ["review", "setting"],
                "param": "setAccessUser",
                "verification": "password",
                "default": "0000",
                "min": "0",
                "max": "9999"
            },
            "1": {
                "title": "Обзор",
                "access_r": ["setting", "user"],
                "param": "setAccessReview",
                "verification": "password",
                "default": "0000",
                "min": "0",
                "max": "9999"
            },
            "2": {
                "title": "Настройка",
                "access_r": ["review", "user"],
                "param": "setAccessSetting",
                "verification": "password",
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
