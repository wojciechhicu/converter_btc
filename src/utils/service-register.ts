import { Service } from 'node-windows';
import { join } from 'path';
import readline from 'readline';

//service object
const svc = new Service({
	name: 'Pixel_Converter',
	description: 'App for converting btc data to MongoDB',
	script: join(__dirname, '..', 'index.js'),
	nodeOptions: ['--harmony', '--max_old_space_size=1024'],
});

// input from user to stop/start service
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// after installing service its automaticly starting converter.
// React for user input stop/start
rl.write("To stop process write 'stop' in the console \n");
rl.on('line', input => {
	if (input.trim().toLowerCase() === 'start') {
		svc.install();
		svc.start();
	}
	if (input.trim().toLowerCase() === 'stop') {
		svc.stop();
		svc.uninstall();
	}
});

svc.on('install', function () {
	svc.start();
});

svc.on('uninstall', function () {
	svc.uninstall();
});

//auto install after lounching the serice
svc.install();
