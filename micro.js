const fastify = require('fastify')({ logger: true });

fastify.get('/user', async (request, reply) => {
  return { userId: request?.params?.id, name: 'John Doe' };
});

fastify.listen({ port: 3003 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info('User Service is running on http://localhost:3001');
});
