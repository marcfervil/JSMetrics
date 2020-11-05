
	Vue.component('graph', {

		props:["package1","package2", "metric"],
		data: function(){
			return {

			}
		},
      //v-if="package1!=undefined && package2!=undefined"
		template: `
			<div style="border-top: 2px solid #332940">

            <div class="appHeading">
               <h1>Graph</h1>
            </div>
            <div  class="metricsContent" style="opacity:1">
               <h2 style="opacity: 1">{{console(package1)}} vs {{console(package2)}}</h2>

               <div class="bubble" style="width:25%; height:60%;padding:25px;padding-right:30px;position:relative;z-index:-100; ">

               <!--
                  <span class="barGraphLines">
                     <span style="left:-6px;bottom:-20px;position: absolute;">0%</span>
                  </span>

                  <span style="left:calc(25% + 16px);" class="barGraphLines weak">
                     <span style="left:-8px;bottom:-20px;position: absolute;">25%</span>
                  </span>

                  <span style="left:calc(50%);" class="barGraphLines">
                     <span style="left:-8px;bottom:-20px;position: absolute;">50%</span>
                  </span>

                  <span style="left:calc(75% + 16px);" class="barGraphLines weak">
                     <span style="left:-8px;bottom:-20px;position: absolute;">75%</span>
                  </span>

                  <span style="left:auto;right:0px;" class="barGraphLines">
                     <span style="left:-16px;bottom:-20px;position: absolute;">100%</span>
                  </span>


                  <div class="barGraphOverlay">
                     <div class="overlayContent">
                        <span style = "grid-column: 1" class="barGraphLine"></span>
                        <span style = "grid-column: 2" class="barGraphLine"></span>
                        <span style = "grid-column: 3" class="barGraphLine"></span>
                        <span style = "grid-column: 4" class="barGraphLine"></span>
                        <span style = "grid-column: 5" class="barGraphLine"></span>
								<span style = "grid-column: 1; grid-row:2" >0%</span>
                        <span style = "grid-column: 2; grid-row:2">25%</span>
                        <span style = "grid-column: 3; grid-row:2">50%</span>
                        <span style = "grid-column: 4; grid-row:2">75%</span>
                        <span style = "grid-column: 5; grid-row:2 ">100%</span>
                     </div>
                  </div>


                  <div>
                     <span class="barGraphText" style="margin-top:100px">Project</span>
                     <div style="width:85%" class="barGraphBar">b</div><br>

                     <span class="barGraphText">Package1</span>
                     <div style="width:calc(25% - 7%)" class="barGraphBar">bl</div><br>

                     <span class="barGraphText">Package2</span>
                     <div style="width:calc(20% - 10%)" class="barGraphBar">b</div><br>

                  </div>
							(percent / 5 ) + 1 == width
						   -->

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

								<span class = "barGraphHeadingText" style="grid-column: 1/20; grid-row:1">Project</span>
								<div style="grid-column: 1/20; grid-row:3/5;" class="barGraphBar">
								
								</div>

								<span class = "barGraphHeadingText"  style="grid-column: 1/20; grid-row:6">Package 1</span>
								<div style="grid-column: 1/ 11; grid-row:8/10" class="barGraphBar"></div>

								<span class = "barGraphHeadingText"  style="grid-column: 1/20; grid-row:11; ">Package 2</span>
								<div style="grid-column: 1/ 10; grid-row:13/15" class="barGraphBar"></div>



								<!--span class="barGraphText" style="grid-column: 1; grid-row:1">Project</span-->
								<!--div style="grid-column: 1/4; grid-row:3" class="barGraphBar"></div><br-->

							</div>

               </div>
            </div>


            <!--div v-else class="metricsContent">
               <h2>Now what? Where do we go from here?</h2>
            </div-->
			</div>
		`,
		methods: {
         console:function(obj){
            console.log(obj);
            return "check console, dummy";
         }

		},
      mounted: function () {
         /*
         <h2>package1 vs package2</h2>
         <canvas id="canvas" style="width:100%;height:100%"></canvas>
         var c = document.getElementById("canvas");
         var ctx = c.getContext("2d");
         drawBar()
         function drawBar(){
            ctx.fillStyle = "#c18aff";
            ctx.fillRect(20, 20, -150, 100);
         }*/


      }
	});
