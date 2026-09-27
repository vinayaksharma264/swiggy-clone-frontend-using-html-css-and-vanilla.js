let cart = [];  
async function getCategories() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    displayCategories(data.categories);
}

function displayCategories(categories) {
    const container = document.getElementById('CategoryButtons');
    
    let html = `<button class="category-btn active" data-category="All">All</button>`;
    
    categories.forEach(function(cat) {
        html += `<button class="category-btn" data-category="${cat.strCategory}">${cat.strCategory}</button>`;
    });
    
    container.innerHTML = html;
}

getCategories();

// Category container pe EK BAAR listener lagao (parent pe)
document.getElementById('CategoryButtons').addEventListener('click', function(event) {
    // check karo kya click hua button pe hi hua (na ki khaali jagah pe)
    if (event.target.classList.contains('category-btn')) {
        
        // pehle sab buttons se 'active' class hatao
        document.querySelectorAll('.category-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        
        // jis button pe click hua, usko active banao
        event.target.classList.add('active');
        
        // uska category naam nikalo (data-category attribute se)
        const category = event.target.getAttribute('data-category');
        
        // us category ke items load karo
        loadMenuItems(category);
    }
});

async function loadMenuItems(category) {
    let url;
    if (category === 'All') {
        url = 'https://www.themealdb.com/api/json/v1/1/search.php?f=c';  // random letter se items
    } else {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();
    displayMenuItems(data.meals);
}

function displayMenuItems(meals) {
    const container = document.getElementById('menuGrid');
    
    if (!meals) {
        container.innerHTML = '<p>No items found.</p>';
        return;
    }
    
    let html = '';
    meals.forEach(function(meal) {
        html += `
            <div class="food-card" data-id="${meal.idMeal}" data-name="${meal.strMeal}" data-img="${meal.strMealThumb}">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <h4>${meal.strMeal}</h4>
                <p>₹${Math.floor(Math.random() * 300) + 100}</p>
                <button class="add-to-cart-btn">Add to Cart</button>
            </div>
        `;
    });
    container.innerHTML = html;
}

// add to cart code

document.getElementById('menuGrid').addEventListener('click', function(event) {
    if (event.target.classList.contains('add-to-cart-btn')) {
        
        // button ke parent card se data nikalo (jo humne data-* attributes mein store kiya tha)
        const card = event.target.closest('.food-card');
        const id = card.getAttribute('data-id');
        const name = card.getAttribute('data-name');
        const price = card.querySelector('p').textContent.replace('₹', '');
        
        addToCart(id, name, price);
    }
});

function addToCart(id, name, price) {
    // check karo item already cart mein hai kya
    const existingItem = cart.find(function(item) {
        return item.id === id;
    });
    
    if (existingItem) {
        existingItem.qty += 1;   // already hai, toh sirf quantity badhao
    } else {
        cart.push({ id: id, name: name, price: Number(price), qty: 1 });   // naya item add karo
    }
    
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartitems');
    const cartCountBadge = document.getElementById('cartcount');
    const cartTotalDisplay = document.getElementById('carttotal');
    
    // total items count (badge ke liye)
    let totalCount = 0;
    let totalPrice = 0;
    let html = '';
    
    cart.forEach(function(item) {
        totalCount += item.qty;
        totalPrice += item.qty * item.price;
        
        html += `
            <div class="cart-item">
                <span>${item.name} x${item.qty}</span>
                <div class="qty-controls">
                    <button onclick="decreaseQty('${item.id}')">-</button>
                    <span>${item.qty}</span>
                    <button onclick="increaseQty('${item.id}')">+</button>
                </div>
            </div>
        `;
    });
    
    cartItemsContainer.innerHTML = cart.length > 0 ? html : '<p>Your cart is empty.</p>';
    cartCountBadge.textContent = totalCount;
    cartTotalDisplay.textContent = totalPrice;
}

function increaseQty(id) {
    const item = cart.find(function(i) { return i.id === id; });
    item.qty += 1;
    updateCartUI();
}

function decreaseQty(id) {
    const item = cart.find(function(i) { return i.id === id; });
    item.qty -= 1;
    
    if (item.qty <= 0) {
        cart = cart.filter(function(i) { return i.id !== id; });   // item hata do agar qty 0 ho jaye
    }
    
    updateCartUI();
}

document.getElementById('cartbtn').addEventListener('click', function() {
    document.getElementById('cartSidebar').classList.toggle('hidden');
});