console.log(process.env.NODE_ENV);


if (process.getgid) {
  console.log(`Current gid: ${process.getgid()}`);
}

console.log(process.pid);

console.log(process.cpuUsage());

process.kill(process.pid);