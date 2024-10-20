const net = require('net');
const async = require('async');

const scanPort = (ip, port, timeout = 2000) => {
    return new Promise((resolve) => {
        const socket = new net.Socket();
        const timer = setTimeout(() => {
            socket.destroy();
            resolve({ port, status: 'closed' });
        }, timeout);

        socket.on('connect', () => {
            clearTimeout(timer);
            socket.destroy();
            resolve({ port, status: 'open' });
        });

        socket.on('error', () => {
            clearTimeout(timer);
            resolve({ port, status: 'closed' });
        });

        socket.connect(port, ip);
    });
};

const scanPorts = async (ip, ports, timeout) => {
    const results = [];
    for (const port of ports) {
        const result = await scanPort(ip, port, timeout);
        results.push(result);
    }
    return results;
};

const scanIPRange = async (ipRange, ports, timeout) => {
    const results = {};
    for (const ip of ipRange) {
        results[ip] = await scanPorts(ip, ports, timeout);
    }
    return results;
};

module.exports = { scanIPRange };
