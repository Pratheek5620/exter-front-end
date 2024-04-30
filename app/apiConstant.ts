export const getApiUrl = (hostName: string): string => {
    let apiUrl: string;
  
    switch (hostName) {
      case 'localhost':
        apiUrl = 'https://makethedamnthingfree.free.beeceptor.com';
        break;
      case 'your-staging-domain.com':
        apiUrl = 'https://staging-api.yourdomain.com';
        break;
      case 'your-production-domain.com':
        apiUrl = 'https://api.yourdomain.com';
        break;
      default:
        apiUrl = 'http://localhost:3000/api';
        break;
    }

    return apiUrl
}