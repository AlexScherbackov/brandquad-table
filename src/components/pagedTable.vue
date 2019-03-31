<template>
	<div class="data-table__wrapper">
		<el-input
			placeholder="Please input to filter table data"
			v-model="filterValue"
			clearable
			class="margin__bottom--10">
		</el-input>
		<el-table
			:data="displayedData"
			stripe
			class="data-table margin__bottom--10"
			cell-class-name="data-table__cell"
			:default-sort = "{prop: 'id', order: 'ascending'}"
			@header-click="headerClickHandler"
			@cell-dblclick="cellDbClickHandler"
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
	import {basicSortMethods} from '../mixins/basicSortMethods.js';

	export default {
		mixins: [basicSortMethods],
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
				displayedData: [],
				lastHeaderClick: null,
				filterValue: ''
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
			filterValue(){
				const filterData = this.data.filter(item => {
					return Object.keys(item).some(element =>{
						return String(item[element]).toLowerCase().search(this.filterValue.trim().toLowerCase()) != -1
						})
				})
				this.formTableData(filterData);
			}
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
			headerClickHandler(column, event){
				
				if(this.lastHeaderClick === event.target){
					this.tableData = this.descendingSort(this.tableData, column.label);
					this.lastHeaderClick = null;
				} else {
					this.tableData = this.ascendingSort(this.tableData, column.label);		
					this.lastHeaderClick = event.target;			
				}
			},
			cellDbClickHandler(row, column, cell, event){
				const cellWrapp = cell.querySelector('.cell')
				const currentValue = cellWrapp.innerHTML;
				const inputTemplate = `<input type=\"text\"  value=\"${currentValue}\"> `;
				cellWrapp.innerHTML = inputTemplate;

				const input = cellWrapp.firstChild;
				input.focus();
				input.addEventListener('blur', ()=>{
					cellWrapp.innerHTML = input.value;
				})
			}
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