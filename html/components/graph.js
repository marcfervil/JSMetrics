
	Vue.component('graph', {

		props:[],
		data: function(){
			return {

			}
		},

		template: `
			<div style="border-top: 2px solid #332940">

            <div class="appHeading">
               <h1>Graph</h1>
            </div>
            <div class="metricsContent" style="opacity:1">
               <h2 style="opacity: 1">Package 1 vs Package 2</h2>

               <div class="bubble" style="width:25%; height:60%;padding:20px;position:relative;z-index:-100; ">

                  <span class="barGraphLines">
                     <span style="left:-6px;bottom:-20px;position: absolute;">0%</span>
                  </span>

                  <span style="left:25%;" class="barGraphLines weak">
                     <span style="left:-8px;bottom:-20px;position: absolute;">25%</span>
                  </span>

                  <span style="left:50%;" class="barGraphLines">
                     <span style="left:-8px;bottom:-20px;position: absolute;">50%</span>
                  </span>

                  <span style="left:75%;" class="barGraphLines weak">
                     <span style="left:-8px;bottom:-20px;position: absolute;">75%</span>
                  </span>

                  <span style="left:auto;right:0px;" class="barGraphLines">
                     <span style="left:-16px;bottom:-20px;position: absolute;">100%</span>
                  </span>


                  <div>
                     <span class="barGraphText" style="margin-top:100px">Project</span>
                     <div style="width:100%" class="barGraphBar">bar lol</div><br>

                     <span class="barGraphText">Package1</span>
                     <div style="width:46%" class="barGraphBar">bar lol</div><br>

                     <span class="barGraphText">Package2</span>
                     <div style="width:20%" class="barGraphBar">bar lol</div><br>

                  </div>


               </div>
            </div>
			</div>
		`,
		methods: {


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
