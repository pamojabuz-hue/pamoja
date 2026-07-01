import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

void main() {
  runApp(const PamojaApp());
}

class PamojaApp extends StatelessWidget {
  const PamojaApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PAMOJA',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.blue,
        useMaterial3: true,
        appBarTheme: const AppBarTheme(
          centerTitle: true,
          elevation: 0,
          backgroundColor: Color(0xFF1E40AF),
          foregroundColor: Colors.white,
        ),
      ),
      home: const PamojaHome(),
    );
  }
}

class PamojaHome extends StatefulWidget {
  const PamojaHome({Key? key}) : super(key: key);

  @override
  State<PamojaHome> createState() => _PamojaHomeState();
}

class _PamojaHomeState extends State<PamojaHome> {
  int _selectedIndex = 0;

  final List<Widget> _pages = [
    const DashboardPage(),
    const POSPage(),
    const InventoryPage(),
    const ProfilePage(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('PAMOJA', style: TextStyle(fontWeight: FontWeight.bold)),
      ),
      body: _pages[_selectedIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _selectedIndex,
        onTap: (index) => setState(() => _selectedIndex = index),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Dashboard',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.shopping_cart),
            label: 'POS',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.inventory_2),
            label: 'Inventory',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Profile',
          ),
        ],
      ),
    );
  }
}

// Dashboard Page
class DashboardPage extends StatelessWidget {
  const DashboardPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // Stats Cards
        SizedBox(
          height: 120,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: const [
              StatCard(title: 'Sales Today', value: 'TSH 500K', icon: Icons.trending_up),
              SizedBox(width: 16),
              StatCard(title: 'Orders', value: '24', icon: Icons.shopping_bag),
              SizedBox(width: 16),
              StatCard(title: 'Customers', value: '156', icon: Icons.people),
            ],
          ),
        ),
        const SizedBox(height: 24),
        
        // Recent Transactions
        Text('Recent Transactions', style: Theme.of(context).textTheme.titleLarge),
        const SizedBox(height: 12),
        ...List.generate(5, (index) {
          return TransactionTile(
            title: 'Customer ${index + 1}',
            amount: 'TSH ${50000 * (index + 1)}',
            time: '${14 - index}:${30 + index * 5} PM',
          );
        }),
      ],
    );
  }
}

// POS Page
class POSPage extends StatefulWidget {
  const POSPage({Key? key}) : super(key: key);

  @override
  State<POSPage> createState() => _POSPageState();
}

class _POSPageState extends State<POSPage> {
  List<CartItem> cart = [];
  final products = [
    {'name': 'Laptop', 'price': 800000},
    {'name': 'Phone', 'price': 400000},
    {'name': 'T-Shirt', 'price': 15000},
    {'name': 'Shoes', 'price': 50000},
    {'name': 'Rice', 'price': 3500},
    {'name': 'Sugar', 'price': 2500},
  ];

  void addToCart(String name, int price) {
    setState(() {
      final existing = cart.firstWhere(
        (item) => item.name == name,
        orElse: () => CartItem(name: name, price: price, quantity: 0),
      );
      if (cart.contains(existing)) {
        existing.quantity++;
      } else {
        cart.add(CartItem(name: name, price: price, quantity: 1));
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final total = cart.fold(0, (sum, item) => sum + (item.price * item.quantity));

    return Column(
      children: [
        Expanded(
          child: GridView.builder(
            padding: const EdgeInsets.all(12),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 0.8,
              mainAxisSpacing: 12,
              crossAxisSpacing: 12,
            ),
            itemCount: products.length,
            itemBuilder: (context, index) {
              final product = products[index];
              return GestureDetector(
                onTap: () => addToCart(product['name']!, product['price']!),
                child: Card(
                  elevation: 4,
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Icon(Icons.shopping_bag, size: 40, color: Colors.blue),
                      const SizedBox(height: 8),
                      Text(product['name']!, style: const TextStyle(fontWeight: FontWeight.bold)),
                      const SizedBox(height: 4),
                      Text(
                        'TSH ${product['price']!}',
                        style: const TextStyle(color: Colors.green, fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
        Container(
          padding: const EdgeInsets.all(16),
          color: Colors.grey[100],
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              SizedBox(
                height: 120,
                child: ListView.builder(
                  itemCount: cart.length,
                  itemBuilder: (context, index) {
                    final item = cart[index];
                    return ListTile(
                      title: Text(item.name),
                      subtitle: Text('${item.quantity} × TSH ${item.price}'),
                      trailing: Text('TSH ${item.price * item.quantity}'),
                    );
                  },
                ),
              ),
              const Divider(),
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('Total:', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                    Text('TSH $total', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.blue)),
                  ],
                ),
              ),
              ElevatedButton.icon(
                onPressed: () {},
                icon: const Icon(Icons.check),
                label: const Text('Complete Sale'),
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 50),
                  backgroundColor: Colors.green,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

// Inventory Page
class InventoryPage extends StatelessWidget {
  const InventoryPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final inventory = [
      {'product': 'Laptop', 'stock': 15, 'status': 'Good'},
      {'product': 'Phone', 'stock': 5, 'status': 'Low'},
      {'product': 'T-Shirt', 'stock': 120, 'status': 'Good'},
      {'product': 'Shoes', 'stock': 8, 'status': 'Critical'},
    ];

    return ListView.builder(
      padding: const EdgeInsets.all(16),
      itemCount: inventory.length,
      itemBuilder: (context, index) {
        final item = inventory[index];
        return Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            title: Text(item['product']!),
            subtitle: Text('Stock: ${item['stock']} units'),
            trailing: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(20),
                color: item['status'] == 'Good' ? Colors.green[100] :
                       item['status'] == 'Low' ? Colors.orange[100] : Colors.red[100],
              ),
              child: Text(
                item['status']!,
                style: TextStyle(
                  fontWeight: FontWeight.bold,
                  color: item['status'] == 'Good' ? Colors.green :
                         item['status'] == 'Low' ? Colors.orange : Colors.red,
                ),
              ),
            ),
          ),
        );
      },
    );
  }
}

// Profile Page
class ProfilePage extends StatelessWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          const CircleAvatar(
            radius: 50,
            child: Icon(Icons.person, size: 50),
          ),
          const SizedBox(height: 16),
          const Text('Pamojabuz Hue', style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
          const Text('Store Manager', style: TextStyle(color: Colors.grey)),
          const SizedBox(height: 32),
          ElevatedButton(
            onPressed: () {},
            child: const Text('Settings'),
          ),
          const SizedBox(height: 8),
          ElevatedButton(
            onPressed: () {},
            style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
            child: const Text('Logout'),
          ),
        ],
      ),
    );
  }
}

// Helper Widgets
class StatCard extends StatelessWidget {
  final String title;
  final String value;
  final IconData icon;

  const StatCard({
    Key? key,
    required this.title,
    required this.value,
    required this.icon,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Container(
        width: 120,
        padding: const EdgeInsets.all(12),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 32, color: Colors.blue),
            const SizedBox(height: 8),
            Text(title, style: const TextStyle(fontSize: 12), textAlign: TextAlign.center),
            const SizedBox(height: 4),
            Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
          ],
        ),
      ),
    );
  }
}

class TransactionTile extends StatelessWidget {
  final String title;
  final String amount;
  final String time;

  const TransactionTile({
    Key? key,
    required this.title,
    required this.amount,
    required this.time,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: const Icon(Icons.receipt, color: Colors.blue),
        title: Text(title),
        subtitle: Text(time, style: const TextStyle(fontSize: 12)),
        trailing: Text(amount, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.green)),
      ),
    );
  }
}

class CartItem {
  String name;
  int price;
  int quantity;

  CartItem({required this.name, required this.price, required this.quantity});
}
