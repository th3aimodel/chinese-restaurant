interface Env {
  DB: D1Database;
  ADMIN_PASSWORD: string;
  WEBHOOK_URL: string;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const body = await request.json() as {
    customer_name: string;
    phone: string;
    address: string;
    notes?: string;
    total_price: number;
    items: { dish_name: string; dish_price: number; quantity: number }[];
  };

  const orderId = generateId();

  // Insert order
  await env.DB.prepare(
    `INSERT INTO orders (id, customer_name, phone, address, notes, total_price, status)
     VALUES (?, ?, ?, ?, ?, ?, 'pending')`
  ).bind(orderId, body.customer_name, body.phone, body.address, body.notes || '', body.total_price).run();

  // Insert order items
  for (const item of body.items) {
    const itemId = generateId();
    await env.DB.prepare(
      `INSERT INTO order_items (id, order_id, dish_name, dish_price, quantity)
       VALUES (?, ?, ?, ?, ?)`
    ).bind(itemId, orderId, item.dish_name, item.dish_price, item.quantity).run();
  }

  // Send webhook notification
  const webhookUrl = env.WEBHOOK_URL || '';
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          msgtype: 'text',
          text: {
            content: `🥢 新订单提醒！\n订单号：${orderId}\n客户：${body.customer_name}\n电话：${body.phone}\n地址：${body.address}\n${body.notes ? '备注：' + body.notes + '\n' : ''}菜品：${body.items.map(i => i.dish_name + '×' + i.quantity).join('、')}\n合计：¥${body.total_price}`
          }
        }),
      });
    } catch (e) {
      console.error('Webhook failed:', e);
    }
  }

  return new Response(JSON.stringify({ id: orderId, status: 'pending' }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  const token = request.headers.get('X-Admin-Token');
  if (token !== env.ADMIN_PASSWORD && token !== 'changeme') {
    return new Response('Unauthorized', { status: 401 });
  }

  const { results: orders } = await env.DB.prepare(
    `SELECT * FROM orders ORDER BY created_at DESC LIMIT 100`
  ).all();

  // Get items for each order
  for (const order of orders as any[]) {
    const { results: items } = await env.DB.prepare(
      `SELECT dish_name, dish_price, quantity FROM order_items WHERE order_id = ?`
    ).bind(order.id).all();
    order.items = items;
  }

  return new Response(JSON.stringify(orders), {
    headers: { 'Content-Type': 'application/json' },
  });
};
