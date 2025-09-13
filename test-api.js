// Test script to verify the API endpoints work
const testAPI = async () => {
  const baseUrl = 'http://localhost:3000'; // Vercel dev server
  
  console.log('🧪 Testing Nathir Travels API endpoints...\n');
  
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
    console.log('\n2. Testing email sending endpoint...');
    const testData = {
      name: 'Test Customer',
      email: 'test@example.com',
      packageType: 'Complete Package (Flight + Hotel + Safari)',
      travelDate: '2024-06-15',
      comments: 'This is a test booking request from the API test script. Please ignore this email.'
    };
    
    console.log('📧 Sending test email to nathirtravels25@gmail.com...');
    const sendResponse = await fetch(`${baseUrl}/api/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });
    
    const sendData = await sendResponse.json();
    
    if (sendResponse.ok) {
      console.log('✅ Email sent successfully!');
      console.log('📬 Check nathirtravels25@gmail.com for the test email');
      console.log('Response:', sendData);
    } else {
      console.log('❌ Email sending failed:', sendData);
    }
  } catch (error) {
    console.log('❌ Send test failed:', error.message);
    console.log('💡 Make sure to:');
    console.log('   - Set up environment variables (EMAIL_USER, EMAIL_PASS)');
    console.log('   - Generate Gmail App Password');
    console.log('   - Run with: vercel dev');
  }
  
  console.log('\n🏁 API testing complete!');
  console.log('\n📋 Next steps:');
  console.log('   1. Set up Gmail App Password (see EMAIL_SETUP.md)');
  console.log('   2. Configure Vercel environment variables');
  console.log('   3. Deploy to Vercel and test the live form');
};

// Run the test
testAPI();
