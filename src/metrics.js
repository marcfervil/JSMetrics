const fs = require('fs');

const acorn = require('acorn');

const util = require("util");

const { readdirSync } = require('fs');

class Metrics {

	constructor(file, includeRoot=false, hierarchy={}){

		//generate file map for project
		this.files = this.getFileMap(file);

		//we include the root of the home package to make it look ~pretty~
		if(includeRoot)this.files = {"path": file, files: [this.files], filePaths: this.files.filePaths};

		//generate inheritance tree for project using file map
		//if hierarchy is undefined we generate a new inheritanceTree
		//if it is, we use the provided tree so we can A). save time B). have no references to undefined classes when inspecting subpackages

		//I later realised I cannot recylce the tree :(
		if(Object.keys(hierarchy).length === 0){
			console.log("generating new tree");
			this.inheritanceTree = this.getClassHierarchy(this.files.filePaths, this.inheritanceTree);
		}else {
			console.log("recycling tree");
			this.inheritanceTree = hierarchy;
		}


		//generate method metrics for each class by looping thru inheritanceTree and runnning method metrics on each method in each class
		this.methodMetics = {};
		for (let [className, classHierarchy] of Object.entries(this.inheritanceTree)) {
			this.methodMetics = this.getMethodMetrics(className, classHierarchy.node, this.methodMetics);
		}

	}

	//this method is used to return a new metrics object, while using the current hierarchy for speed and consistancy
	explorePackage(packageName){
		//Vue converts inheritanceTree to Obeservable?
		//convert it normal when creating new metrics
		//console.log(JSON.parse(JSON.stringify(this.inheritanceTree)));
		return new Metrics(packageName, false, JSON.parse(JSON.stringify(this.inheritanceTree)));
	}

	//returns a JSON of all metrics, or a list of the properties of said json
	getAll(asJSON=false){
		if(asJSON){
			return {
				"LOC":  this.getLOC(),
				"DIT": this.getDIT(),
				"NOC": this.getNOC(),
				"Cyclomatic": this.getCyclomatic()
			}
		}
		return [
			{"name": "LOC", "value": this.getLOC()},
			{"name": "DIT", "value": this.getDIT()},
			{"name": "NOC", "value": this.getNOC()},
			{"name": "Cyclomatic", "value": this.getCyclomatic()},
		]
	}

	// function produces a map of the files / folders in any directory (dir)
	// each folder in filemap has a list of all the files that it contains (directly and indrectly)
	getFileMap(dir){

		const files = readdirSync(dir, { withFileTypes: true })
		let filePaths = [];
		//filter out any files that are not folders or javascript files
		//then return a map of the files where folders recursively map to a file map and files map to their name
		let foldersAndFiles = files.filter(dirent => dirent.isDirectory() || dirent.name.endsWith(".js")).map(dirent => {
			if(dirent.isDirectory()){
				let map = this.getFileMap(dir+"/"+dirent.name);
				filePaths = filePaths.concat(map.filePaths);
				return map;
			}else{
				filePaths.push(dir+"/"+dirent.name);
				return dirent.name;
			}
		});

		//sort files and folders to ensure folders always come first so file tree looks ~pretty~
		foldersAndFiles.sort((a,b) => (typeof a == "object") ? -1 : 1);

		//return a file map object where path is the location of the folder,
		//files is a list of the files and folders, and filePaths is a list of all the files that the folder contains (directly and indrectly)
		return {"path": dir, files: foldersAndFiles, filePaths: filePaths};
	}


	//given a class name, starting AST node, and a metrics json:
	//return aforementioned json where each key corrosponds to a class name and the value is a list of method metric objects
	getMethodMetrics(className, node, metrics={}){

		//create an empty array in (method) metrics JSON to hold method metrics for Class [className]'s method metrics
		metrics[className] = []

		//determines WMC by totaling IfStatements, ForStatements, WhileStatement, etc
		let getMetrics = (methodNode) => {
			let methodName = methodNode.key.name;
			let methodMetrics = {
				name: methodName,
				IfStatement : 0,
				ForStatement: 0,
				WhileStatement: 0,
				ForOfStatement: 0,
				DoWhileStatement: 0,
				SwitchStatement: 0,
				WMC: 0,
			};

			//walk through method's AST, if a statemnt in methodMetrics is found, increment counter for said statement
			//by the end of this process, we'll have a a json that contains the number of control flow statements / WMC
			this.walkAST(methodNode, (node) => {
				if(methodMetrics[node.type]!=undefined)methodMetrics[node.type] += 1;
			});

			//loop through recorded control flow statements and sum them to determine WMC
			for (let [metricName, metricValue] of Object.entries(methodMetrics)) {
				if(typeof metricValue == "number" && metricName!="WMC")methodMetrics.WMC+=metricValue;
			}

			return methodMetrics;
		}

		//look for method definitons inside specified class
		this.walkAST(node, (node) => {
			//if we find a method, run metrics to determine WMC and push metrics to metrics JSON
			if(node.type=="MethodDefinition"){
				metrics[className].push(getMetrics(node));
			}
		});

		return metrics;
	}


	//function to generate a json that represents class inherieance hierarchy
	getClassHierarchy(fileNames, hierarchy = {}){

		//console.log(hierarchy);

		//add child to class's children and recursively set depth and propagate children up inheritance tree
		let addChild = (parentName, childName, directChild=false) => {
			let parent = hierarchy[parentName];
			if(parent==undefined) {
				console.log("Could not find: "+parentName);
				return;
			}
			if(directChild) parent.directChildren.push(childName);
			else parent.indirectChildren.push(childName);
			if(parent.parent!=null) {
				hierarchy[childName].depth = addChild(parent.parent, childName) + 1;
			}else{
				hierarchy[childName].depth = 1;
			}
			return hierarchy[childName].depth;
		}

		//loop thru file names and create list of classes
		//This must be done before the direct/indirect children are populated because classes can be defined in any order

		for(const fileName of fileNames){
			let fileData = fs.readFileSync(fileName);
			let ast = acorn.parse(fileData, {ecmaVersion: 2020, allowHashBang:true});

			this.walkAST(ast, (node) => {
				if(node.type=="ClassDeclaration"){
					let className = node.id.name;
					if(hierarchy[className]==undefined){
						hierarchy[className] = {
							indirectChildren: [],
							directChildren: [],
							parent: node.superClass?.name,
							node: node,
							depth: 0
						};
					}
				}
			});
		}

		//add direct/indirect children based on list of classes
		for (let [className, classInfo] of Object.entries(hierarchy)) {
			if(classInfo.parent!=null) addChild(classInfo.parent, className, true);
		}

		return hierarchy;
	}



	//function that walks Acorn's AST tree given a node, the callback returns the current node
	walkAST(node, callback){
		callback(node);
		//loop thru Node's properties
		for (let [key, value] of Object.entries(node)) {
  			if(value!=null && value.constructor!=undefined ){
  				//walk to the property if it's a node
	  			if(value.constructor.name=="Node"){
	  				this.walkAST(value, callback);
	  			//loop thru and walk each element of the array if it's an array
	  			}else if(value.constructor.name=="Array"){
	  				for(let astNode of value){
						this.walkAST(astNode, callback);
					}
	  			}
  			}
		}
	}

	//gets WMC of class by looping through the method metrics for [className]
	//and returns the total WMC of a class by summing the WMC of all of it's functions
	getWMC(className, detailed = false){
		let wmc = 0;
		for(let method of this.methodMetics[className]){
			wmc += method.WMC;
		}
		return wmc;
	}


	//gets Cyclomatic complexity of a package by summing the WMC of each class in a package
	getCyclomatic(){
		let cyclomatic = 0;
		for (let [className, methods] of Object.entries(this.methodMetics)) {
			for(let methodMetrics of methods){
				cyclomatic += methodMetrics.WMC;
			}
		}
		return cyclomatic;
	}

	//returns LOC of the project by looping thru generated file map
	getLOC(){
		let loc = 0;
		//loop thru fileMap's filePaths.
		//The top level filpath contains a list of all the files in the project
		for(let fileName of this.files.filePaths){
			let file = fs.readFileSync(fileName);
			//parse file with locations so we can see the line ending of each 'program node'
			let ast = acorn.parse(file, {ecmaVersion: 2020, locations: true, allowHashBang:true});
			//increment loc by the ending line of the program node
			loc += ast.loc.end.line;
		}
		return loc;
	}

	//gets DIT of the project
	getDIT(){
		let maxDit = 0;
		for (let [className, classHierarchy] of Object.entries(this.inheritanceTree)) {
			let dit = classHierarchy.depth;
			if(dit > maxDit)maxDit = dit;
		}
		return maxDit;
	}

	//gets max NOC of the project.  Optional "indirect" parameter allows user to factor in number indirect children as well
	getNOC(indirect=false){
		let maxNoc = 0;
		for (let [className, classHierarchy] of Object.entries(this.inheritanceTree)) {
			let noc = (!indirect) ? classHierarchy.directChildren.length : classHierarchy.directChildren.length + classHierarchy.indirectChildren.length;
			if(noc > maxNoc)maxNoc = noc;
		}
		return maxNoc;
	}




}
module.exports = Metrics;

//console.log("Fewjk");
//test();
