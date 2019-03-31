const basicSortMethods = {
	methods: {
		ascendingSort(arr, index){
			return arr.sort((val1, val2)=>{
				if (val1[index] > val2[index])
					return 1;
				else if (val1[index] < val2[index])
					return -1;
				else
					return 0;
			})
		},
		descendingSort(arr, index){
			return arr.sort((val1, val2)=>{
				if (val1[index] > val2[index])
					return -1;
				else if (val1[index] < val2[index])
					return 1;
				else
					return 0;
			})
		}
	}
}
export {basicSortMethods}