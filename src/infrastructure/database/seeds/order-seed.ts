import db from '../sequelize.config';
import CustomerModel from '../models/customer.model';
import ProductModel from '../models/product.model';
import OrderModel from '../models/order.model';
import OrderItemsModel from '../models/order-items.model';

// Sample data arrays with numeric values only
const MARKETPLACES = ['1', '2', '3', '4', '5'];
const ORDER_STATUSES = ['1', '2', '3', '4', '5', '6'];
const CUSTOMER_IDS = Array.from({length: 50}, (_, i) => i + 1);
const CITIES = Array.from({length: 40}, (_, i) => i + 1);
const COUNTRIES = Array.from({length: 10}, (_, i) => i + 1);
const STATES = Array.from({length: 10}, (_, i) => i + 1);
const STREETS = Array.from({length: 5}, (_, i) => i + 1);

const PRODUCT_CATEGORIES = Array.from({length: 10}, (_, i) => i + 1);
const PRODUCT_IDS = Array.from({length: 100}, (_, i) => i + 1);
const SKUS = Array.from({length: 50}, (_, i) => `SKU${(i + 1).toString().padStart(3, '0')}`);

// Helper functions
const getRandomElement = <T>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
};

const getRandomElements = <T>(array: T[], count: number): T[] => {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

const getRandomDate = (start: Date, end: Date): Date => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const getRandomPrice = (min: number, max: number): number => {
    return Math.round((Math.random() * (max - min) + min) * 100) / 100;
};

const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateCustomer = (id: number) => {
    const customerId = getRandomElement(CUSTOMER_IDS);
    const city = getRandomElement(CITIES);
    const country = getRandomElement(COUNTRIES);
    const state = getRandomElement(STATES);
    const street = getRandomElement(STREETS);
    
    return {
        id,
        name: `Customer${customerId}`,
        address: `${getRandomNumber(1000, 9999)} Street${street}`,
        city: `City${city}`,
        state: `State${state}`,
        country: `Country${country}`,
        postal_code: getRandomNumber(10000, 99999).toString()
    };
};

const generateProduct = (id: string) => {
    const productId = getRandomElement(PRODUCT_IDS);
    const sku = getRandomElement(SKUS);
    const price = getRandomPrice(9.99, 299.99);
    const weight = getRandomPrice(0.1, 5.0);
    const quantity = getRandomNumber(1, 100);
    const warranty = Math.random() > 0.5;
    const marketplaceProductId = getRandomNumber(100000, 999999);
    const marketplaceParentProductId = getRandomNumber(100000, 999999);
    
    const now = new Date();
    const created = getRandomDate(new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000), now);
    const updated = getRandomDate(created, now);
    
    return {
        id,
        warranty,
        sku,
        name: `Product${productId}`,
        price,
        weight,
        createdAt: created,
        updatedAt: updated,
        quantity,
        image_url: `https://example.com/images/${sku.toLowerCase()}.jpg`,
        marketplace_product_id: marketplaceProductId,
        marketplace_parent_product_id: marketplaceParentProductId
    };
};

const generateOrder = (orderId: string, customerId: number, createdAt: Date) => {
    const marketplace = getRandomElement(MARKETPLACES);
    const storeId = getRandomNumber(1, 10);
    const status = getRandomElement(ORDER_STATUSES);
    
    return {
        id: orderId,
        marketplace,
        store_id: storeId,
        status,
        createdAt,
        customer_id: customerId
    };
};

const generateOrderItem = (orderId: string, productId: string, quantity: number) => {
    const taxAmount = getRandomNumber(1, 10);
    const isReturnable = Math.random() > 0.3;
    const shippable = Math.random() > 0.1;
    
    return {
        order_id: orderId,
        product_id: productId,
        quantity,
        taxAmount,
        is_returnable: isReturnable,
        shippable
    };
};

export const seedDatabase = async () => {
    console.log('🌱 Starting database seeding...');
    
    try {
        // Sync database
        await db.sync({ force: true });
        console.log('✅ Database synced');
        
        // Generate customers (1000 unique customers)
        console.log('👥 Creating customers...');
        const customers = [];
        for (let i = 1; i <= 1000; i++) {
            customers.push(generateCustomer(i));
        }
        await CustomerModel.bulkCreate(customers);
        console.log(`✅ Created ${customers.length} customers`);
        
        // Generate products (100 unique products)
        console.log('📦 Creating products...');
        const products = [];
        for (let i = 1; i <= 100; i++) {
            products.push(generateProduct(`prod_${i.toString().padStart(6, '0')}`));
        }
        await ProductModel.bulkCreate(products);
        console.log(`✅ Created ${products.length} products`);
        
        // Generate orders (10,000 orders)
        console.log('📋 Creating orders...');
        const orders = [];
        const orderItems = [];
        
        const startDate = new Date('2024-01-01');
        const endDate = new Date();
        
        for (let i = 1; i <= 10000; i++) {
            const orderId = `order_${i.toString().padStart(8, '0')}`;
            const customerId = getRandomNumber(1, 1000);
            const createdAt = getRandomDate(startDate, endDate);
            
            // Create order
            orders.push(generateOrder(orderId, customerId, createdAt));
            
            // Create 1-5 order items per order
            const numItems = getRandomNumber(1, 5);
            const selectedProducts = getRandomElements(products, numItems);
            
            for (const product of selectedProducts) {
                const quantity = getRandomNumber(1, 3);
                orderItems.push(generateOrderItem(orderId, product.id, quantity));
            }
            
            if (i % 1000 === 0) {
                console.log(`📊 Processed ${i} orders...`);
            }
        }
        
        // Bulk insert orders
        await OrderModel.bulkCreate(orders);
        console.log(`✅ Created ${orders.length} orders`);
        
        // Bulk insert order items
        await OrderItemsModel.bulkCreate(orderItems);
        console.log(`✅ Created ${orderItems.length} order items`);
        
        // Calculate and display statistics
        const totalCustomers = await CustomerModel.count();
        const totalProducts = await ProductModel.count();
        const totalOrders = await OrderModel.count();
        const totalOrderItems = await OrderItemsModel.count();
        
        console.log('\n📊 Database Seeding Complete!');
        console.log('================================');
        console.log(`👥 Customers: ${totalCustomers}`);
        console.log(`📦 Products: ${totalProducts}`);
        console.log(`📋 Orders: ${totalOrders}`);
        console.log(`🛒 Order Items: ${totalOrderItems}`);
        console.log(`📈 Average items per order: ${(totalOrderItems / totalOrders).toFixed(2)}`);
        
        // Sample queries to verify data
        console.log('\n🔍 Sample Data Verification:');
        console.log('================================');
        
        const sampleOrder = await OrderModel.findOne({
            include: [
                { model: CustomerModel, as: 'customer' },
                { model: OrderItemsModel, as: 'ordersItems', include: [{ model: ProductModel, as: 'product' }] }
            ]
        });
        
        if (sampleOrder) {
            console.log(`📋 Sample Order: ${sampleOrder.id}`);
            console.log(`   Marketplace: ${sampleOrder.marketplace}`);
            console.log(`   Status: ${sampleOrder.status}`);
            console.log(`   Customer: ${sampleOrder.customer?.name}`);
            console.log(`   Items: ${sampleOrder.ordersItems?.length}`);
        }
        
        console.log('\n🎉 Database seeding completed successfully!');
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
};

// Run seeding if this file is executed directly
if (require.main === module) {
    seedDatabase()
        .then(() => {
            console.log('✅ Seeding completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ Seeding failed:', error);
            process.exit(1);
        });
}
