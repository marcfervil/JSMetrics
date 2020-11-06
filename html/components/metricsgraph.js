
	Vue.component('metricsgraph', {

		props:["package1","package2", "project", "metric"],
		data: function(){
			return {

			}
		},

		template: `
			<div style="border-top: 2px solid #332940">

            <div class="appHeading">
               <h1 v-if="package1!=undefined && package2!=undefined">{{metric}} Graph</h1>
					<h1 v-else>Now What?</h1>
            </div>
            <div v-if="package1!=undefined && package2!=undefined" class="metricsContent graphView" style="opacity:2">

					<div style="grid-column: 1/1">
	               <h2 style="opacity: 1">{{fileFromPath(package1.files.path)}} vs {{fileFromPath(package2.files.path)}}  </h2>

						<graph :percent1="getPackagePercent('package1')" :percent2="getPackagePercent('package2')" :bar-text="getBarText()"></graph>

					</div>

					<div style="grid-column: 2/2;height:100%;">
						<h2 style="opacity: 1">Metrics</h2>
						<div style="display:grid;height:100%;">
							<span class="bubble fitBubble" style="grid-row:1; ">
								<span style="opacity:0.5;">{{getBarText()[1]}}</span> <br> <h1>{{floor(getPackagePercent('package1'))}}%</h1>
							</span>
							<span class="bubble fitBubble" style="grid-row:2;  ">
								<span style="opacity:0.5;">{{getBarText()[2]}}</span> <br> <h1>{{floor(getPackagePercent('package2'))}}%</h1>
							</span><br>
						</div>
					</div>

            </div>


            <div v-else class="metricsContent">
               <h2>Where do we go from here?</h2>
            </div>
			</div>
		`,
		methods: {
         console:function(obj){
            console.log(obj);
            return "check console, dummy";
         },
			fileFromPath: function(fullPath){
				fullPath = fullPath.replace(/^.*[\\\/]/, '');
				return fullPath.charAt(0).toUpperCase() + fullPath.slice(1);
			},
			floor:function(x)
			{
				return Math.floor(x);
			},
			round5:function(x)
			{
			    return Math.floor(x/5)*5;
			},
			getBarText(){
				return ["Project", fileFromPath(this.package1.files.path), fileFromPath(this.package2.files.path) ]
			},
			getPackagePercent: function(metricPackage){

				let total = this["project"].getAll(true)[this.metric];
				let part = this[metricPackage].getAll(true)[this.metric];

				let percent = (part/total)*100;
				return percent;
			}
		},

	});
