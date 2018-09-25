$(document).ready(function () {

    //store trigger heights
    var blockTriggerHeight;
	

    // For each path, set the stroke-dasharray and stroke-dashoffset
    // equal to the path's total length, hence rendering it invisible
    function pathPrepare($el) {
        var lineLength = $el[0].getTotalLength();
        $el.css("stroke-dasharray", lineLength);
        $el.css("stroke-dashoffset", lineLength);
        //$el.css("stroke", "none");
        //$el.css("stroke-width", 10);
        //$el.css("stroke-linecap", "round");
    }

    // Store a reference to our paths
    var blockLineFirst = $("path#linepath");
    var blockCircleFirst = $("path#circlepath");

    // prepare SVG paths
    pathPrepare(blockLineFirst);
    pathPrepare(blockCircleFirst);

    // Store a reference to our triggers
    var blockTrigger = "#blockTrigger";

    // init controller
    var controller = new ScrollMagic.Controller();

    blockTriggerHeight = $(blockTrigger).height();

    // Create a timeline for ease of manipulation and the possibility
    // to play the animation back and forth at the requested speed.
    // Add each separate line animation to the timeline, animating the
    // stroke-dashoffset to 0. Use the duration, delay and easing to
    // achieve the perfect animation.

    // build tween

    var tween = new TimelineMax()
        .add(TweenMax.to(blockLineFirst, 0.3, { strokeDashoffset: 0, ease: Linear.easeNone })) // draw word for 0.3
        .add(TweenMax.to(blockCircleFirst, 0.3, { strokeDashoffset: 0, ease: Linear.easeNone }));

    var scene = new ScrollMagic.Scene({ triggerElement: blockTrigger, duration: blockTriggerHeight, tweenChanges: true })
        .setTween(tween)
        .addTo(controller);

    function setTriggerHeight() {
        // re-calculation height.
        //blockFirstTriggerHeight = $(blockFirstTrigger).height();
        blockTriggerHeight = $(blockTrigger).height();

        // update duration.
        scene3.duration(blockTriggerHeight);

    }

    //event on window resize
    $(window).on("resize", function () {
        setTriggerHeight();
    });

    // show indicators (requires debug extension)
    scene3.addIndicators();

});
