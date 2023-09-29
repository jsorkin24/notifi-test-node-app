import App from './App'; // Assuming your App class is defined in a file named App.ts

async function runApp() {
  const app = new App();
  console.log('Before calling start method');
  await app.start();
  console.log('After calling start method');
}

runApp();