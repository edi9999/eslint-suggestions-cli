#!/usr/bin/env node

const fs = require("fs");

process.stdin.resume();

var fullData = "";
var t = +new Date();

process.stdin.on("data", function (data) {
	fullData += data;
});

function exit() {
	const parsed = JSON.parse(fullData);
	parsed.forEach(function ({ filePath, messages }) {
		let content = fs.readFileSync(filePath).toString();
		let offset = 0;
		messages.forEach(function (message) {
			message;
			if (message.suggestions) {
				const suggestion = message.suggestions[0];
				const fix = suggestion.fix;
				const [start, end] = fix.range;
				content =
					content.substr(0, start + offset) +
					fix.text +
					content.substr(end + offset);
				offset += fix.text.length - (end - start);
			}
		});
		fs.writeFileSync(filePath, content);
	});
	process.exit(0);
}

process.stdin.on("end", exit);

process.stdout.on("error", function (err) {
	if (err.code === "EPIPE") return process.exit();
	process.emit("error", err);
});

[
	"SIGUSR1",
	"SIGTERM",
	"SIGPIPE",
	"SIGHUP",
	"SIGTERM",
	"SIGINT",
	"SIGBREAK",
].forEach(function (signal) {
	process.on(signal, exit);
});
