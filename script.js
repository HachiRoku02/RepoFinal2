// Almacenar los productos seleccionados
function addToCart(productId, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ productId, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productId} añadido al carrito`);
}

// Formatear valores con puntos de mil y denominación "COP"
function formatCurrency(value) {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(value);
}

// Cargar el carrito al cargar la página
if (window.location.pathname.includes('cart.html')) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const carContainer = document.getElementById('cart');
    const totalContainer = document.getElementById('total');
    const clearCartButton = document.getElementById('clear-cart'); // Botón para vaciar el carrito

    if (cart.length === 0) {
        carContainer.innerHTML = '<p>El carrito está vacío</p>';
    } else {
        let total = 0;
        cart.forEach(item => {
            const productElement = document.createElement('p');
            productElement.textContent = `${item.productId} - ${formatCurrency(item.price)}`;
            carContainer.appendChild(productElement);
            total += item.price;
        });
        totalContainer.textContent = formatCurrency(total);
    }

    // Vaciar el carrito al hacer clic en el botón
    clearCartButton.addEventListener('click', () => {
        clearCart(); // Llama a la función para vaciar el carrito
    });
}

// Limpiar el carrito
function clearCart() {
    localStorage.removeItem('cart'); // Eliminar el carrito del localStorage
    const cart = document.getElementById('cart'); // Selecciona el contenedor del carrito
    cart.innerHTML = '<p>El carrito está vacío</p>'; // Limpia el contenido del carrito en el DOM
    document.getElementById('total').textContent = formatCurrency(0); // Reinicia el total a 0 con formato
}

// Copiar el número de teléfono al portapapeles
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Número copiado al portapapeles");
    }).catch(err => {
        console.error("Error al copiar el texto: ", err);
    });
}

// Función para mostrar el menú de búsqueda al hacer clic en el icono de búsqueda
function updateSearchResults() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // Limpia los resultados anteriores

    if (!query) {
        resultsContainer.style.display = 'none';
        return;
    }

    // Diccionario de productos y sus rutas
    const products = [
        { name: "reloj casio edifice", path: "./details/CasioEdifice.html" },
        { name: "reloj rolex submariner", path: "./details/RolexSub.html" },
        { name: "reloj invicta pro diver", path: "./details/Invicta.html" },
        { name: "cadena de oro 18k hombre", path: "./details/CadenaOro.html" },
        { name: "cadena de oro 18k con pendiente", path: "./details/CadenaOroPendiente.html" },
        { name: "cadena de oro 18k mujer", path: "./details/CadenaOroMujer.html" },
        { name: "pulsera de oro y plata 18k hombre", path: "./details/PulseraOroPlata.html" },
        { name: "pulsera de oro 18k mujer", path: "./details/PulseraOroMujer.html" },
        { name: "pulsera de oro y plata 18k mujer", path: "./details/PulseraOroPlataMujer.html" },
        { name: "camisa de algodón hombre", path: "./details/CamisaAlgodonHombre.html" },
        { name: "camisa de algodón mujer", path: "./details/CamisaAlgodonMujer.html" },
        { name: "vestido de algodón mujer", path: "./details/VestidoAlgodonMujer.html" }
    ];

    // Busca coincidencias parciales en los nombres de los productos
    const matchingProducts = products.filter(product => product.name.includes(query));

    if (matchingProducts.length > 0) {
        resultsContainer.style.display = 'block';

        // Mostrar hasta 3 productos
        const limitedResults = matchingProducts.slice(0, 3);
        limitedResults.forEach(product => {
            const resultItem = document.createElement('div');
            resultItem.className = 'p-2 border-bottom';
            resultItem.style.cursor = 'pointer';
            resultItem.textContent = product.name;
            resultItem.onclick = () => {
                window.location.href = product.path;
            };
            resultsContainer.appendChild(resultItem);
        });

        // Si hay más de 3 productos, mostrar el botón "Ver más"
        if (matchingProducts.length > 3) {
            const viewMoreButton = document.createElement('button');
            viewMoreButton.className = 'btn btn-link w-100 text-center';
            viewMoreButton.textContent = 'Ver más productos';
            viewMoreButton.onclick = () => {
                resultsContainer.innerHTML = ''; // Limpia los resultados anteriores
                matchingProducts.forEach(product => {
                    const resultItem = document.createElement('div');
                    resultItem.className = 'p-2 border-bottom';
                    resultItem.style.cursor = 'pointer';
                    resultItem.textContent = product.name;
                    resultItem.onclick = () => {
                        window.location.href = product.path;
                    };
                    resultsContainer.appendChild(resultItem);
                });
                viewMoreButton.style.display = 'none'; // Oculta el botón después de expandir
            };
            resultsContainer.appendChild(viewMoreButton);
        }
    } else {
        resultsContainer.style.display = 'none';
    }
}

function handleSearch(event) {
    event.preventDefault(); // Evita que el formulario recargue la página
    const query = document.getElementById('search-input').value.toLowerCase();

    // Diccionario de productos y sus rutas
    const products = [
        { name: "reloj casio edifice", path: "./details/CasioEdifice.html" },
        { name: "reloj rolex submariner", path: "./details/RolexSub.html" },
        { name: "reloj invicta pro diver", path: "./details/Invicta.html" },
        { name: "cadena de oro 18k hombre", path: "./details/CadenaOro.html" },
        { name: "cadena de oro 18k con pendiente", path: "./details/CadenaOroPendiente.html" },
        { name: "cadena de oro 18k mujer", path: "./details/CadenaOroMujer.html" },
        { name: "pulsera de oro y plata 18k hombre", path: "./details/PulseraOroPlata.html" },
        { name: "pulsera de oro 18k mujer", path: "./details/PulseraOroMujer.html" },
        { name: "pulsera de oro y plata 18k mujer", path: "./details/PulseraOroPlataMujer.html" },
        { name: "camisa de algodón hombre", path: "./details/CamisaAlgodonHombre.html" },
        { name: "camisa de algodón mujer", path: "./details/CamisaAlgodonMujer.html" },
        { name: "vestido de algodón mujer", path: "./details/VestidoAlgodonMujer.html" }
    ];

    // Busca coincidencias parciales en los nombres de los productos
    const matchingProducts = products.filter(product => product.name.includes(query));

    if (matchingProducts.length > 0) {
        // Redirige al primer producto encontrado
        window.location.href = matchingProducts[0].path;
    } else {
        alert("Producto no encontrado. Intenta buscar otro término.");
    }
}
