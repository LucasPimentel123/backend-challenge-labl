const { spawn } = require('child_process');
const { Client } = require('pg');

async function waitForDatabase() {
    console.log('Waiting for database to be ready...');
    
    while (true) {
        try {
            const client = new Client(process.env.DATABASE_URL);
            await client.connect();
            await client.end();
            console.log('Database is ready!');
            break;
        } catch (error) {
            console.log('Database is unavailable - sleeping');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

async function runSeed() {
    console.log('Running database seed...');
    
    return new Promise((resolve, reject) => {
        const seedProcess = spawn('npm', ['run', 'seed'], {
            stdio: 'inherit',
            env: process.env
        });
        
        seedProcess.on('close', (code) => {
            if (code === 0) {
                console.log('Database seeded successfully!');
                resolve();
            } else {
                console.log('Database seeding failed!');
                reject(new Error(`Seed process exited with code ${code}`));
            }
        });
        
        seedProcess.on('error', (error) => {
            console.log('Error running seed:', error.message);
            reject(error);
        });
    });
}

async function startApplication() {
    console.log('Starting Express application...');
    
    const appProcess = spawn('npm', ['start'], {
        stdio: 'inherit',
        env: process.env
    });
    
    appProcess.on('close', (code) => {
        console.log(`Application exited with code ${code}`);
        process.exit(code);
    });
    
    appProcess.on('error', (error) => {
        console.log('Error starting application:', error.message);
        process.exit(1);
    });
}

async function main() {
    try {
        console.log('Starting application...');
        
        // Wait for database
        await waitForDatabase();
        
        // Run seed
        await runSeed();
        
        // Start application
        await startApplication();
        
    } catch (error) {
        console.error('Startup failed:', error.message);
        process.exit(1);
    }
}

main();
