import Fastify from "fastify";
import { userSchema } from "./schema/index.js";
import fastifyJwt from "fastify-jwt";
import { hashPassowrd } from "./utils/password.js";
import multer from "multer";

const fastify = Fastify({
  logger: true,
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
// const upload=multer(storage:storage)
fastify.post("/upload", upload.single("image"), async (request, reply) => {
  const file = request.file;
  if (!file) {
    return reply.status(400).send({ error: "No file uploaded" });
  }

  return reply.send({
    message: "Image uploaded successfully",
    file: {
      filename: file.originalname,
      path: file.path,
      size: file.size,
      mimetype: file.mimetype,
    },
  });
});

fastify.decorateReply("success", function (message) {
  this.send({ success: true, message: message });
});

fastify.register(fastifyJwt, {
  secret: "supersecretkey",
});

fastify.addHook("preHandler", async (request, reply) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return reply.status(401).send({ error: "Unauthorized" });
  }
  console.log(request.url.includes("/login"));
  if (request.url.includes("/register")) {
    return;
  }

  try {
    await request.jwtVerify();
  } catch (err) {
    return reply
      .status(401)
      .send({ error: "Invalid Token", message: err.message });
  }
});

fastify.post("/", { schema: userSchema }, async (request, reply) => {
  console.log("Received body:", request.body);
  if (request.body) {
    reply.send({ success: true, message: request.body });
  } else {
    reply.success({ hello: "world" });
  }
});

fastify.post("/login", async (request, reply) => {
  console.log("Received body:", request.body);
  if (request.body) {
    const token = fastify.jwt.sign({
      name: request.name,
      email: request.email,
    });
    reply.success(token);
  } else {
    reply.status(400).send("failure");
  }
});

fastify.post("/register", async (request, reply) => {
  if (request.body) {
    console.log(request.body.password, "PASS");
    try {
      const response = await hashPassowrd(request.body.password);
      reply.success(response);
    } catch {
      reply.status(400).send("failure");
    }
  }
});
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    fastify.log.info(`Server running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
