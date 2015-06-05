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
	/////////////////////////////////////////////////
	//icons
	for(var c = 0;c<numberOfPages;c++){
		$('.iconsL').append("<li class='icon' id='i"+c+"'></li>");
	}
	$('#i0').css('background-position','-67px -7px');
	$('.icon').click(function(){
		if(isanim)
			return;
		isanim=true;
		var iconid = $(this).attr('id');
		iconid=parseInt(iconid.substring(1));

		console.log(iconid);
		var $next=$('#p'+iconid);
		if(iconid==counter){
			isanim=false;
			return;
		}
		else{
			$next.addClass('current');
			if(iconid>counter){
				$current.addClass('Next_SlideOut');
				$next.addClass('Next_SlideIn');
			}
			else{
				$current.addClass('Prev_SlideOut');
				$next.addClass('Prev_SlideIn');
			}
			$next.on(animEndEventName,function(){
				$current.removeClass('current');
				$next.off(animEndEventName);
				$current.removeClass('Prev_SlideOut')
				$next.removeClass('Prev_SlideIn')
				$current.removeClass('Next_SlideOut')
				$next.removeClass('Next_SlideIn')
				$('.icons').trigger('iconpointer',[counter,iconid]);
				counter=iconid;
				setButtons(counter,numberOfPages);
				isanim=false;
				$next.off(animEndEventName);
				$current=$next;
				
			}) 
		}

	})
	$('.icons').on('iconpointer',function(event,param1,param2){
		$('#i'+param2).css('background-position','-67px -7px');
		$('#i'+param1).css('background-position','-7px -7px');
	})
	/////////////////////////////////////////////////
	//previous button
	$('.prevbt').click(function(){
		if(isanim)
			return;
		isanim=true;
		counter=prevpagecounter(counter);
		console.log(counter)
		$next=$('#p'+counter);
		$current.addClass('Prev_SlideOut').on(animEndEventName,function(){
			console.log('end c')
			$current.off(animEndEventName)
			
		})

			$next.addClass('current');
			$next.addClass('Prev_SlideIn');
		$next.on(animEndEventName,function(){
				console.log('end n');
				$('.icons').trigger('iconpointer',[counter+1,counter]);
				$current.removeClass('current');
				$current.off(animEndEventName);
				$next.off(animEndEventName);
				$current.removeClass('Prev_SlideOut')
				$next.removeClass('Prev_SlideIn')
				setButtons(counter,numberOfPages);
				isanim=false;
				$next.off(animEndEventName);
				$current=$next;
				

			})
		
	})
	//////////////////////////////////////////////////////
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
				$('.icons').trigger('iconpointer',[counter-1,counter]);
				$current.removeClass('current');
				$current.off(animEndEventName);
				$next.off(animEndEventName);
				$current.removeClass('Next_SlideOut')
				$next.removeClass('Next_SlideIn')
				setButtons(counter,numberOfPages);
				isanim=false;
				$next.off(animEndEventName);
				$current=$next;
				

			})
		
	})
	////////////////////////////////////////////////////

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
function setButtons(counter,numberOfPages){
	if(counter==0){
		$('.prevbt').attr('disabled','disabled');
	}else{
		$('.prevbt').removeAttr('disabled');
	}
	if(counter==numberOfPages-1){
		$('.nextbt').attr('disabled','disabled');
	}
	else{
		$('.nextbt').removeAttr('disabled');
	}
}