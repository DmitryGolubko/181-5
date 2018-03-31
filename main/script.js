var CABELS = {
	ANT_main: false,
	BAT_main: false,
    PU_main: false,
    PU_PC1: false,
    PU_PC2: false,
    INT_PC1: false,
    INT_PC2: false,
    TLF_PC1: false,
    TLF_PC2: false
};

var mainModeSwitcherStates = {
    0: " ",
    1: "PC1←Eth",
    2: "Eth→PC2",
    3: "PC1←Eth→PC2"
};
var mainMode = 0;
var pc1Mode = 1;
var pc2Mode = 1;

$(document).ready(function () {
    var cls = {
            activePosition: "active-position",
            toggler: "toggler",
            indicatorOn: "indicator-on",
            indicatorOff: "indicator-off",
            indicatorErr: "indicator-err"

        },
        ids = {
            mainModeSwitcher: "main-mode-switcher",
            pc1ModeSwitcher: "pc1-mode-switcher",
            pc2ModeSwitcher: "pc2-mode-switcher",

            powerToggler: "power-toggler",
            pc1MainToggler: "pc1-main-toggler",
            pc2MainToggler: "pc2-main-toggler",

            pc1Toggler: "pc1-toggler",
            pc2Toggler: "pc2-toggler",

            plus27BsIndicator: "plus-27-bs-indicator",
            pc1Plus27BIndicator: "pc1-plus-27b-indicator",
            pc2Plus27BIndicator: "pc2-plus-27b-indicator"

        }


    var defaultSwitcherAngle = 198,
        defaultMainSwitcherAngle = 180;


    var powerToggled = false,
        pc1MainToggled = false,
        pc2MainToggled = false,
        pc1Toggled = false,
        pc2Toggled = false


    function idsj(str) {
        return "#" + str;
    }

    function clsj(str) {
        return "." + str;
    }

    var mainModeSwitcher = idsj(ids.mainModeSwitcher);

    var pressedMainModeSwitcher = false;

    $(mainModeSwitcher).rotate(defaultMainSwitcherAngle);

    $(mainModeSwitcher).rotate({
        bind: {
            mousedown: function () {
                var currAngle = $(this).getRotateAngle()[0];
                $(this).rotate({
                    angle: currAngle,
                    animateTo: currAngle + 3600000,
                    duration: 60000000
                });
                pressedMainModeSwitcher = true;
            }
        }
    });

    $(mainModeSwitcher).bind("mouseup", function (evt) {
        mainModeSwitcherHandler(evt);
    });

    $(mainModeSwitcher).bind("mouseleave", function (evt) {
        mainModeSwitcherHandler(evt);
    });


    function rotateElem(elem, currAngle, degree) {
        elem.rotate({
            duration: 1500,
            angle: currAngle,
            animateTo: degree
        });
    }


    function mainModeSwitcherHandler(evt) {
        if (evt.type === "mouseleave" && pressedMainModeSwitcher || evt.type === "mouseup") {
            if (evt.target === $(mainModeSwitcher).find("img").get(0)) {
                var elemId = $(mainModeSwitcher);
                elemId.stopRotate();
                var currAngle = elemId.getRotateAngle()[0] % 360;
                var oneGap = 90;
                var pointedMode = Math.round(currAngle / oneGap);
                rotateElem(elemId, currAngle, pointedMode * oneGap + defaultMainSwitcherAngle % oneGap);
                currAngle = elemId.getRotateAngle()[0] % 360;
                var tempAngle = currAngle < defaultMainSwitcherAngle ? 360 + currAngle - defaultMainSwitcherAngle : currAngle - defaultMainSwitcherAngle;
                var currMode = Math.round(tempAngle / oneGap);
                currMode = currMode < 0 ? currMode + 3 : currMode;
                currMode = currMode > 3 ? currMode - 4 : currMode;
                mainMode = currMode;
                pressedMainModeSwitcher = false;
            }
        }
    }

    var togglerSelector = clsj(cls.toggler) + " img";

    $(togglerSelector).bind("click", function (evt) {
        var clickedButton = $(evt.target);
        if (clickedButton.hasClass("toggler-on") || clickedButton.hasClass("toggler-off")) {
            clickedButton.toggle();
            clickedButton.siblings().toggle();
        }
    });

    addModeSwitcherHandler(idsj(ids.pc1ModeSwitcher) + " img", "pc1");
    addModeSwitcherHandler(idsj(ids.pc2ModeSwitcher) + " img", "pc2");

    function addModeSwitcherHandler(selector, typeOfSwitcher) {
        var isModeSwitcherPressed = false;
        $(selector).rotate(defaultSwitcherAngle);

        $(selector).rotate({
            bind: {
                mousedown: function () {
                    // $(clsj(cls.activePosition)).removeClass(cls.activePosition);
                    var currAngle = $(this).getRotateAngle()[0];
                    $(this).rotate({
                        angle: currAngle,
                        animateTo: currAngle + 3600000,
                        duration: 60000000
                    });
                    isModeSwitcherPressed = true;
                }
            }
        });

        $(selector).bind("mouseup", function (evt) {
            middleModeSwitcherHandler(evt, typeOfSwitcher);
        });

        $(selector).bind("mouseleave", function (evt) {
            middleModeSwitcherHandler(evt, typeOfSwitcher);
        });


        function middleModeSwitcherHandler(evt) {
            if (evt.type === "mouseleave" && isModeSwitcherPressed || evt.type === "mouseup") {
                if (evt.target === $(selector).get(0)) {
                    var elemId = $(selector);
                    elemId.stopRotate();
                    var currAngle = elemId.getRotateAngle()[0] % 360;
                    var oneGap = 36;
                    var pointedMode = Math.round(currAngle / oneGap);
                    rotateElem(elemId, currAngle, pointedMode * oneGap + defaultSwitcherAngle % oneGap);
                    currAngle = elemId.getRotateAngle()[0] % 360;
                    var tempAngle = currAngle < defaultSwitcherAngle ? 360 + currAngle - defaultSwitcherAngle : currAngle - defaultSwitcherAngle;
                    var currMode = Math.round(tempAngle / oneGap);
                    currMode = currMode < 0 ? currMode + 11 : currMode + 1;
                    // start with 1

                    currMode = currMode > 10 ? currMode - 10 : currMode;
                    if (typeOfSwitcher == "pc1") {
                        pc1Mode = currMode;
                    }
                    else if (typeOfSwitcher == "pc2") {
                        pc2Mode = currMode;
                    }
                    isModeSwitcherPressed = false;
                    $(selector).parent().find(".position" + currMode).addClass(cls.activePosition);
                }
            }
        }
    }


    $(idsj(ids.powerToggler)).bind("click", function () {
        powerToggled = !powerToggled;
        changeIndicator(ids.plus27BsIndicator);
        if (pc1MainToggled) {
            changeIndicator(ids.pc1Plus27BIndicator);
        }
        if (pc2MainToggled) {
            changeIndicator(ids.pc2Plus27BIndicator);
        }
    });

    $(idsj(ids.pc1MainToggler)).bind("click", function () {
        pc1MainToggled = !pc1MainToggled;
        if (powerToggled) {
            changeIndicator(ids.pc1Plus27BIndicator);
        }
    });


    $(idsj(ids.pc2MainToggler)).bind("click", function () {
        pc2MainToggled = !pc2MainToggled;
        if (powerToggled) {
            changeIndicator(ids.pc2Plus27BIndicator);
        }
    });

    function changeIndicator(id) {
        $(idsj(id)).toggleClass(cls.indicatorOff).toggleClass(cls.indicatorOn);
    }

    $(idsj(ids.pc1Toggler)).bind("click", function () {
        pc1Toggled = !pc1Toggled;
    });

    $(idsj(ids.pc2Toggler)).bind("click", function () {
        pc2Toggled = !pc2Toggled;
    });



    jsPlumb.ready(function(){
        jsPlumb.setContainer("jsPlumbContainer");

        

        /*var common = {
            isSource:true,
            isTarget:true,
            connector: ["Bezier", {curviness:200}],
        };*/

        $("#PC-pult-bars-btn").click(function() {
            jsPlumb.detachAllConnections("cable1");
            CABELS.PU_PC1 = false;
            CABELS.PU_PC2 = false;

            if (CABELS.PU_main) {
                CABELS.PU_main = false;
            } else {
                createJoint("cable1", "PC-pult-bars-btn");
                CABELS.PU_main = true;
            }          
        });

        $("#PC-pult-pc1-btn").click(function () {
            jsPlumb.detachAllConnections("cable1");
            CABELS.PU_main = false;
            CABELS.PU_PC2 = false;

            if (CABELS.PU_PC1) {
                CABELS.PU_PC1 = false;
            } else {
                createJoint("cable1", "PC-pult-pc1-btn");
                CABELS.PU_PC1 = true;
            }   
        });

        $("#PC-pult-pc2-btn").click(function () {
            jsPlumb.detachAllConnections("cable1");
            CABELS.PU_main = false;
            CABELS.PU_PC1 = false;

            if (CABELS.PU_PC2) {
                CABELS.PU_PC2 = false;
            } else {
                createJoint("cable1", "PC-pult-pc2-btn");
                CABELS.PU_PC2 = true;
            }  
        });
		
		/*$("#ANT-mid-left-btn").click(function () {
			if (CABELS.ANT_main) {
				jsPlumb.detachAllConnections("ANT-mid-left-btn");
			} else {
				createJoint("cable2", "INT-mid-left-btn");
			}
		});*/
		
		$("#battery-btn").click(function () {
			if (CABELS.BAT_main) {
				jsPlumb.detachAllConnections("battery-btn");
			} else {
				createJoint("battery-btn", "battery-connection-point");
			}
			CABELS.BAT_main = !CABELS.BAT_main;
		});
		

        $("#INT-mid-left-btn").click(function () {
            if (CABELS.INT_PC1) {
                jsPlumb.detachAllConnections("INT-mid-left-btn");
            } else {
                createJoint("cable2", "INT-mid-left-btn");
            }
            CABELS.INT_PC1 = !CABELS.INT_PC1;
        });

        $("#INT-bott-left-btn").click(function () {
            if (CABELS.INT_PC2) {
                jsPlumb.detachAllConnections("INT-bott-left-btn");
            } else {
                createJoint("cable2", "INT-bott-left-btn");
            }
            CABELS.INT_PC2 = !CABELS.INT_PC2;
        });

        $("#TLF-mid-left-btn").click(function () {
            if (CABELS.TLF_PC1) {
                jsPlumb.detachAllConnections("TLF-mid-left-btn");
            } else {
                createJoint("cable2", "TLF-mid-left-btn");
            }
            CABELS.TLF_PC1 = !CABELS.TLF_PC1;
        });

        $("#TLF-bott-left-btn").click(function () {
            if (CABELS.TLF_PC2) {
                jsPlumb.detachAllConnections("TLF-bott-left-btn");
            } else {
                createJoint("cable2", "TLF-bott-left-btn");
            }
            CABELS.TLF_PC2 = !CABELS.TLF_PC2;
        });

        //createJoint("cable1", "pc1-remote-controller-joint");

        /*jsPlumb.connect({
            source:"cable1",
            target:"pc1-remote-controller-joint",
            connector: ["Bezier", {curviness:200}],
            endpointStyle:{fillStyle:"rgb(178, 178, 178)"},
            paintStyle:{outlineColor:"rgb(178, 178, 178)", lineWidth:10},

            //endpoint:"Rectangle",
            anchors:["Center"]
        });*/

        /*jsPlumb.addEndpoint("cable1", {
            paintStyle:{ fillStyle:"rgba(0,0,0,0)", outlineColor:"black", outlineWidth:1 },
            anchors:["Center"]

        }, common);

        createJoint("bars-remote-controller-joint", common);
        createJoint("pc1-remote-controller-joint", common);
        createJoint("pc2-remote-controller-joint", common);*/
    });

    function createJoint(sourceId, targetId){
        jsPlumb.connect({
            source:sourceId,
            target:targetId,
            connector: ["Bezier", {curviness:200}],
            endpointStyle: { fillStyle: "rgba(222, 222, 222, 1)",radius:20},
            paintStyle:{outlineColor:"rgba(222, 222, 222, 0.4)", lineWidth:5},
            anchors: ["Top", "Center"],
        });
    }


    function checkForEventTargets(sourceId, targetId){

    }

    /*function createJoint(id, jsPlumbCommon){
        jsPlumb.addEndpoint(id, {
            paintStyle:{ fillStyle:"rgba(0,0,0,0)", outlineColor:"red", outlineWidth:1 },
            anchors:["Center"],
            beforeDrop: function(evt){
                checkForEventTargets(evt.sourceId, evt.targetId);
                return true; // return false if connection should be rejected
            }
        }, jsPlumbCommon);
    }*/

});





