import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';

const POS = () => {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);

  // Sample products
  const products = [
    { id: 1, name: 'Laptop', price: 800000, category: 'Electronics' },
    { id: 2, name: 'Phone', price: 400000, category: 'Electronics' },
    { id: 3, name: 'T-Shirt', price: 15000, category: 'Clothing' },
    { id: 4, name: 'Shoes', price: 50000, category: 'Clothing' },
    { id: 5, name: 'Rice (1kg)', price: 3500, category: 'Food' },
    { id: 6, name: 'Sugar (1kg)', price: 2500, category: 'Food' },
  ];

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = total * 0.18;
  const grandTotal = total + tax;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Products Section */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Products</h3>
          
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => addToCart(product)}
                className="p-4 border border-gray-300 rounded-lg hover:shadow-lg cursor-pointer transition hover:border-blue-500"
              >
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 h-32 rounded mb-3 flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>
                <h4 className="font-semibold text-gray-900 text-sm">{product.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">TSH {product.price.toLocaleString()}</p>
                <button className="w-full mt-3 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex items-center justify-center gap-2">
                  <FiPlus size={18} /> Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow p-6 sticky top-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Cart ({cart.length})</h3>

          {/* Cart Items */}
          <div className="space-y-3 max-h-96 overflow-y-auto mb-4">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Cart is empty</p>
            ) : (
              cart.map(item => (
                <div key={item.id} className="border border-gray-200 rounded p-3 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-sm text-gray-900">{item.name}</h4>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      className="w-12 text-center border border-gray-300 rounded py-1"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm font-semibold text-blue-600">TSH {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>

          {/* Totals */}
          {cart.length > 0 && (
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">TSH {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax (18%):</span>
                <span className="font-semibold">TSH {tax.toLocaleString()}</span>
              </div>
              <div className="bg-blue-50 -mx-6 px-6 py-3 border-t border-b">
                <div className="flex justify-between">
                  <span className="font-bold text-gray-900">Total:</span>
                  <span className="font-bold text-lg text-blue-600">TSH {grandTotal.toLocaleString()}</span>
                </div>
              </div>
              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 mt-4">
                Complete Sale
              </button>
              <button className="w-full bg-gray-300 text-gray-900 py-2 rounded-lg font-semibold hover:bg-gray-400">
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default POS;
