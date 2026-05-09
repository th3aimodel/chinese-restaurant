interface Env {
  ADMIN_PASSWORD: string;
  WEBHOOK_URL: string;
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// In-memory order storage (resets on redeployment, use D1 for persistence)
const orders: any[] = [];

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
  const now = new Date(Date.now() + 8 * 3600 * 1000).toISOString().replace('T', ' ').slice(0, 19);

  const order = {
    id: orderId,
    customer_name: body.customer_name,
    phone: body.phone,
    address: body.address,
    notes: body.notes || '',
    total_price: body.total_price,
    status: 'pending',
    items: body.items,
    created_at: now,
    updated_at: now,
  };

  orders.unshift(order);

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

  return new Response(JSON.stringify(orders), {
    headers: { 'Content-Type': 'application/json' },
  });
};
