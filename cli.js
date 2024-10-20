// cli.js
const { Command } = require('commander');
const { scanIPRange } = require('./scanner');

const program = new Command();

program
    .version('1.0.0')
    .description('Network Port Scanner')
    .option('-i, --ip <ip>', 'IP address or range (comma-separated)', (value) => value.split(','))
    .option('-p, --ports <ports>', 'Port range (comma-separated)', (value) => value.split(',').map(Number))
    .option('-t, --timeout <timeout>', 'Timeout for port scanning', '2000')
    .action(async (options) => {
        const { ip, ports, timeout } = options;

        if (!ip || !ports || ports.length === 0) {
            console.error('Please provide IP addresses and port ranges.');
            process.exit(1);
        }

        console.log(`Scanning IPs: ${ip}`);
        console.log(`Scanning Ports: ${ports}`);

        const results = await scanIPRange(ip, ports, parseInt(timeout));

        console.log('Scan Results:', results);
    });

program.parse(process.argv);
