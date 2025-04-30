document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const exchangeForm = document.getElementById('exchange-form');
    const sendAmountInput = document.getElementById('send-amount');
    const receiveAmountInput = document.getElementById('receive-amount');
    const sendCoinSelector = document.getElementById('send-coin-selector');
    const receiveCoinSelector = document.getElementById('receive-coin-selector');
    const sendCoinIcon = document.getElementById('send-coin-icon');
    const sendCoinTicker = document.getElementById('send-coin-ticker');
    const sendCoinHiddenInput = document.getElementById('send-coin');
    const sendCoinNameHiddenInput = document.getElementById('send-coin-name');
    const receiveCoinIcon = document.getElementById('receive-coin-icon');
    const receiveCoinTicker = document.getElementById('receive-coin-ticker');
    const receiveCoinHiddenInput = document.getElementById('receive-coin');
    const receiveCoinNameHiddenInput = document.getElementById('receive-coin-name');
    const swapButton = document.getElementById('swap-button');
    const rateInfo = document.getElementById('rate-info');
    const sendUsdValueElement = document.getElementById('send-usd-value');
    const receiveUsdValueElement = document.getElementById('receive-usd-value');
    const recipientAddressInput = document.getElementById('recipient-address');
    const recipientAddressLabel = document.getElementById('recipient-address-label');
    const feeSendTicker = document.getElementById('fee-send-ticker');
    const networkFeeValue = document.getElementById('network-fee-value');
    const serviceFeePercent = document.getElementById('service-fee-percent');

    const coinModal = document.getElementById('coin-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const coinList = document.getElementById('coin-list');
    const searchCoinInput = document.getElementById('search-coin-input');

    const exchangeSection = document.getElementById('exchange-section');
    const statusSection = document.getElementById('status-section');
    const statusSteps = {
        deposit: document.getElementById('step-deposit'),
        processing: document.getElementById('step-processing'),
        complete: document.getElementById('step-complete'),
    };
    const depositAmount = document.getElementById('deposit-amount');
    const depositCoinName = document.getElementById('deposit-coin-name');
    const depositAddress = document.getElementById('deposit-address');
    const depositNetworkInfo = document.getElementById('deposit-network-info');
    const depositMemoInfo = document.getElementById('deposit-memo-info');
    const copyAddressBtn = document.getElementById('copy-address-btn');
    const processingCoinSendElement = document.getElementById('processing-coin-send'); // Specific element for send coin name in processing text
    const processingCoinReceiveElement = document.getElementById('processing-coin-receive'); // Specific element for receive coin name
    const finalReceiveAmount = document.getElementById('final-receive-amount');
    const finalRecipientAddressShort = document.getElementById('final-recipient-address-short');
    const exchangeId = document.getElementById('exchange-id');
    const explorerLink = document.getElementById('explorer-link');
    const newExchangeBtn = document.getElementById('new-exchange-btn');
    const loadingIndicator = document.getElementById('loading-indicator');
    const backToFormBtn = document.getElementById('back-to-form-btn');

    const simulateExchangeCompleteBtn = document.getElementById('simulate-exchange-complete-btn');

    // Support Chat Elements
    const supportChatButton = document.getElementById('support-chat-button');
    const supportChatWindow = document.getElementById('support-chat-window');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const chatMessagesContainer = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input');
    const sendChatMessageBtn = document.getElementById('send-chat-message');
    const chatPlaceholder = document.querySelector('.chat-placeholder');

    // --- Constants ---
    const MIN_EXCHANGE_USD_AMOUNT = 5.00;
    const SERVICE_FEE_PERCENT = 0.5;
    serviceFeePercent.textContent = SERVICE_FEE_PERCENT;

    // --- Coin Database with addresses and additional info ---
    const coins = [
        { name: 'Bitcoin', ticker: 'BTC', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png', depositAddress: 'bc1q9y9nk3vd7hkeltcc4lqhuvhg3xvj7aw2w2m3e8', networkFee: 0.0001, networkName: 'Bitcoin' },
        { name: 'Ethereum', ticker: 'ETH', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png', depositAddress: '0xa30325F413e0AE8826E1702b42B4F5De28E8ca61', networkFee: 0.002, networkName: 'Ethereum (ERC20)' },
        { name: 'Tether (ERC20)', ticker: 'USDT-ERC20', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png', network: 'ERC20', depositAddress: '0xa30325F413e0AE8826E1702b42B4F5De28E8ca61', networkFee: 5, networkName: 'Ethereum (ERC20)' },
        { name: 'Tether (TRC20)', ticker: 'USDT-TRC20', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png', network: 'TRC20', depositAddress: 'TCbo9yBNLA2zUNVUrfFaMA9oMYoDjUMhJz', networkFee: 1, networkName: 'Tron (TRC20)' },
        { name: 'Tether (TON)', ticker: 'USDT-TON', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png', network: 'TON', depositAddress: 'UQC4vzzoz3WZIgB7GxZS94H7gGBsYgRxvldzj0OtIRWnRXIt', networkFee: 0.5, networkName: 'The Open Network (TON)' },
        { name: 'Tron', ticker: 'TRX', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1958.png', depositAddress: 'TCbo9yBNLA2zUNVUrfFaMA9oMYoDjUMhJz', networkFee: 1, networkName: 'Tron (TRC20)' },
        { name: 'Toncoin', ticker: 'TON', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/11419.png', depositAddress: 'UQC4vzzoz3WZIgB7GxZS94H7gGBsYgRxvldzj0OtIRWnRXIt', networkFee: 0.05, networkName: 'The Open Network (TON)' },
        { name: 'Binance Coin', ticker: 'BNB', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png', depositAddress: '0xa30325F413e0AE8826E1702b42B4F5De28E8ca61', networkFee: 0.0005, networkName: 'BNB Smart Chain (BEP20)' },
        { name: 'Solana', ticker: 'SOL', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png', depositAddress: 'CZS3tU9H16oxbC7P1VTWVLTVn4PRBWphn8magztj2kw8', networkFee: 0.0001, networkName: 'Solana' },
        { name: 'Ripple', ticker: 'XRP', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/52.png', depositAddress: 'r4FzVFpnJJe6512KHrcdkqEFxFKTRH5Yik', networkFee: 0.25, networkName: 'Ripple', memoRequiredSometimes: true },
        { name: 'Cardano', ticker: 'ADA', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png', depositAddress: 'addr1q8gks7xyyrshrn03q28cv7s42c0qh75p2t9ha839jyuwvcyyne4cpkh84tsqg0j9kvcy6yl737sgg7p56ljcxyf55snqyavtde', networkFee: 1, networkName: 'Cardano' },
        { name: 'Dogecoin', ticker: 'DOGE', icon: 'https://s2.coinmarketcap.com/static/img/coins/64x64/74.png', depositAddress: 'DBxa2hQdPaGCZVFjkvhwXUavQJN3f4tWoZ', networkFee: 2, networkName: 'Dogecoin' },
    ];

    // --- Global Variables ---
    let liveCoinPricesUSDT = {};
    let currentSelectorTarget = null;

    // --- Functions ---

    async function fetchBinancePrices() {
        loadingIndicator.classList.remove('hidden');
        rateInfo.textContent = 'Loading rate...';
        receiveAmountInput.value = '';
        sendUsdValueElement.textContent = '≈ $... USD';
        receiveUsdValueElement.textContent = '≈ $... USD';
        const apiUrl = 'https://api.binance.com/api/v3/ticker/price';
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`Network response was not ok: ${response.statusText}`);
            const data = await response.json();
            processBinanceData(data);
            console.log('Binance prices loaded successfully.');
        } catch (error) {
            console.error("Failed to fetch Binance prices:", error);
            rateInfo.textContent = 'Error loading rate';
            sendUsdValueElement.textContent = '≈ $? USD';
            receiveUsdValueElement.textContent = '≈ $? USD';
            liveCoinPricesUSDT = {};
        } finally {
            loadingIndicator.classList.add('hidden');
            updateRateAndReceiveAmount();
            updateFeeInfo();
        }
     }

    function processBinanceData(tickers) {
        const newPrices = {};
        if (!Array.isArray(tickers)) { console.error("Invalid data format from Binance API:", tickers); return; }
        tickers.forEach(ticker => {
            if (ticker && typeof ticker.symbol === 'string' && ticker.symbol.endsWith('USDT')) {
                const baseAsset = ticker.symbol.replace('USDT', '');
                const coinExists = coins.some(c => c.ticker.startsWith(baseAsset));
                if (coinExists && ticker.price) newPrices[baseAsset] = parseFloat(ticker.price);
            }
        });
        newPrices['USDT'] = 1.00;
        liveCoinPricesUSDT = { ...newPrices };
    }

    function getPrice(ticker) {
        const baseTicker = ticker.split('-')[0];
        return liveCoinPricesUSDT[baseTicker] || null;
     }

    function getCoinData(ticker) {
        return coins.find(coin => coin.ticker === ticker);
    }

    function populateCoinList(filter = '') {
        coinList.innerHTML = '';
        const lowerCaseFilter = filter.toLowerCase().trim();
        const filteredCoins = coins.filter(coin => coin.name.toLowerCase().includes(lowerCaseFilter) || coin.ticker.toLowerCase().includes(lowerCaseFilter));
        if (filteredCoins.length === 0) { coinList.innerHTML = '<li class="no-results">Coins not found</li>'; return; }
        filteredCoins.forEach(coin => {
            const li = document.createElement('li');
            li.dataset.ticker = coin.ticker;
            li.innerHTML = `<img src="${coin.icon}" alt="${coin.ticker}"><span class="coin-name">${coin.name}</span><span class="coin-ticker">${coin.ticker.split('-')[0]}</span>`;
            li.addEventListener('click', () => {
                const selectedCoinData = getCoinData(li.dataset.ticker);
                if (selectedCoinData && currentSelectorTarget) selectCoin(selectedCoinData, currentSelectorTarget, true);
            });
            coinList.appendChild(li);
        });
    }

    function selectCoin(coin, target, userAction = false) {
        if (!coin || !target) return;
        const targetIcon = document.getElementById(`${target}-coin-icon`);
        const targetTickerSpan = document.getElementById(`${target}-coin-ticker`);
        const targetTickerInput = document.getElementById(`${target}-coin`);
        const targetNameInput = document.getElementById(`${target}-coin-name`);
        targetIcon.src = coin.icon;
        targetIcon.alt = coin.ticker;
        targetTickerSpan.textContent = coin.ticker.split('-')[0];
        targetTickerInput.value = coin.ticker;
        targetNameInput.value = coin.name;
        if (userAction) {
            closeModal();
            updateRateAndReceiveAmount();
            updateFeeInfo();
            updateRecipientAddressLabel();
        }
    }

    function openModal(target) {
        currentSelectorTarget = target;
        searchCoinInput.value = '';
        populateCoinList();
        coinModal.style.display = 'flex';
        searchCoinInput.focus();
    }
    function closeModal() {
        coinModal.style.display = 'none';
        currentSelectorTarget = null;
     }

    function updateRateAndReceiveAmount() {
        const sendTicker = sendCoinHiddenInput.value;
        const receiveTicker = receiveCoinHiddenInput.value;
        const sendAmount = parseFloat(sendAmountInput.value) || 0;

        // Reset/display loading status
        const pricesLoaded = Object.keys(liveCoinPricesUSDT).length > 0;
        const statusText = pricesLoaded ? '---' : (loadingIndicator.classList.contains('hidden') ? 'Rate unavailable' : 'Loading rate...');
        const usdStatusText = pricesLoaded ? '≈ $0.00 USD' : (loadingIndicator.classList.contains('hidden') ? '≈ $? USD' : '≈ $... USD');

        rateInfo.textContent = statusText;
        receiveAmountInput.value = '';
        sendUsdValueElement.textContent = usdStatusText;
        receiveUsdValueElement.textContent = usdStatusText;

        if (!pricesLoaded) return;

        // Update SEND amount USD equivalent
        const sendPrice = getPrice(sendTicker);
        let sendUsdText = '≈ $0.00 USD';
        let sendUsdValue = 0;
        if (sendAmount > 0 && sendPrice) {
            sendUsdValue = sendAmount * sendPrice;
            sendUsdText = `≈ $${sendUsdValue.toFixed(2)} USD`;
        } else if (sendAmount > 0 && !sendPrice) {
             sendUsdText = '≈ $? USD (No price)';
        }
        sendUsdValueElement.textContent = sendUsdText;

        // Calculate rate and RECEIVE amount
        const receivePrice = getPrice(receiveTicker);
        if (!sendPrice || !receivePrice) { rateInfo.textContent = 'Rate unavailable'; return; }
        if (sendTicker === receiveTicker) { rateInfo.textContent = 'Select different coins'; return; }

        const rate = sendPrice / receivePrice;
        rateInfo.textContent = `1 ${sendTicker.split('-')[0]} ≈ ${rate.toFixed(6)} ${receiveTicker.split('-')[0]}`;

        let finalReceiveAmount = 0;
        if (sendAmount > 0) {
            const rawReceiveAmount = sendAmount * rate;
            const feeAmount = rawReceiveAmount * (SERVICE_FEE_PERCENT / 100);
            finalReceiveAmount = rawReceiveAmount - feeAmount;

            if (finalReceiveAmount > 0) {
                receiveAmountInput.value = finalReceiveAmount.toFixed(8);
            } else {
                finalReceiveAmount = 0;
                receiveAmountInput.value = '0.00000000';
                 if (rateInfo.textContent.includes('≈')) { rateInfo.textContent += ' (Amount too small)'; }
            }
        }

        // Update RECEIVE amount USD equivalent
        let receiveUsdText = '≈ $0.00 USD';
        if (finalReceiveAmount > 0 && receivePrice) {
             const receiveUsdValue = finalReceiveAmount * receivePrice;
             receiveUsdText = `≈ $${receiveUsdValue.toFixed(2)} USD`;
        } else if (finalReceiveAmount > 0 && !receivePrice){
             receiveUsdText = '≈ $? USD (No price)';
        }
        receiveUsdValueElement.textContent = receiveUsdText;
    }

    function updateFeeInfo() {
        const sendCoinData = getCoinData(sendCoinHiddenInput.value);
        if (sendCoinData && sendCoinData.networkFee !== undefined) {
            networkFeeValue.textContent = sendCoinData.networkFee;
            feeSendTicker.textContent = sendCoinData.ticker.split('-')[0];
        } else {
            networkFeeValue.textContent = '???';
            feeSendTicker.textContent = sendCoinHiddenInput.value.split('-')[0];
        }
    }

    function updateRecipientAddressLabel() {
         const receiveCoinData = getCoinData(receiveCoinHiddenInput.value);
         let labelText = 'Recipient Wallet Address';
         if (receiveCoinData) {
             labelText += ` (${receiveCoinData.name}`;
             // Add network clarification for specific coins if needed
             if (receiveCoinData.ticker === 'BNB' && receiveCoinData.networkName) {
                 labelText += ` - ${receiveCoinData.networkName})`;
             } else if (receiveCoinData.ticker.startsWith('USDT-') && receiveCoinData.networkName) {
                 labelText += ` - ${receiveCoinData.networkName})`;
             }
              else {
                 labelText += ')';
             }
         }
         recipientAddressLabel.textContent = labelText;
     }

    function swapCoins() {
        const currentSendData = getCoinData(sendCoinHiddenInput.value);
        const currentReceiveData = getCoinData(receiveCoinHiddenInput.value);
        if (!currentSendData || !currentReceiveData) return;
        selectCoin(currentReceiveData, 'send', false);
        selectCoin(currentSendData, 'receive', false);
        updateRateAndReceiveAmount();
        updateFeeInfo();
        updateRecipientAddressLabel();
     }

     function copyAddress() {
        const address = depositAddress.textContent;
        navigator.clipboard.writeText(address).then(() => {
            const originalIcon = copyAddressBtn.innerHTML;
            copyAddressBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyAddressBtn.style.color = 'var(--success-color)';
            setTimeout(() => {
                copyAddressBtn.innerHTML = originalIcon;
                copyAddressBtn.style.color = 'var(--text-muted-color)';
            }, 1500);
        }).catch(err => {
            console.error('Failed to copy address: ', err);
            alert('Failed to copy address. Please copy manually.');
        });
    }

    function startExchangeSimulation() {
        // --- Validation ---
        const sendAmount = parseFloat(sendAmountInput.value);
        const sendCoinData = getCoinData(sendCoinHiddenInput.value);
        const receiveCoinData = getCoinData(receiveCoinHiddenInput.value);
        const finalReceive = receiveAmountInput.value;
        const recipientAddress = recipientAddressInput.value.trim();

        if (!sendCoinData || !receiveCoinData) { alert("Error: Could not determine selected coins."); return; }
        if (isNaN(sendAmount) || sendAmount <= 0) { alert("Please enter a valid amount to send."); sendAmountInput.focus(); return; }
        if (!recipientAddress) { alert("Please enter the recipient wallet address."); recipientAddressInput.focus(); return; }
        if (sendCoinData.ticker === receiveCoinData.ticker) { alert("Coins for exchange must be different."); return; }
        if (!finalReceive || parseFloat(finalReceive) <= 0) { alert("Calculated receive amount is invalid or too small."); return; }

        const sendPrice = getPrice(sendCoinData.ticker);
        if (!sendPrice) { alert("Could not verify minimum amount: rate not loaded. Please try again later."); return; }
        const usdValue = sendAmount * sendPrice;
        if (usdValue < MIN_EXCHANGE_USD_AMOUNT) { alert(`Minimum exchange amount is equivalent to $${MIN_EXCHANGE_USD_AMOUNT.toFixed(2)}. Your amount: ~$${usdValue.toFixed(2)}.`); return; }

        // --- Switch to Status Screen ---
        exchangeSection.classList.remove('active-section');
        exchangeSection.classList.add('hidden-section');
        statusSection.classList.remove('hidden-section');
        statusSection.classList.add('active-section');

        // --- Configure STEP 1 (Deposit) ---
        depositAmount.textContent = `${sendAmount.toFixed(8)} ${sendCoinData.ticker.split('-')[0]}`;
        depositCoinName.textContent = `${sendCoinData.name} (${sendCoinData.ticker})`;
        depositAddress.textContent = sendCoinData.depositAddress || 'Address not found!';

        if (sendCoinData.networkName) {
             depositNetworkInfo.textContent = `Network: ${sendCoinData.networkName}`;
             depositNetworkInfo.classList.add('visible');
        } else { depositNetworkInfo.classList.remove('visible'); }

        if (sendCoinData.memoRequiredSometimes) {
             depositMemoInfo.textContent = `ℹ️ For this ${sendCoinData.ticker.split('-')[0]} address, Memo/Destination Tag is not required.`;
             depositMemoInfo.classList.add('visible');
        } else { depositMemoInfo.classList.remove('visible'); }

        Object.values(statusSteps).forEach(step => step.classList.add('hidden-step'));
        statusSteps.deposit.classList.remove('hidden-step');

        // Prepare data for subsequent steps
        // Use specific elements for processing step text
        if (processingCoinSendElement) processingCoinSendElement.textContent = sendCoinData.ticker.split('-')[0];
        if (processingCoinReceiveElement) processingCoinReceiveElement.textContent = receiveCoinData.ticker.split('-')[0];

        finalReceiveAmount.textContent = `${finalReceive} ${receiveCoinData.ticker.split('-')[0]}`;
        finalRecipientAddressShort.textContent = `${recipientAddress.substring(0, 6)}...${recipientAddress.substring(recipientAddress.length - 4)}`;
        exchangeId.textContent = `EX${Date.now().toString().slice(-7)}`;
    }

    // Return to exchange form
    function resetToExchangeForm() {
        statusSection.classList.remove('active-section');
        statusSection.classList.add('hidden-section');
        exchangeSection.classList.remove('hidden-section');
        exchangeSection.classList.add('active-section');
     }

    // --- Event Listeners ---
    sendCoinSelector.addEventListener('click', () => openModal('send'));
    receiveCoinSelector.addEventListener('click', () => openModal('receive'));
    closeModalBtn.addEventListener('click', closeModal);
    coinModal.addEventListener('click', (e) => { if (e.target === coinModal) closeModal(); });
    searchCoinInput.addEventListener('input', () => populateCoinList(searchCoinInput.value));
    sendAmountInput.addEventListener('input', updateRateAndReceiveAmount);
    swapButton.addEventListener('click', swapCoins);
    copyAddressBtn.addEventListener('click', copyAddress);
    newExchangeBtn.addEventListener('click', resetToExchangeForm);
    backToFormBtn.addEventListener('click', resetToExchangeForm);
    exchangeForm.addEventListener('submit', (e) => { e.preventDefault(); startExchangeSimulation(); });

    // Simulate Exchange Completion Button Handler
    simulateExchangeCompleteBtn.addEventListener('click', () => {
        statusSteps.processing.classList.add('hidden-step');
        statusSteps.complete.classList.remove('hidden-step');
    });

    // --- SUPPORT CHAT LOGIC ---

    // Open/close chat window
    supportChatButton.addEventListener('click', () => {
        supportChatWindow.classList.toggle('visible');
        if (supportChatWindow.classList.contains('visible')) {
             chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
             chatInput.focus();
        }
    });

    closeChatBtn.addEventListener('click', () => {
        supportChatWindow.classList.remove('visible');
    });

    // Send user message (visual only)
    function sendUserMessage() {
        const messageText = chatInput.value.trim();
        if (messageText === '') return;

        if (chatPlaceholder && chatPlaceholder.parentNode === chatMessagesContainer) {
             chatMessagesContainer.removeChild(chatPlaceholder);
        }

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', 'user-message');
        messageElement.textContent = messageText;
        chatMessagesContainer.appendChild(messageElement);

        chatInput.value = '';
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    }

    sendChatMessageBtn.addEventListener('click', sendUserMessage);
    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendUserMessage();
        }
    });

    // --- Application Initialization ---
    async function initializeApp() {
        console.log("Initializing App...");
        loadingIndicator.classList.remove('hidden');
        await fetchBinancePrices();
        const defaultSendCoin = getCoinData('BTC') || coins[0];
        const defaultReceiveCoin = getCoinData('ETH') || coins[1];
        if (defaultSendCoin) selectCoin(defaultSendCoin, 'send', false);
        if (defaultReceiveCoin) selectCoin(defaultReceiveCoin, 'receive', false);
        updateRateAndReceiveAmount();
        updateFeeInfo();
        updateRecipientAddressLabel();
        populateCoinList();
        loadingIndicator.classList.add('hidden');
        console.log("App Initialized.");
     }

    initializeApp(); // Start the app

}); // End DOMContentLoaded