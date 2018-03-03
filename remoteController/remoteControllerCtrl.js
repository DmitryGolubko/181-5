'use strict';

var VOLUME_TITLE = "Громкость";

var ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
var setAccessMenuRegex = /^setAccess.*/;
var timeFormat = "HH:mm";
var extendedTimeFormat = "YYYY.MM.DD HH:mm:ss";

angular.module('stationApp')
    .controller('RemoteControllerCtrl', function ($scope, $window, $timeout) {

        var hasSubpoints = true;
        $scope.isPoint = false;
        $scope.defaultMainScreen = true;
        $scope.currentVariants = [];

        $scope.mainScreenView = {};

        $scope.editPoint = 0;

        $scope.editablePointEnum = {
            "info": 0,
            "number": 1,
            "variants": 2
        };

        $scope.callModes = {
            abonent: 'А',
            group: 'Г',
            circular: 'Циркуляр'
        };

        $scope.pointValueSymbols = [];
        $scope.focusedPointValueSymbolNumber = 0;

        $scope.isVolumeShown = false;
        $scope.volumeTitle = VOLUME_TITLE;
        $scope.statusMenuView = {workingMode: "", blockSelected: ""};

        $scope.cls = {
            display: "display",
            upperRow: "upperRow",
            workingArea: "workingArea",
            volumeBar: "volume-bar",
            pointValueSymbol: "point-value-symbol",
            selected: "selected",
            contentContainer: "content-container",
            statusWindow:"status-window"
        };

        $scope.validations = {
            ipAddress: "ip_address",
            number: "number",
            time: "time",
            info: "info"
        };

        $scope.access = {
            setting: "setting",
            user: "user",
            review: "review"
        };

        $scope.cabels = {
            PC: {
                BARS: blocksNaming.bars,
                PC1: blocksNaming.pc1,
                PC2: blocksNaming.pc2,
                none: "none"
            }
        };

        $scope.verification = {
            password: "password"
        };

        $scope.buttons = [
            ["STAR", "VOLUME DOWN", "VOLUME UP"],
            ["1", "4", "7"],
            ["2", "5", "8"],
            ["3", "6", "9"],
            ["ENTER", "ARROW LEFT", "0"],
            ["ARROW UP", "ARROW RIGHT", "ARROW DOWN"]
        ];

        $scope.init = function () {
            $scope.state = new State(BLOCKS.none, $scope.cabels.PC.none, $scope.callModes.abonent);
            $scope.modal = false;
            $scope.cursorPosition = 0;
            $scope.volume = 40; //percentage
            $scope.power = false;
            $scope.buttonState = "off";
            $scope.requireExternalDeviceScreen = false;
            $scope.keysBlocked = false;
            $scope.getUserType();
            $scope.updateMainScreen();
            $scope.getMenu();
            $scope.updateStatusMenu();
            $scope.getCurrentTime();
            $scope.createBlockSettings();
            $scope.createPCModeSettings();
        };

        $scope.createBlockSettings = function () {
            $scope.blockSettings = {"PC1": {}, "PC2": {}};
            for (var i = 0; i < 10; i++) {
                $scope.blockSettings["PC1"][i] = {
                    settingsPcBlockIpAddress: "000.000.000.000",
                    settingsPcBlockIpMask: "000.000.000.000"
                };
                $scope.blockSettings["PC2"][i] = {
                    settingsPcBlockIpAddress: "000.000.000.000",
                    settingsPcBlockIpMask: "000.000.000.000"
                };
            }
        };

        $scope.createPCModeSettings = function () {
            $scope.state.pcMode[BLOCKS.PC1] = PC_MODES.PPRCH_SLAVE;
            $scope.state.pcMode[BLOCKS.PC2] = PC_MODES.PPRCH_SLAVE;
        };

        $scope.getUserType = function () {
            $scope.userType = $window.localStorage.getItem("userType") || $scope.access.user;
            if ($window.localStorage.getItem("userType")) {
                $scope.setUserType($scope.userType);
            }
        };

        $scope.setUserType = function (userType) {
            $scope.userType = userType;
            $window.localStorage.setItem("userType", userType);
        };

        $scope.updateMainScreen = function () {
            var data = MAIN_SCREEN_CONFIG;
            var blockSelected = $scope.state.blockSelected;
            data = MAIN_SCREEN_CONFIG_PC;
            $scope.defaultMainScreen = false;
            data.leftInfo = data.leftInfo.replace(CONFIG_CONSTS.chanel, pc1Mode);
            data.leftInfo = data.leftInfo.replace(CONFIG_CONSTS.group, $scope.state['groupNumber'])
            data.rightInfo = data.rightInfo.replace(CONFIG_CONSTS.abonent, $scope.state['subscriberNumber'])
            $scope.mainScreenView.leftInfo = data.leftInfo;
            $scope.mainScreenView.rightInfo = data.rightInfo;
            $scope.mainScreenView.leftMode = pc1Mode;
            $scope.mainScreenView.rightMode = pc2Mode;
            $scope.mainScreenView.leftAmplifier = CABELS.INT_PC1;
            $scope.mainScreenView.rightAmplifier = CABELS.INT_PC2;
            $scope.mainScreenView.leftTLF = CABELS.TLF_PC1;
            $scope.mainScreenView.rightTLF = CABELS.TLF_PC2;
			$scope.state.blockSelected = BLOCKS.PC1;
        };

        $scope.updateAll = function () {
            $scope.updateMainScreen();
            $scope.updateStatusMenu();
            $scope.getMenu();
        }

        $scope.getMenu = function () {
            $scope.isPoint = false;
            $scope.modal = false;
            var data = getData($scope.state.blockSelected, $scope.getPCMode());
            $scope.mainScreen = $scope.state.points.length == 0;

            for (var i = 0; i < $scope.state.points.length; i++) {
                data = data[$scope.state.points[i]].subpoints;
            }

            $scope.menuView = [];
            $scope.menuAccess = [];

            for (var i in Object.keys(data).sort()) {
                $scope.menuView.push(data[i]);

                let allowedAccessUsers = getAllowedAccessUsers(data[i]);
                if (allowedAccessUsers.includes($scope.userType)) {
                    $scope.menuAccess.push(data[i]);
                }
            }
            $scope.cursorPosition = 0;
            $scope.updateMainScreen();
        };

        $scope.getCurrentMoment = function () {
            return moment.unix((moment().valueOf() + $scope.state.timeOffset) / 1000)
        };

        $scope.getCurrentTime = function () {
            return $scope.getCurrentMoment().format(timeFormat);
        };

        $scope.getCurrentTimeExtended = function () {
            return $scope.getCurrentMoment().format(extendedTimeFormat);
        };

        $scope.goToNextPoint = function (numberOfPoint) {
            if ($scope.menuAccess.indexOf($scope.menuView[numberOfPoint]) !== -1) {
                var data = getData($scope.state.blockSelected, $scope.getPCMode());
                if (hasSubpoints) {
                    $scope.state.nextPoint(numberOfPoint);
                    for (var i = 0, il = $scope.state.points.length; i < il; i++) {
                        if (data[$scope.state.points[i]].hasOwnProperty("subpoints")) {
                            data = data[$scope.state.points[i]].subpoints;
                            hasSubpoints = true;
                        }
                        else {
                            data = data[$scope.state.points[i]];
                            hasSubpoints = false;
                        }
                    }
                    if (hasSubpoints) {
                        $scope.getMenu();
                    }
                    else {
                        $scope.getPoint(data);
                    }
                }
            }
        };

        $scope.goToPreviousPointDouble = function () {
            $scope.goToPreviousPoint();
            $scope.goToPreviousPoint();
        };

        $scope.goToPreviousPoint = function () {
            $scope.state.back();
            $scope.currentPointParam = undefined;
            hasSubpoints = true;
            $scope.getMenu();
        };

        $scope.changeUserType = function (str) {
            $scope.setUserType(str);
        };

        $scope.togglePower = function () {
            /*if ($scope.power == true) {
                $scope.power = false;
                //$scope.buttonState = "off";
            }
            else {
                $scope.power = true;
                //$scope.buttonState = "on";
            }*/
            $scope.power = !$scope.power;

            $scope.checkConnectedPCBlocksConditions();
            $scope.checkButtonState();
        };

        $scope.toggleMainPC1Power = function () {
            $scope.mainPC1Power = !$scope.mainPC1Power;
            $scope.checkConnectedPCBlocksConditions()
        };

        $scope.toggleMainPC2Power = function () {
            $scope.mainPC2Power = !$scope.mainPC2Power;
            $scope.checkConnectedPCBlocksConditions()
        };

        $scope.togglePC1Power = function () {
			$scope.power = !$scope.power;
			$scope.checkConnectedPCBlocksConditions();
			if ($scope.power && $scope.state.pluggedPCCabel == $scope.cabels.PC.BARS) {
                $scope.buttonState = "on";
            } else {
                $scope.buttonState = "off";
            };
			
			$scope.mainPC1Power = !$scope.mainPC1Power;
			$scope.checkConnectedPCBlocksConditions();
            $scope.pc1Power = !$scope.pc1Power;
            $scope.checkConnectedPCBlocksConditions();
			$scope.plugPCCable($scope.cabels.PC.BARS)
        };

        $scope.togglePC2Power = function () {
            $scope.pc2Power = !$scope.pc2Power;
            $scope.checkConnectedPCBlocksConditions()
        };

        $scope.plugPCCable = function (clickedDUCable) {
            if (clickedDUCable == $scope.state.pluggedPCCabel) {
                $scope.state.pluggedPCCabel = $scope.cabels.PC.none;
            } else {
                $scope.state.pluggedPCCabel = clickedDUCable;
            }

            $scope.checkConnectedPCBlocksConditions();
            $scope.checkButtonState();

            let pcCabels = [$scope.cabels.PC.PC1, $scope.cabels.PC.PC2];
            if (pcCabels.includes($scope.state.pluggedPCCabel)) {
                $scope.showRequireExternalDeviceScreen();
            } else {
                $scope.hideRequireExternalDeviceScreen();
            }
        };

        $scope.checkButtonState = function () {
            if ($scope.power && $scope.state.pluggedPCCabel == $scope.cabels.PC.BARS) {
                $scope.buttonState = "on";
            } else {
                $scope.buttonState = "off";
            }
        };

        $scope.checkConnectedPCBlocksConditions = function () {
            if (!$scope.power || $scope.state.pluggedPCCabel == $scope.cabels.PC.none) {
                $scope.state.pc1Ready = false;
                $scope.state.pc2Ready = false;
                return
            }

            let selectedBlockMap = {};
            selectedBlockMap[$scope.cabels.PC.BARS] = BLOCKS.BARS;
            selectedBlockMap[$scope.cabels.PC.PC1] = BLOCKS.PC1;
            selectedBlockMap[$scope.cabels.PC.PC2] = BLOCKS.PC2;

            $scope.state.pc1Ready = $scope.mainPC1Power && $scope.pc1Power
                && $scope.state.pluggedPCCabel != $scope.cabels.PC.PC2;
            if ($scope.state.pc1Ready) {
                $scope.state.blockSelected = selectedBlockMap[$scope.state.pluggedPCCabel];
            }

            $scope.state.pc2Ready = $scope.mainPC2Power && $scope.pc2Power
                && $scope.state.pluggedPCCabel != $scope.cabels.PC.PC1;
            if ($scope.state.pc2Ready) {
                $scope.state.blockSelected = selectedBlockMap[$scope.state.pluggedPCCabel];
            }

            if (!$scope.state.pc1Ready && !$scope.state.pc2Ready) {
                $scope.state.blockSelected = BLOCKS.none;
            }
            $scope.updateStatusMenu();
        };

        $scope.showRequireExternalDeviceScreen = function () {
            $scope.state.blockSelected = BLOCKS.none;
            $scope.requireExternalDeviceScreen = true;
            $scope.keysBlocked = true;
            $scope.updateAll();
        };

        $scope.hideRequireExternalDeviceScreen = function () {
            $scope.state.blockSelected = BLOCKS.BARS;
            $scope.requireExternalDeviceScreen = false;
            $scope.keysBlocked = false;
            $scope.updateAll();
        };

        $scope.getPoint = function (item) {
            $scope.previousState = angular.copy($scope.state);
            resetPointBuffers();
            $scope.focusedPointValueSymbolNumber = 0;
            $scope.isPoint = true;
            $scope.modal = true;
            $scope.mainScreen = $scope.state.points.length == 0;
            $scope.title = item.title;

            if (item.param == "callMenuCircularAddress") {
                $scope.goToPreviousPointDouble();
                $scope.state.callMode = $scope.callModes.circular;
                return
            } else if (item.param == "modeSwitcherFRCH") {
                if ($scope.state['channelPriority'] == "Ведущая") {
                    $scope.setPCMode(PC_MODES.PPRCH_MASTER);
                } else {
                    $scope.setPCMode(PC_MODES.PPRCH_SLAVE);
                }
                $scope.goToPreviousPointDouble();
                return;
            } else if (item.param == "modeSwitcherDigital") {
                $scope.setPCMode(PC_MODES.DIGITAL);
                $scope.goToPreviousPointDouble();
                $scope.goToPreviousPoint();
                return;
            } else if (item.param == "modeSwitcherFixedChannel") {
                $scope.setPCMode(PC_MODES.FIXED_CHANNEL);
                $scope.goToPreviousPointDouble();
                $scope.goToPreviousPointDouble();
                return;
            } else if (item.param == "modeSwitcherScan") {
                $scope.setPCMode(PC_MODES.SCAN);
                $scope.goToPreviousPointDouble();
                $scope.goToPreviousPointDouble();
                return;
            }

            if (item.param == "settingsPcBlockIpAddress" || item.param == "settingsPcBlockIpMask") {
                let settingsCurrentPcBlock = $scope.state["settingsCurrentPcBlock"];
                let settingsRouteNumber = parseInt($scope.state["settingsRouteNumber"]);
                $scope.pointValue = $scope.blockSettings[settingsCurrentPcBlock][settingsRouteNumber][item.param];
            } else if (item.param == 'settingsDateTime') {
                $scope.pointValue = $scope.getCurrentTimeExtended();
            } else {
                $scope.pointValue = $scope.state[item.param] || item.info;
            }

            $scope.currentPointParam = item.param;
            if (item.default) {
                $scope.pointValueSymbols = $scope.pointValue.split("");
                $scope.editPoint = $scope.editablePointEnum.number;
            }
            else if (item.variants) {
                $scope.editPoint = $scope.editablePointEnum.variants;
                $scope.currentVariants = item.variants;
            } else if (item.info) {
                $scope.pointValueSymbols = $scope.pointValue.split("");
                $scope.editPoint = undefined;
            } else if (item.validationPattern == $scope.validations.time) {
                $scope.pointValueSymbols = Array.from($scope.pointValue);
                $scope.editPoint = $scope.editablePointEnum.number;
            } else {
                $scope.editPoint = $scope.editablePointEnum.info;
            }

            if (!getAllowedReadWriteUsers(item).includes($scope.userType)) {
                $scope.editPoint = undefined;
            }

            let variantsArr = convertToArray($scope.currentVariants);
            $scope.cursorPosition = variantsArr.indexOf($scope.state[$scope.currentPointParam]);
        };

        $scope.setPCMode = function (selectBlock) {
            $scope.state.pcMode[$scope.state.blockSelected] = selectBlock;
        };

        $scope.getPCMode = function (blockSelected) {
            if (blockSelected == undefined) {
                blockSelected =  $scope.state.blockSelected;
            }
            return $scope.state.pcMode[blockSelected];
        };

        $scope.setPressed = function ($event) {
            var img = $event.target;
            img.src = img.src.replace("on.", "pressed.");
        };

        $scope.setUnpressed = function ($event) {
            var img = $event.target;
            img.src = img.src.replace("pressed.", "on.");
        };

        $scope.changeVolume = function (type) {
            if (RegExp("UP").test(type)) {
                if ($scope.volume !== 100) {
                    $scope.volume += 20;
                }
            }
            else {
                if ($scope.volume !== 0) {
                    $scope.volume -= 20;
                }
            }
            $scope.showVolumeBar();
        };
        var promise = null;
        $scope.showVolumeBar = function () {
            if (promise) {
                $timeout.cancel(promise);
            }
            $scope.isVolumeShown = true;
            $(clsj($scope.cls.volumeBar)).width($scope.volume + "%");
            $("." + $scope.cls.statusWindow).css("opacity", "0");
            $scope.title = "bar";
            promise = $timeout(function () {
                $scope.isVolumeShown = false;
                $("." + $scope.cls.statusWindow).css("opacity", "1");
            }, 400);
        };

        $scope.insertNumber = function (number) {
            var currentPoint = getByParamName($scope.currentPointParam,
                $scope.state.blockSelected, $scope.getPCMode());
            if (!currentPoint.hasOwnProperty("validationPattern") || $scope.editPoint === undefined) {
                return
            }

            let symbolsCopy = $scope.pointValueSymbols.slice();
            let validationPattern = currentPoint["validationPattern"];
            if (validationPattern == $scope.validations.ipAddress) {
                symbolsCopy[$scope.focusedPointValueSymbolNumber] = number;
                let newValue = symbolsCopy.join("");
                if (!ipRegex.test(newValue)) {
                    return
                }

                $scope.pointValueSymbols = symbolsCopy;
                $scope.pointValue = $scope.pointValueSymbols.join("");

                if (currentPoint.param == "settingsPcBlockIpAddress" || currentPoint.param == "settingsPcBlockIpMask") {
                    let settingsCurrentPcBlock = $scope.state["settingsCurrentPcBlock"];
                    let settingsRouteNumber = parseInt($scope.state["settingsRouteNumber"]);
                    $scope.blockSettings[settingsCurrentPcBlock][settingsRouteNumber][currentPoint.param] = $scope.pointValue;
                } else {
                    saveParamToState($scope.currentPointParam, $scope.pointValue);
                }

                if ($scope.focusedPointValueSymbolNumber < $scope.pointValueSymbols.length - 1) {
                    $scope.focusedPointValueSymbolNumber++;
                    if ($scope.pointValueSymbols[$scope.focusedPointValueSymbolNumber] == ".") {
                        $scope.focusedPointValueSymbolNumber++;
                    }
                }
            } else if (validationPattern == $scope.validations.number) {
                let symbolsLen = symbolsCopy.length;
                if (symbolsLen < currentPoint.max.length && $scope.focusedPointValueSymbolNumber == symbolsLen - 1) {
                    symbolsCopy.push(number);
                    $scope.focusedPointValueSymbolNumber++;
                } else {
                    symbolsCopy[$scope.focusedPointValueSymbolNumber] = number;
                }

                let value = symbolsCopy.join('');
                let parsedValue = parseInt(value);
                if (parseInt(currentPoint.min) <= parsedValue && parsedValue <= parseInt(currentPoint.max)) {
                    $scope.pointValueSymbols = symbolsCopy;
                    $scope.pointValue = value;

                    saveParamToState($scope.currentPointParam, $scope.pointValue);

                    $scope.moveFocusToNext(symbolsLen, '.');
                }
            } else if (validationPattern == $scope.validations.time) {
                symbolsCopy[$scope.focusedPointValueSymbolNumber] = number;
                let time = symbolsCopy.join('');
                if (!moment(time, extendedTimeFormat, true).isValid()) {
                    return
                }
                $scope.pointValueSymbols = Array.from(time);
                $scope.state.timeOffset = moment(time, extendedTimeFormat).valueOf() - moment().valueOf();

                $scope.moveFocusToNext($scope.pointValueSymbols.length, '.: ');
            } else if (validationPattern == $scope.validations.info) {
            }
        };

        $scope.moveFocusToNext = function (symbolsLength, skipSymbolsStr) {
            let skipSymbols = Array.from(skipSymbolsStr);
            if ($scope.focusedPointValueSymbolNumber < symbolsLength - 1) {
                $scope.focusedPointValueSymbolNumber++;
                let focusedSymbol = $scope.pointValueSymbols[$scope.focusedPointValueSymbolNumber];
                if ($.inArray(focusedSymbol, skipSymbols) > -1) {
                    $scope.focusedPointValueSymbolNumber++;
                }
            }
        };

        $scope.pressedNumberButton = function (number) {
            if ($scope.isPoint) {
                $scope.insertNumber(number);
            }
            else {
                $scope.goToNextPoint(number);
            }
        };

        $scope.pressedEnterButton = function () {
            var currentPoint = getByParamName($scope.currentPointParam,
                $scope.state.blockSelected, $scope.getPCMode());

            if ($scope.isPoint && $scope.editPoint === $scope.editablePointEnum.variants) {
                let variantsArr = convertToArray($scope.currentVariants);
                saveParamToState($scope.currentPointParam, variantsArr[$scope.cursorPosition]);
            }

            if (currentPoint) {
                if (currentPoint["verification"] == $scope.verification.password) {
                    if ($scope.state["password"] == $scope.pointValue) {
                        switch (currentPoint.param) {
                            case "setAccessUser":
                                $scope.changeUserType($scope.access.user);
                                break;
                            case "setAccessReview":
                                $scope.changeUserType($scope.access.review);
                                break;
                            case "setAccessSetting":
                                $scope.changeUserType($scope.access.setting);
                                break;
                        }
                    } else {
                        return;
                    }
                } else if (currentPoint.param == "blockSelection") {
                    let selectedBlock;
                    switch ($scope.state["blockSelection"]) {
                        case blocksNaming.pc1:
                            selectedBlock = BLOCKS.PC1;
                            break;
                        case blocksNaming.pc2:
                            selectedBlock = BLOCKS.PC2;
                            break;
                        case blocksNaming.bars:
                            selectedBlock = BLOCKS.BARS;
                            break;
                    }
                    $scope.state.blockSelected = selectedBlock;
                    $scope.updateStatusMenu();
                } else if (currentPoint.param == "callMenuAbonentAddress" || currentPoint.param == "callMenuGroupAddress") {
                    if (currentPoint.param == "callMenuAbonentAddress") {
                        $scope.state.callMode = $scope.callModes.abonent;
                    } else if (currentPoint.param == "callMenuGroupAddress") {
                        $scope.state.callMode = $scope.callModes.group;
                    }
                    $scope.goToPreviousPointDouble();
                    return;
                } else if (currentPoint.param == "channelPriority") {
                    if ($scope.state['channelPriority'] == "Ведущая") {
                        $scope.setPCMode(PC_MODES.PPRCH_MASTER);
                    } else {
                        $scope.setPCMode(PC_MODES.PPRCH_SLAVE);
                    }
                    $scope.goToPreviousPoint();
                    return;
                }
            }

            if ($scope.isPoint) {

                $scope.goToPreviousPoint();
            }
            else {
                $scope.goToNextPoint($scope.cursorPosition);
            }
        };

        $scope.pressedStarButton = function () {
            if ($scope.isPoint) {
                $scope.state = $scope.previousState;
            }
            $scope.goToPreviousPoint();
        };

        $scope.pressedArrowButton = function (button) {
            var itemHeight = $(clsj($scope.cls.selected)).height();
            var lastIndex = $scope.menuView.length - 1;
            var contentContainer = $(clsj($scope.cls.contentContainer));
            if (RegExp("UP").test(button)) {
                if ($scope.isPoint && $scope.editPoint === $scope.editablePointEnum.variants) {
                    let variantsArr = convertToArray($scope.currentVariants);
                    if ($scope.cursorPosition === 0) {
                        $scope.cursorPosition = variantsArr.length - 1;
                    }
                    else {
                        $scope.cursorPosition -= 1;
                    }
                }
                else {
                    if ($scope.cursorPosition === 0) {
                        $scope.cursorPosition = lastIndex;
                    }
                    else {
                        $scope.cursorPosition -= 1;
                    }
                    contentContainer.scrollTop(itemHeight * $scope.cursorPosition);
                }
            }
            else if (RegExp("DOWN").test(button)) {
                if ($scope.isPoint && $scope.editPoint === $scope.editablePointEnum.variants) {
                    let variantsArr = convertToArray($scope.currentVariants);
                    if ($scope.cursorPosition === variantsArr.length - 1) {
                        $scope.cursorPosition = 0;
                    }
                    else {
                        $scope.cursorPosition += 1;
                    }
                }
                else {
                    if ($scope.cursorPosition === lastIndex) {
                        $scope.cursorPosition = 0;
                    }
                    else {
                        $scope.cursorPosition += 1;
                    }
                    contentContainer.scrollTop(itemHeight * $scope.cursorPosition);
                }
            }
            else if (RegExp("LEFT").test(button)) {
                if ($scope.isPoint && $scope.editPoint === $scope.editablePointEnum.number) {
                    if ($scope.focusedPointValueSymbolNumber > 0) {
                        $scope.focusedPointValueSymbolNumber--;
                    }
                }
            }
            else {
                if ($scope.isPoint && $scope.editPoint === $scope.editablePointEnum.number) {
                    if ($scope.focusedPointValueSymbolNumber < $scope.pointValueSymbols.length - 1) {
                        $scope.focusedPointValueSymbolNumber++;
                    }
                }
            }
        };

        $scope.processClick = function (buttonName) {
            if ($scope.keysBlocked) {
                return;
            }

            switch (buttonName) {
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    $scope.pressedNumberButton(buttonName);
                    break;
                case "STAR":
                    $scope.pressedStarButton();
                    break;
                case "ENTER":
                    $scope.pressedEnterButton();
                    break;
                case "VOLUME DOWN":
                case "VOLUME UP":
                    $scope.changeVolume(buttonName);
                    break;
                case "ARROW UP":
                case "ARROW DOWN":
                case "ARROW LEFT":
                case "ARROW RIGHT":
                    $scope.pressedArrowButton(buttonName);
                    break;
            }
        };

        $scope.getStateViewValueByName = function (param) {
            if (param == "settingsPcBlockIpAddress" || param == "settingsPcBlockIpMask") {
                let settingsCurrentPcBlock = $scope.state["settingsCurrentPcBlock"];
                let settingsRouteNumber = parseInt($scope.state["settingsRouteNumber"]);
                return $scope.blockSettings[settingsCurrentPcBlock][settingsRouteNumber][param];
            } else if (param == 'password') {
                return '****'
            } else if (param == 'callSubMenu') {
                let menuInfo = $scope.state.callMode;
                if ($scope.state.callMode == $scope.callModes.abonent) {
                    menuInfo += $scope.state['callMenuAbonentAddress'];
                } else if ($scope.state.callMode == $scope.callModes.group) {
                    menuInfo += $scope.state['callMenuGroupAddress'];
                }

                return menuInfo
            } else if(param == 'channelMode') {
                let digitalModes = [PC_MODES.PPRCH_SLAVE, PC_MODES.PPRCH_MASTER, PC_MODES.DIGITAL];
                let analogModes = [PC_MODES.SCAN, PC_MODES.FIXED_CHANNEL];
                if (digitalModes.includes($scope.getPCMode())) {
                    return 'Цифр.'
                } else if (analogModes.includes($scope.getPCMode())) {
                    return 'Аналог.'
                }
            } else if (setAccessMenuRegex.test(param)) {
                return "";
            } else if (param && param.startsWith('info')) {
                return $scope.state[param];
            } else if (param && param.startsWith('callMenu')) {
                return ""
            } else {
                return $scope.state[param];
            }
        };

        $scope.updateStatusMenu = function () {
            $scope.statusMenuView.workingMode = getMainMode();
            $scope.statusMenuView.blockSelected = $scope.state.blockSelected;
        };

        function saveParamToState(paramName, val) {
            $scope.state[paramName] = val;
        }

        function resetPointBuffers() {
            $scope.pointValueSymbols = [];
            $scope.currentVariants = [];
        }

        $scope.init();
    });

function clsj(str) {
    return "." + str;
}

var BLOCKS = {
    BARS: blocksNaming.bars,
    PC1: blocksNaming.pc1,
    PC2: blocksNaming.pc2,
    none: ""
};

var PC_MODES = {
    PPRCH_MASTER: "PPRCH_MASTER",
    PPRCH_SLAVE: "PPRCH_SLAVE",
    DIGITAL: "FRCH_DIGITAL",
    FIXED_CHANNEL: "FRCH_ANALOG_FIXED_CHANNEL",
    SCAN: "FRCH_ANALOG_SCAN"
};

let MAIN_SCREEN_PC_MODES_FRCH = "УКВ-Ц-ФРЧ";
let MAIN_SCREEN_PC_MODES_PPRCH_DIGITAL = "УКВ-Ц-ППРЧ";
let MAIN_SCREEN_PC_MODES_PPRCH_ANALOG = "УКВ-А-ППРЧ";
var MAIN_SCREEN_PC_MODES = {};
MAIN_SCREEN_PC_MODES[PC_MODES.PPRCH_MASTER] = MAIN_SCREEN_PC_MODES_FRCH;
MAIN_SCREEN_PC_MODES[PC_MODES.PPRCH_SLAVE] = MAIN_SCREEN_PC_MODES_FRCH;
MAIN_SCREEN_PC_MODES[PC_MODES.DIGITAL] = MAIN_SCREEN_PC_MODES_PPRCH_DIGITAL;
MAIN_SCREEN_PC_MODES[PC_MODES.FIXED_CHANNEL] = MAIN_SCREEN_PC_MODES_PPRCH_ANALOG;
MAIN_SCREEN_PC_MODES[PC_MODES.SCAN] = MAIN_SCREEN_PC_MODES_PPRCH_ANALOG;

function State(blockSelected, pcCable, callMode) {
    this.points = [];
    this.power = false;
    this.blockSelected = blockSelected;
    this.mainPC1Power = false;
    this.mainPC2Power = false;
    this.pluggedPCCabel = pcCable;
    this.pc1Ready = false;
    this.pc2Ready = false;
    this.timeOffset = 0;
    this.pcMode = {};
    this.callMode = callMode;
    this.createDefaultParameters();
}

State.prototype.back = function () {
    this.points.pop();
};

State.prototype.nextPoint = function (next) {
    this.points.push(next);
};

State.prototype.createDefaultParameters = function () {
    let paramObjects = findNestedByKey(getData(BLOCKS.BARS), "param");
    for (var pcModeKey in PC_MODES) {
        let params = findNestedByKey(getData(BLOCKS.PC1, PC_MODES[pcModeKey]), "param");
        paramObjects = paramObjects.concat(params);
    }
    for (var i = 0, il = paramObjects.length; i < il; i++) {
        let paramValue;
        if (paramObjects[i].hasOwnProperty("default")) {
            paramValue = paramObjects[i].default;
        } else if (paramObjects[i].hasOwnProperty("info")) {
            paramValue = paramObjects[i].info;
        } else if (paramObjects[i].hasOwnProperty("variants")) {
            paramValue = paramObjects[i].variants["0"];
        }
        this[paramObjects[i].param] = paramValue;
    }
};

function getByParamName(paramName, blockSelected, pcMode) {
    let jsonMenu = getData(blockSelected, pcMode);
    var objArr = findNestedByKey(jsonMenu, "param");
    var res = null;
    for (var i in objArr) {
        if (objArr[i].param === paramName) {
            res = objArr[i];
            break;
        }
    }
    return res;
}

function getData(blockSelected, pcMode) {
    var data = JSON_MENU_DATA;
    var subMenu;
    if (blockSelected == BLOCKS.BARS) {
        subMenu = JSON_MENU_BARS;
    } else if (blockSelected == BLOCKS.PC1 || blockSelected == BLOCKS.PC2) {
        subMenu = JSON_MENU_PC;
        subMenu[0].subpoints = getPCCanalSubMenuData(pcMode);
    } else {
        subMenu = {};
    }
    data[barsModuleSelectionLetter].subpoints = subMenu;
    return data;
}

function getPCCanalSubMenuData(pcMode) {
    let canalSubMenu = {};
    canalSubMenu[PC_MODES.PPRCH_MASTER] = MODE_PPRCH_SLAVE;
    canalSubMenu[PC_MODES.PPRCH_SLAVE] = MODE_PPRCH_MASTER;
    canalSubMenu[PC_MODES.DIGITAL] = MODE_FRCH_DIGITAL;
    canalSubMenu[PC_MODES.FIXED_CHANNEL] = MODE_FRCH_ANALOG_FIXED_CHANNEL;
    canalSubMenu[PC_MODES.SCAN] = MODE_FRCH_ANALOG_SCAN;
    return canalSubMenu[pcMode];
}

function findNestedByKey(obj, key, memo) {
    var i,
        proto = Object.prototype,
        ts = proto.toString,
        hasOwn = proto.hasOwnProperty.bind(obj);

    if ('[object Array]' !== ts.call(memo)) memo = [];

    for (i in obj) {
        if (hasOwn(i)) {
            if (i === key) {
                memo.push(obj);
            } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
                findNestedByKey(obj[i], key, memo);
            }
        }
    }

    return memo;
}

function convertToArray(obj) {
    var keys = Object.keys(obj), res = [];
    for (var i = 0, il = keys.length; i < il; i++) {
        res.push(obj[keys[i]]);
    }
    return res;
}

function getAllowedReadUsers(item) {
    let allowedReadUsers = [];
    if (item && item.access_r) {
        allowedReadUsers.push(...item.access_r);
    }
    return allowedReadUsers;
}

function getAllowedReadWriteUsers(item) {
    let allowedReadWriteUsers = [];
    if (item && item.access_rw) {
        allowedReadWriteUsers.push(...item.access_rw);
    }
    return allowedReadWriteUsers;
}

function getAllowedAccessUsers(item) {
    return getAllowedReadUsers(item).concat(getAllowedReadWriteUsers(item));
}

function getMainMode() {
    return mainModeSwitcherStates[mainMode];
}