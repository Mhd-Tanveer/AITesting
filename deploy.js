const { exec } = require('child_process');
const path = require('path');

const projectPath = path.resolve(__dirname);
const token = process.env.VERCEL_TOKEN || 'YOUR_VERCEL_TOKEN_HERE';

// Run vercel deploy with non-interactive flags
const command = `vercel deploy --prod --force --token ${token} --yes`;

console.log('Starting deployment to Vercel...');
console.log('Command: vercel deploy --prod --force --token [HIDDEN] --yes');

exec(command, { cwd: projectPath, stdio: 'inherit' }, (error, stdout, stderr) => {
  if (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
  }
  
  console.log('Deployment successful!');
  console.log('Output:', stdout);
  process.exit(0);
});
