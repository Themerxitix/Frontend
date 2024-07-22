document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    const openShopButton = document.getElementById('open-shop-button');
    const logoutButton = document.getElementById('logout-button');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    openShopButton.addEventListener('click', openWebshop);
    logoutButton.addEventListener('click', logout);

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        // Hier zou je normaal gesproken een API-aanroep doen naar je backend
        // Voor dit voorbeeld gebruiken we een eenvoudige array met producten
        const products = [
            'T-shirt', 'Broek', 'Jas', 'Schoenen', 'Sokken', 'Hoed'
        ];

        const results = products.filter(product => 
            product.toLowerCase().includes(searchTerm)
        );

        displayResults(results);
    }

    function displayResults(results) {
        searchResults.innerHTML = '';
        if (results.length === 0) {
            searchResults.innerHTML = 'Geen resultaten gevonden.';
        } else {
            const ul = document.createElement('ul');
            results.forEach(result => {
                const li = document.createElement('li');
                li.textContent = result;
                ul.appendChild(li);
            });
            searchResults.appendChild(ul);
        }
    }

    function logout() {
        // Hier zou je normaal gesproken een API-aanroep doen om de sessie te beëindigen
        // Voor dit voorbeeld simuleren we een uitlogproces
        alert('U bent uitgelogd.');
        // Hier kun je eventueel de gebruiker doorsturen naar een inlogpagina
        // window.location.href = 'login.html';
    }

    function openWebshop() {
        // Hier zou je normaal gesproken de gebruiker naar de hoofdpagina van de webshop sturen
        alert('De webshop wordt geopend.');
        // Uncomment de volgende regel en vervang 'webshop.html' door de juiste URL van je webshop
        // window.location.href = 'webshop.html';
    }
});
