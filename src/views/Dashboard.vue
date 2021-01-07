<template>
    <div class="fillcontain">
		<!-- <el-calendar v-model="calendar" :first-day-of-week='7'>
		</el-calendar> -->
		<el-row :gutter="40" class="panel-group">
			<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
				<div class="card-panel">
					<div class="card-panel-icon-wrapper icon-people">
					
					<i class="el-icon-s-custom fs45"></i>
					</div>
					<div class="card-panel-description">
					<div class="card-panel-text">
						用户
					</div>
					500
					</div>
				</div>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
				<div class="card-panel">
					<div class="card-panel-icon-wrapper icon-message">
					
					<i class="el-icon-chat-line-round fs45"></i>
					</div>
					<div class="card-panel-description">
					<div class="card-panel-text">
						消息
					</div>
					500
					</div>
				</div>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
				<div class="card-panel">
					<div class="card-panel-icon-wrapper icon-money">
					
					<i class="el-icon-money fs45"></i>
					</div>
					<div class="card-panel-description">
					<div class="card-panel-text">
						销售额
					</div>
					500
					</div>
				</div>
			</el-col>
			<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
				<div class="card-panel">
					<div class="card-panel-icon-wrapper icon-shopping">
					
					<i class="el-icon-shopping-cart-2 fs45"></i>
					</div>
					<div class="card-panel-description">
					<div class="card-panel-text">
						销单量
					</div>
					500
					</div>
				</div>
			</el-col>
		</el-row>
    </div>
</template>

<script>
export default {
    name : 'Dashboard',
    data(){
        return {
			github:'https://github.com/Alfawyc/vue-cli-admin/tree/develop',
			calendar: new Date()
        }
    },
    created(){
        
    },
    methods :{
		showToast(){
			_g.toastMsg('success' , 'toast弹窗' , 1500);
		},
		showMotice(){
			_g.noticeMsg('warning' , '提示' , 'nitoce-msg' , 1500);
		},
		showConfirm(){
			_g.confirmMsg('danger' , '提示' , '确定吗？' , () => {
				_g.toastMsg('success' , '确定' , 1500);
			}, () => {
				_g.toastMsg('error' , '取消' , 1500);
			});
		}
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
	.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>