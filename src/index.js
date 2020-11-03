


const { app, BrowserWindow } = require('electron')
const Metrics = require('./metrics.js')
const Store = require('./store.js');

console.log(Metrics);
//	console.log("here?");

function createWindow () {
	console.log("here?");
  	win = new BrowserWindow({
    	width: 800,
    	height: 600,
    	webPreferences: {
    		nodeIntegration: true
   		}
	})

 	win.loadFile('html/index.html')
	win.webContents.openDevTools()
}

const electron = require('electron');

const ipcMain = electron.ipcMain;

const dialog = electron.dialog;

//hold the array of directory paths selected by user

let dir;

ipcMain.on('selectDirectory', async function(event, arg) {

    dir = dialog.showOpenDialog(win, {

        properties: ['openDirectory']

    }).then((result)=>{
    	if(!result.cancelled){
    		let path = result.filePaths[0];
	    	console.log("path: "+path);

	    	let metrics = new Metrics(path);
				console.log(metrics);
			event.reply('metrics', metrics);
		}
    });


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
