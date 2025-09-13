// Test script to verify the API endpoints work
const testAPI = async () => {
  const baseUrl = 'http://localhost:3000'; // Vercel dev server
  
  console.log('🧪 Testing API endpoints...\n');
  
  // Test health endpoint
  try {
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch(`${baseUrl}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData);
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
  }
  
  // Test send endpoint
  try {
    console.log('\n2. Testing send endpoint...');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      packageType: 'Safari',
      travelDate: '2024-06-01',
      comments: 'This is a test submission'
    };
    
    const sendResponse = await fetch(`${baseUrl}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const sendData = await sendResponse.json();
    console.log('✅ Send test:', sendData);
  } catch (error) {
    console.log('❌ Send test failed:', error.message);
  }
  
  console.log('\n🏁 API testing complete!');
};

// Run the test
testAPI();
