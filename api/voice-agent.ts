import app from '../server';

export default async function handler(req: any, res: any) {
  // Let express handle the request
  return app(req, res);
}
