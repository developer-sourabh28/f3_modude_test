// script.js

document.addEventListener("DOMContentLoaded", () => {
    const sortButton = document.getElementById("sortButton");
    const sortPercentageButton = document.getElementById("sortPercentageButton");
    const cryptoTableBody = document.getElementById("cryptoTableBody");
    let cryptoData = [];

    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

    // Fetch data using async await
    async function fetchDataAsyncAwait() {
        try {
            const response = await fetch(apiUrl);
            cryptoData = await response.json();
            renderTable(cryptoData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    // Render table with data
    function renderTable(data) {
        cryptoTableBody.innerHTML = "";
        data.forEach(crypto => {
            const row = document.createElement("tr");
            const priceChangePercentage = crypto.price_change_percentage_24h.toFixed(2);
            const priceChangeClass = priceChangePercentage >= 0 ? 'green' : 'red';
            row.innerHTML = `
                <td><img src="${crypto.image}" alt="${crypto.name}" class="crypto-logo">${crypto.name}</td>
                <td>${crypto.symbol}</td>
                <td>$${crypto.current_price.toFixed(2)}</td>
                <td>$${crypto.total_volume.toLocaleString()}</td>
                <td class="${priceChangeClass}">${priceChangePercentage}%</td>
                <td>$${crypto.market_cap.toLocaleString()}</td>
            `;
            cryptoTableBody.appendChild(row);
        });
    }

    // Sort functionality by market cap
    sortButton.addEventListener("click", () => {
        const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
        renderTable(sortedData);
    });

    // Sort functionality by percentage change
    sortPercentageButton.addEventListener("click", () => {
        const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
        renderTable(sortedData);
    });

    // Initial fetch
    fetchDataAsyncAwait();
});
