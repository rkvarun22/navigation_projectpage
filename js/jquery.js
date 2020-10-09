console.clear();    
    
    var $document = $(document);
    var $window = $(window);
  
    var $slidesContainer = $(".slides-container");
    var $slides = $(".slide");
    var $currentSlide = $slides.first();
  var $lastSlide;

        var isAnimating = false;

    
    var pageHeight = $window.innerHeight();
  var pageWidth = $window.innerWidth();

    

    
  TweenLite.set($currentSlide,{x:-pageWidth})


   
    $window.on("resize", onResize).resize();
    $window.on("mousewheel DOMMouseScroll", onMouseWheel);
    

        function onMouseWheel(event)
    {
        
        var delta = event.originalEvent.wheelDelta / 30 || -event.originalEvent.detail;

        
        if(delta < -0.5)
        {
            goToNextSlide();
        }
        else if(delta > 0.5)
        {
            goToPrevSlide();
        }

        //event.preventDefault();
    }

    
    function goToPrevSlide()
    {
        if($currentSlide.prev().length)
        {
            goToSlide($currentSlide.prev());
        }
    }

    
    function goToNextSlide()
    {
        if($currentSlide.next().length)
        {
            goToSlide($currentSlide.next());
        }
    }

    
function goToSlide($slide){
  
  
  if(!isAnimating && $slide.length){
    
    isAnimating = true;

    $lastSlide = $currentSlide;
    $currentSlide = $slide;

    
    var action = new TimelineMax({onComplete: onSlideChangeEnd, onCompleteScope: this})
    .to($currentSlide, 1, {x:-pageWidth, ease: Power2.easeIn})
    .to($lastSlide,0.8,{x:+pageWidth})

    }
}

        function onSlideChangeEnd()
    {
        isAnimating = false;
    }

    
function onResize(event)
{

  
  var newPageHeight = $window.innerHeight();
  var newPageWidth = $window.innerWidth();

  
  if(pageHeight !== newPageHeight || pageWidth !== newPageWidth )
  {
    pageHeight = newPageHeight;
    pageWidth = newPageWidth;

    
    TweenLite.set([$slidesContainer, $slides], {height: pageHeight + "px", width: pageWidth + "px"});
    TweenLite.to($currentSlide,0,{x:-pageWidth})

  }

}