$(function () {
    $(".left-control-page").each(function () { fixContrlElement(this,"left") });
    $(".right-control-page").each(function () { fixContrlElement(this, "right") });

    $(".sub-control-page").css("display", "none");
});


function fixContrlElement(element, align) {
    var pos;
    if (align == "left")
        pos = "first";
    if (align == "right")
        pos="last"
    var width = $(element).find("div:"+pos).width()
    var padding = parseInt($(element).css("padding-"+align));
    $(element).css(align,-1*(width+padding+5));
}