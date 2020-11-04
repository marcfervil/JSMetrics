Vue.component('about', {

   template: `
      <div class="metricsViewer">
         <div class="appHeading"><h1>About JSMetrics</h1></div>
         <div class="metricsContent">
            <h2>What is JSMetrics?</h2>
            <div class="bubble autoSize about">
               JSMetrics is a tool that is used to generate and display code metrics for Javascript projects
               in a clean and modern UI/UX. JSMetrics supports the following metrics: LOC, DIT, NOC,
               Cyclomatic complexity, and WMC.  JSMetrics also provides graphs that allows the user compare and contrast metrics.

            </div><br>

            <h2>What Type of Javascript Projects Does This Support?</h2>
            <div class="bubble autoSize about">
               JSMetrics currently only supports vanilla javascript projects.  It's important to note that JSMetrics can only
               provide metrics on one type of javascript class: ES6 classes.  This makes it difficult to find projects to
               run metrics on due to the fact that most JS projects use prototypical inheritance.
            </div><br>


            <h2>How Do I use JSMetrics?</h2>
            <div class="bubble autoSize about">
               To open a project, go to File > Open Project, or click <i>"open a project"</i> in the <i>Files</i> menu.
               Once you have opened a project, to view the metrics for a package/folder, double click it.
            </div>
         </div>
      </div>
   `,
   methods: {


   }
});
