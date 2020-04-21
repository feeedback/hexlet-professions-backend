const monitor = require('active-window');
const fs = require('fs');

const windows1251 = require('windows-1251');

function getConfig() {
    // Retrieve configs
    const configs = JSON.parse(fs.readFileSync(`${__dirname}/configs.json`, 'utf8'));
    const path = require('path');

    switch (process.platform) {
        case 'linux':
        case 'linux2':
            config = configs.linux;
            break;
        case 'win32':
            config = configs.win32;
            break;
        case 'darwin':
            config = configs.mac;
            break;
        default:
            throw `Operating System not supported yet. ${process.platform}`;
    }
    // Append directory to script url
    script_url = path.join(__dirname, config.script_url);
    config.parameters.push(script_url);

    // Append directory to subscript url on OSX
    if (process.platform == 'darwin') {
        config.parameters.push(path.join(__dirname, config.subscript_url));
    }

    return config;
}

const getActiveWindow = (callback) => {
    const { spawn } = require('child_process');
    const config = getConfig();

    // Run shell script
    const ls = spawn(config.bin, config.parameters);

    // Obtain successful response from script
    ls.stdout.on('data', function(stdout) {
        callback(stdout);
    });

    // Obtain error response from script
    ls.stderr.on('data', function(stderr) {
        throw stderr.toString();
    });

    ls.stdin.end();
};

callback = function(window) {
    try {
        const raw = window.title;
        const data = windows1251.decode(raw);

        console.log(`App: ${window.app}`);
        console.log(`Title: ${data}`);
        fs.writeFileSync('title.txt', JSON.stringify(window));
    } catch (err) {
        console.log(err);
    }
};
/* Watch the active window 
  @callback
  @number of requests; infinity = -1 
  @interval between requests
*/
// monitor.getActiveWindow(callback,-1,1);

// Get the current active window
monitor.getActiveWindow(callback);
