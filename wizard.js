$(document).ready(function(){
	var counter=0;
	var $current=$('#p'+counter)
	$current.addClass('current');
	var numberOfPages=$(".main").children('.slide').length;


	$('.prevbt').click(function(){
		$current.removeClass('current')
		counter=prevpagecounter(counter);
		console.log(counter)
		$current=$('#p'+counter)
		$current.addClass('current');
	})

	$('.nextbt').on('click',function(){
		
		counter=nextpagecounter(counter);
		console.log(counter)
		$next=$('#p'+counter);
		$next.addClass('current');
		$current.removeClass('current');
		$current=$next;

		
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
