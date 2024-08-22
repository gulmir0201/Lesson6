const populateCurrencies = () => {
    const url = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const fromCurrencySelect = document.getElementById('from-currency');
            const toCurrencySelect = document.getElementById('to-currency');
            
            // Populate both dropdowns with currencies
            for (let [currencyCode, currencyName] of Object.entries(data)) {
                const optionFrom = document.createElement('option');
                const optionTo = document.createElement('option');
                optionFrom.value = optionTo.value = currencyCode;
                optionFrom.textContent = `${currencyCode.toUpperCase()} - ${currencyName}`;
                optionTo.textContent = `${currencyCode.toUpperCase()} - ${currencyName}`;
                
                fromCurrencySelect.appendChild(optionFrom);
                toCurrencySelect.appendChild(optionTo);
            }
        })
        .catch(error => console.error('Error fetching currency list:', error));
};

// Function to fetch exchange rate and perform conversion
const convertCurrency = () => {
    const amount = document.getElementById('value-to-convert').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (amount && fromCurrency && toCurrency) {
        const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency}.json`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const rate = data[toCurrency];
                const convertedValue = (amount * rate).toFixed(2);
                document.getElementById('conversion-result').textContent = `${amount} ${fromCurrency.toUpperCase()} = ${convertedValue} ${toCurrency.toUpperCase()}`;
                document.getElementById('conversion-rate').textContent = `1 ${fromCurrency.toUpperCase()} = ${rate.toFixed(6)} ${toCurrency.toUpperCase()}`;
            })
            .catch(error => console.error('Error fetching currency data:', error));
    } else {
        alert('Please enter an amount and select currencies.');
    }
};
