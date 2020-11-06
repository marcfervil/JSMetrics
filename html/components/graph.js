
	Vue.component('graph', {

		props:["percent1", "percent2", "barText"],
		data: function(){
			return {

			}
		},

		template: `


         <div class="bubble" style="width:25%; height:60%;padding:25px;padding-right:30px;position:relative;z-index:-100; ">

               <!--This is dumb, but CSS is dumber. -->

   				<div class="barGraphContent">

   					<span class = "barGraphLine" style = "grid-column: 1; grid-row:1/20; margin-left: -5px;"></span>
   					<span class = "barGraphText" style = "grid-column: 1; grid-row:19;">0%</span>

   					<span class = "barGraphLine weak" style = "grid-column: 6; grid-row:1/20"></span>
   					<span class = "barGraphText weak" style = "grid-column: 6; grid-row:19">&nbsp;&nbsp;25%</span>

   					<span class = "barGraphLine" style = "grid-column: 11; grid-row:1/20"></span>
   					<span class = "barGraphText" style = "grid-column: 11; grid-row:19">&nbsp;&nbsp;50%</span>

   					<span class = "barGraphLine weak" style = "grid-column: 16; grid-row:1/20"></span>
   					<span class = "barGraphText weak" style = "grid-column: 16; grid-row:19">&nbsp;&nbsp;75%</span>

   					<span class = "barGraphLine" style = "grid-column: 20; grid-row:1/20; margin-left:3px"></span>
   					<span class = "barGraphText" style = "grid-column: 20; grid-row:19;">&nbsp;&nbsp;&nbsp;100%</span>

   					<span class = "barGraphHeadingText" style="grid-column: 1/20; grid-row:1">{{barText[0]}}</span>
   					<div style="grid-column: 1/20; grid-row:3/5;" class="barGraphBar"></div>


   					<span class = "barGraphHeadingText"  style="grid-column: 1/20; grid-row:6">{{barText[1]}}</span>
   					<div :style="{gridColumn: '1 / '+getBarLength(percent1), gridRow: '8/10'}" class="barGraphBar"></div>

   					<span class = "barGraphHeadingText"  style="grid-column: 1/20; grid-row:11; ">{{barText[2]}}</span>
   					<div :style="{gridColumn: '1 / '+getBarLength(percent2), gridRow: '13/15'}" class="barGraphBar"></div>

   				</div>

         </div>

		`,
		methods: {

			round5:function(x)
			{
			    return Math.floor(x/5)*5;
			},
			getBarLength: function(percent){

				let barLength = (this.round5(percent)/5)+1;

				return (barLength < 20) ? barLength : 20;
			}
		},

	});
