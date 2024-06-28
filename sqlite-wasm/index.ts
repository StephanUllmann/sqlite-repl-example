const BASE_PATH = './public';
Bun.serve({
  port: 3000,
  async fetch(req) {
    const filePath = BASE_PATH + new URL(req.url).pathname;
    const file = filePath === BASE_PATH + '/' ? Bun.file(filePath + 'index.html') : Bun.file(filePath);
    return new Response(file);
  },
  error() {
    return new Response(null, { status: 404 });
  },
});
