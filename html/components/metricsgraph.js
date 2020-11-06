
	Vue.component('metricsgraph', {

		props:["package1","package2", "project", "metric"],
		data: function(){
			return {

			}
		},
      //v-if="package1!=undefined && package2!=undefined"
		template: `
			<div style="border-top: 2px solid #332940">

            <div class="appHeading">
               <h1 v-if="package1!=undefined && package2!=undefined">{{metric}} Graph</h1>
					<h1 v-else>Now What?</h1>
            </div>
            <div v-if="package1!=undefined && package2!=undefined" class="metricsContent" style="opacity:2">
               <h2 style="opacity: 1">{{fileFromPath(package1.files.path)}} vs {{fileFromPath(package2.files.path)}}  </h2>

					<graph :percent1="getPackagePercent('package1')" :percent2="getPackagePercent('package2')" :bar-text="getBarText()"></graph>


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
				return fullPath.replace(/^.*[\\\/]/, '');
			},
			round5:function(x)
			{
			    return Math.floor(x/5)*5;
			},
			getBarText(){
				return ["Project",fileFromPath(this.package1.files.path), fileFromPath(this.package2.files.path) ]
			},
			getPackagePercent: function(metricPackage){

				let total = this["project"].getAll(true)[this.metric];
				let part = this[metricPackage].getAll(true)[this.metric];

				let percent = (part/total)*100;
				return percent;
			}
		},

	});
