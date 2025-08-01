const config = {
    env: {
      apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
      prodApiEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
      imagekit: {
        publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
        urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
      },
       databaseUrl: process.env.DATABASE_URL!,
      upstash: {
        redisUrl: process.env.UPSTASH_REDIS_URL!,
        redisToken: process.env.UPSTASH_REDIS_TOKEN!,
        qstashUrl: process.env.QSTASH_URL!,
        qstashToken: process.env.QSTASH_TOKEN!,
      },
      // Commented out Resend configuration
      // resendToken: process.env.RESEND_TOKEN!,
      
      // Gmail SMTP configuration
      gmail: {
        user: process.env.GMAIL_USER!,
        appPassword: process.env.GMAIL_APP_PASSWORD!,
      }
    },
  };
  
  export default config;