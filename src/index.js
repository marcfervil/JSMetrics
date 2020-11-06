


const { app, BrowserWindow, Menu,MenuItem } = require('electron')
const Metrics = require('./metrics.js')
const Store = require('./store.js');

const remote = require("electron").remote;

//console.log(Metrics);
//	console.log("here?");
let menuReply = null;
let metrics = null;
let win = null;
function createWindow () {
	//console.log("here?");
	win = new BrowserWindow({
		width: 900,
		height: 800,
		webPreferences: {
			nodeIntegration: true
		}
	});
	var menu = Menu.buildFromTemplate([
		{
			label: app.name,
			submenu: [
				{
					label:'Exit',
					accelerator: 'Cmd+Q',
					click: ()=> {
						app.quit()
					}
				}
			],

		},
		{
			label: "File",
			submenu: [
				{
					label:'Open Project',
					accelerator: 'Cmd+O',
					click: ()=> {
						selectFile();
					}
				},
			],
		},
		{
			label: "Graph",
			submenu: [
				{
					label:'LOC',
					click: ()=> {
						menuReply.reply('graph', "LOC");
					}
				},
				{
					label:'DIT',
					click: ()=> {
							menuReply.reply('graph', "DIT");
					}
				},

				{
					label:'NOC',
					click: ()=> {
							menuReply.reply('graph', "NOC");
					}
				},

				{
					label:'Cyclomatic Complexity',
					click: ()=> {
							menuReply.reply('graph', "Cyclomatic");
					}
				},
			],
		},
		{
			label: "Debug",
			submenu: [
				{
					label:'Show Dev Console',
					accelerator: 'Cmd+Y',
					click: ()=> {
						win.webContents.openDevTools()
					}
				},
				{
					label:'Load Test Project',
					accelerator: 'Cmd+I',
					click: ()=> {
						//metrics = new Metrics("/Users/marcfervil/Documents/School/Software Testing/JSMetrics/Project/wey-master");
						menuReply.reply('metrics', "/Users/marcfervil/Documents/School/Software Testing/JSMetrics/Project/wey-master", "project");
						//menuReply.reply('metrics', "/Users/marcfervil/Documents/School/Software Testing/JSMetrics/Project/wey-master/lib/model", "view1");
						// menuReply.reply('metrics', "/Users/marcfervil/Documents/School/Software Testing/JSMetrics/Project/wey-master/lib/view", "view2");
					}
				},
				{
					label:'Refresh',
					accelerator: 'Cmd+R',
					click: ()=> {
						win.reload();

					}
				},
			],
		}

	])
	Menu.setApplicationMenu(menu);


	win.loadFile('html/index.html')

}

const electron = require('electron');

const ipcMain = electron.ipcMain;

const dialog = electron.dialog;

//hold the array of directory paths selected by user

let dir;

function selectFile(){
	dir = dialog.showOpenDialog(win, {

		properties: ['openDirectory']

	}).then((result)=>{
		if(!result.cancelled){
			let path = result.filePaths[0];
			console.log("path: "+path);

			//let metrics = new Metrics(path);
			menuReply.reply('metrics', path);
		}
	});
}

ipcMain.on('menu', async function(event, arg) {
	menuReply = event;
});

ipcMain.on('selectDirectory', async function(event, arg) {

	selectFile();


});

ipcMain.on('rightClick', async function(event, mousePos, file) {

	const menu = new Menu()
	const currentTab = new MenuItem({
		label: 'Open In Current Tab',
		click: () => {
			//win.inspectElement(arg.x, arg.y)
			console.log(file);
			event.reply("metrics", file, "view1")
		}
	});
	const newTab = new MenuItem({
		label: 'Open In New Tab',
		click: () => {
			event.reply("metrics", file, "view2");
		}
	});
	menu.append(currentTab);
	menu.append(newTab);
//	menu.append()
	rightClickPosition = {x: mousePos.x, y: mousePos.y};
	menu.popup(win);


});




app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {

		createWindow()
	}
})
//https://github.com/foliojs/pdfkit



console.full = function(obj){
	console.log(util.inspect(obj, {showHidden: false, depth: null, colors: true}));
}
