<template>
	<div class="data-table__wrapper">
		
		<el-table
			:data="displayedData"
			stripe
			class="data-table margin__bottom--10"
			cell-class-name="data-table__cell"
			:default-sort = "{prop: 'id', order: 'ascending'}"
		>
			<el-table-column
				v-for="(item, index) in tableColumns"
				:key="index"
				:prop="item"
				:label="item"
			>
			</el-table-column>
		</el-table>
		<el-pagination
			background
			layout="prev, pager, next"
			:total="paginationTotal"
			:data="tableData"
			@current-change="handlerCurrentChange"
			:current-page="pagination.currentPage"
			:pageSize="10"
		>
		</el-pagination>
	</div>
</template>
<script>
	export default {
		props: {
			data: {
				type: Array,
				requered: true
			}
		},
		data(){
			return{
				pagination:{
					currentPage:1,
					pageSize: 10
				},
				tableData: [],
				tableColumns: [],
				displayedData: []
			}
		},
		computed: {
			paginationTotal(){
				return this.tableData.length;
			}
		},
		watch: {
			data: {
				immediate: true,
				handler(){
					this.formTableData(this.data);
					if(this.tableData[0]){
						this.tableColumns = Object.keys(this.tableData[0]);
					}
				}
			},
			tableData:{
				immediate: true,
				handler(){
					this.checkDisplayedData();
				} 
			},
			
		},
		methods: {
			formTableData(arr){
				this.tableData = arr.map(item => {

					for(let key in item){
						if(typeof item[key] == 'object'){

							let str = '';
							Object.keys(item[key]).forEach( (element, index) => {
								str += `${element}: ${item[key][element]}, `;
							});
							item[key] = str;

						}
					}
					return item;
				}).sort((a,b) => {
					return a.id - b.id;
				})
			},
			handlerCurrentChange(val){
				this.pagination.currentPage = val
				this.checkDisplayedData()
			},
			checkDisplayedData(){

				this.displayedData = this.tableData.filter((item, index) => {
					const lowRange = this.pagination.pageSize*(this.pagination.currentPage - 1);
					const highRange = this.pagination.pageSize*this.pagination.currentPage;

					return index >= lowRange && index < highRange;
				})
			},
			
		}
	}
</script>
<style lang="scss" scoped>
	.data-table{
		display: block;
		width: 100%;
		&__wrapper{
			width: 100%;
		}
	}
</style>