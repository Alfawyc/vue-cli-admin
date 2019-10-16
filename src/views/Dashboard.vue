<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name : 'Dashboard',
    data(){
        return {
            github:'https://github.com/Alfawyc/vue-cli-admin/tree/develop'
        }
    },
    created(){
        
    },
    methods :{

    }
}
</script>

<style lang="less" scoped>
    .data_section{
		margin: 20px;
		border-radius: 2px;
		.row_list{
			margin-bottom: 20px;
			.row_base{
				padding: 10px;
				box-sizing: border-box;
				background: #fff;
				border-radius: 6px;
				height: 120px;
			}
		}
		.order_list{
			.orderArea{
				width: 100%;
				height: 300px;
				background: #fff !important;
				border-radius: 6px;
				box-sizing: border-box;
				padding: 10px;
				padding-top: 40px;
				overflow: hidden;
			}
			.orderbarArea{
				height: 370px;
			}
		}
		.data_list{
			text-align: center;
			font-size: 14px;
            border-radius: 6px;
			padding: 10px;
			color:#fff;
			height: 80px;
			.leftItem{
				align-items: start;
				justify-content: space-between;
				text-align: left;
			}
			.rightItem{
				width:62px;
				display: flex;
				align-items: center;
				justify-content: center;
				.svg-icon{
					font-size: 30px;
				}
			}
		    .number{
				font-size: 22px;
				font-weight: bold;
				.perTitle{
					font-size: 13px;
   				    margin-left: 5px;
				}
			}
		}
		.pay{
			.leftItem{
				justify-content: space-around;
			}
		}
     
	}
</style>