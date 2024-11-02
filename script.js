// Mengatur tampilan menu
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Mengelola pesanan customer
let orders = [];

function submitOrder() {
    const food = document.getElementById("orderFood").value;
    const quantity = parseInt(document.getElementById("orderQuantity").value);
    const extraMenu = document.getElementById("addMenu").checked;
    const extraFood = document.getElementById("extraFood").value;
    const extraQuantity = parseInt(document.getElementById("extraQuantity").value);

    const prices = {dada: 13000, pahaAtas: 13000, pahaBawah: 11000, sayap: 5000};
    const price = prices[food] * quantity + (extraMenu ? prices[extraFood] * extraQuantity : 0);
    
    const orderDate = new Date().toLocaleDateString();
    const orderEntry = {
        date: orderDate,
        name: food,
        quantity: quantity,
        price: price
    };
    orders.push(orderEntry);

    // Tampilkan deskripsi pesanan
    const orderDescription = document.getElementById("orderDescription");
    orderDescription.innerHTML += `<p>${orderDate}: ${quantity}x ${food} ${extraMenu ? `+ ${extraQuantity}x ${extraFood}` : ''} - Total: Rp ${price}</p>`;
    
    // Tambah ke tabel pesanan customer
    const orderList = document.getElementById("orderList");
    const newRow = orderList.insertRow();
    newRow.innerHTML = `<td>${orderDate}</td><td>${food}</td><td>${quantity}</td><td>Rp ${price}</td>`;
}

// Mengelola stock barang
let stock = {
    dada: 0,
    pahaAtas: 0,
    pahaBawah: 0,
    sayap: 0
};

function addStock() {
    const item = document.getElementById("stockItem").value;
    const date = document.getElementById("stockDate").value;
    const quantity = parseInt(document.getElementById("stockQuantity").value);

    stock[item] += quantity;

    const historyInTable = document.getElementById("historyInTable");
    const newRow = historyInTable.insertRow();
    newRow.innerHTML = `<td>${date}</td><td>${item}</td><td>${quantity}</td>`;
    
    alert(`Stock ${item} ditambahkan sebanyak ${quantity}.`);
}

// Melihat stok barang
function viewStock() {
    const stockTable = document.getElementById("stockTable");
    stockTable.innerHTML = "<tr><th>Nama Barang</th><th>Jumlah</th></tr>";
    for (const [key, value] of Object.entries(stock)) {
        const newRow = stockTable.insertRow();
        newRow.innerHTML = `<td>${key}</td><td>${value}</td>`;
    }
}

// Mengaktifkan atau menonaktifkan menu tambahan
function toggleExtraMenu() {
    const extraMenu = document.getElementById("extraMenu");
    extraMenu.style.display = extraMenu.style.display === 'none' ? 'block' : 'none';
}

// Menampilkan tabel stok saat dibuka
document.getElementById('viewStockSection').addEventListener('click', viewStock);
