interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
}

function checkAdmin(request: Request, env: Env): boolean {
  const token = request.headers.get('X-Admin-Token');
  return token === env.ADMIN_PASSWORD;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;

  if (!checkAdmin(request, env)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const orderId = params.id as string;
  const order = await env.DB.prepare(
    'SELECT * FROM orders WHERE id = ?'
  ).bind(orderId).first();

  if (!order) {
    return new Response('Not found', { status: 404 });
  }

  const { results: items } = await env.DB.prepare(
    'SELECT dish_name, dish_price, quantity FROM order_items WHERE order_id = ?'
  ).bind(orderId).all();

  return new Response(JSON.stringify({ ...order, items }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;

  if (!checkAdmin(request, env)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const orderId = params.id as string;
  const body = await request.json() as { status: string };

  const validStatuses = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
  if (!validStatuses.includes(body.status)) {
    return new Response('Invalid status', { status: 400 });
  }

  await env.DB.prepare(
    "UPDATE orders SET status = ?, updated_at = datetime('now', '+8 hours') WHERE id = ?"
  ).bind(body.status, orderId).run();

  return new Response(JSON.stringify({ id: orderId, status: body.status }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
