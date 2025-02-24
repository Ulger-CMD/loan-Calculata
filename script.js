const calculateButton = document.getElementById('calculateButton');
        const loanAmount = document.getElementById('loanAmount');
        const interestRate = document.getElementById('interestRate');
        const loanTerm = document.getElementById('loanTerm');
        const loanTermUnit = document.getElementById('loanTermUnit');
        const currency = document.getElementById('currency');
        const monthlyPayment = document.getElementById('monthlyPayment');
        const totalInterest = document.getElementById('totalInterest');
        const loanAmountInCurrency = document.getElementById('loanAmountInCurrency');

        const exchangeRates = {
            'USD': 1,
            'EUR': 0.88,
            'GBP': 0.76,
            'JPY': 115.38,
            'PKR': 228.25,
            'INR': 82.55,
            'AUD': 1.48,
            'CAD': 1.31,
            'CHF': 0.99,
            'CNY': 6.95,
            'DKK': 7.46,
            'HKD': 7.85,
            'MXN': 20.81,
            'NOK': 10.73,
            'NZD': 1.66,
            'SEK': 11.35,
            'SGD': 1.37,
            'ZAR': 17.37,
        };

        const currencySymbols = {
            'USD': '$',
            'EUR': '€',
            'GBP': '£',
            'JPY': '¥',
            'PKR': '₨',
            'INR': '₹',
            'AUD': '$',
            'CAD': '$',
            'CHF': 'CHF',
            'CNY': '¥',
            'DKK': 'kr',
            'HKD': '$',
            'MXN': '$',
            'NOK': 'kr',
            'NZD': '$',
            'SEK': 'kr',
            'SGD': '$',
            'ZAR': 'R',
        };

        calculateButton.addEventListener('click', calculate);

        function calculate() {
            const principal = parseFloat(loanAmount.value);
            const rate = parseFloat(interestRate.value) / 100;
            let term;
            if (loanTermUnit.value === 'years') {
                term = parseFloat(loanTerm.value) * 12;
            } else {
                term = parseFloat(loanTerm.value);
            }
            const monthlyInterestRate = rate / 12;
            const monthlyPaymentAmount = principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, term) / (Math.pow(1 + monthlyInterestRate, term) - 1);
            const totalInterestPaid = monthlyPaymentAmount * term - principal;

            const selectedCurrency = currency.value;
            const exchangeRate = exchangeRates[selectedCurrency];
            const loanAmountInSelectedCurrency = principal * exchangeRate;
            const monthlyPaymentInSelectedCurrency = monthlyPaymentAmount * exchangeRate;
            const totalInterestInSelectedCurrency = totalInterestPaid * exchangeRate;

            const symbol = currencySymbols[selectedCurrency];

            monthlyPayment.textContent = `Monthly Payment: ${symbol}${monthlyPaymentInSelectedCurrency.toFixed(2)}`;
            totalInterest.textContent = `Total Interest Paid: ${symbol}${totalInterestInSelectedCurrency.toFixed(2)}`;
            loanAmountInCurrency.textContent = `Loan Amount in ${selectedCurrency}: ${symbol}${loanAmountInSelectedCurrency.toFixed(2)}`;
        }
