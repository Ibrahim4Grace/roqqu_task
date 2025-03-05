import https from 'https';
import cron from 'node-cron';

interface KeepAliveResponse {
  statusCode?: number;
}

interface KeepAliveError extends Error {
  message: string;
}

const url = process.env.PROD_URL;

export const keepAlive = (url: string): void => {
  https
    .get(url, (res: KeepAliveResponse) => {
      console.info(`Status: ${res.statusCode}`);
    })
    .on('error', (error: KeepAliveError) => {
      console.error(`Errors: ${error.message}`);
    });
};

cron.schedule('*/5 * * * *', () => {
  keepAlive(url);
  console.info('Pinging the server every 5 minutes');
});
