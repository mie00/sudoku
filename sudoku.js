(function(window){
	//removes duplicates and zeros from arr
	function set(arr){
		return arr.reduce(function(x,y){if(!(x.indexOf(y)+1))x.push(y);return x},[])
	}
	//gets numbers from 1 to 9 not in arr
	function complement(arr){
		return Array.apply(null,Array(9)).map(function(_,x){return x+1}).filter(function(x){return !(arr.indexOf(x)+1)})
	}
	//return the coordinates of a point in 9x9 grid
	function place(a){
		var x;
		return [(x=a%9),(a-x)/9]
	}
	//returns the coordinates of a point in 3x3 grid
	function place3(a){
		var x;
		return [(x=a%3),(a-x)/3]
	}
	//copies an arr
	function cp(arr){
		return arr.map(Number)
	}
	//gets the possibilities of an element in arr
	function possibilities(a,arr){

		var [x,y]=place(a);
		var [x3,y3]=[(x-x%3),(y-y%3)];
		return complement(set(Array.apply(null,Array(9)).map(function(_,z){return z*9+x;}).concat(
					Array.apply(null,Array(9)).map(function(_,z){return z+y*9;})
				).concat(
					Array.apply(null,Array(9)).map(function(_,z){var [i3,j3]=place3(z);return x3+i3+9*(y3+j3);})
				).map(function(x){return arr[x]})
		))
	}
	//tries the possibilities for the first empty element and pass it to itself again
	function recurr(arr) {
		var a;
		if ((a=arr.indexOf(0))+1){
			return possibilities(a,arr).reduce(function(y,x){
				var cparr=cp(arr)
				cparr[a]=x;
				return y.concat(recurr(cparr))
			},[])
		}
		return [arr]
	}
	//parses the arr and convert elements to numbers
	window.sudokusolve=function(sud) {
		if (Array.isArray(sud))return recurr(sud.map(Number))
		else return recurr(sud.replace(/[^\d]/g,"").split("").map(Number))
	}
	
}(this))