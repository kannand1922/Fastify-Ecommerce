const fastify = require('fastify')({ logger: true });

fastify.get('/product/:id', async (request, reply) => {
  return { productId: request.params.id, name: 'Sample Product' };
});

fastify.listen({ port: 3002 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info('Product Service is running on http://localhost:3002');
});
