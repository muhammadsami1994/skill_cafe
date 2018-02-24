dashboard.filter('SKGetMonthName',function(){
	return function(input){
		if(input){
			var date = new Date(input);
			var month = ["Jan","Fab","March","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
			return month[date.getMonth()];
		}
	}
}).filter('SKGetDate',function(){
	return function(input){
		if(input){
			var date = new Date(input);
			return date.getDate();
		}
	}
})