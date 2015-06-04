$(document).ready(function(){
	var counter=0;
	var $current=$('#p'+counter)
	$current.addClass('current');
	var animend=whichTransitionEvent();
	var numberOfPages=$(".main").children('.slide').length;
	var animEndEventNames = {
			'WebkitAnimation' : 'webkitAnimationEnd',
			'OAnimation' : 'oAnimationEnd',
			'msAnimation' : 'MSAnimationEnd',
			'animation' : 'animationend'
		},
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ]
	var isanim = false;

	$('.prevbt').click(function(){
		$current.removeClass('current')
		counter=prevpagecounter(counter);
		console.log(counter)
		$current=$('#p'+counter)
		$current.addClass('current');
	})

	$('.nextbt').on('click',function(){
		if(isanim)
			return;
		isanim=true;
		counter=nextpagecounter(counter);
		console.log(counter)
		$next=$('#p'+counter);
		$current.addClass('Next_SlideOut').on(animEndEventName,function(){
			console.log('end c')
			$current.off(animEndEventName)
			
		})

			$next.addClass('current');
			$next.addClass('Next_SlideIn');
		$next.on(animEndEventName,function(){
				console.log('end n');
				$current.removeClass('current');
				$current.off(animEndEventName);
				$next.off(animEndEventName);
				$current.removeClass('Next_SlideOut')
				$next.removeClass('Next_SlideIn')
				isanim=false;
				$next.off(animEndEventName);
				$current=$next;

			})
		
	})
})
	
function nextpagecounter(current){
	var numberOfPages=$(".main").children('.slide').length;
	return (((current+1)%numberOfPages)+numberOfPages)%numberOfPages;
}
function prevpagecounter(current){
	var numberOfPages=$(".main").children('.slide').length;
	return (((current-1)%numberOfPages)+numberOfPages)%numberOfPages;
}
function whichTransitionEvent(){
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition':'transitionend',
      'OTransition':'oTransitionEnd',
      'MozTransition':'transitionend',
      'WebkitTransition':'webkitTransitionEnd'
    }

    for(t in transitions){
        if( el.style[t] !== undefined ){
            return transitions[t];
        }
    }
}