document.getElementById('scanForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const ip = document.getElementById('ip').value.split(',');
    const ports = document.getElementById('ports').value.split(',').map(Number);
    const timeout = document.getElementById('timeout').value;

    const response = await fetch('/scan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ip, ports, timeout })
    });

    const results = await response.json();
    displayResults(results);
});

const displayResults = (results) => {
    const resultsContainer = document.getElementById('results');
    resultsContainer.textContent = JSON.stringify(results, null, 2);
};
