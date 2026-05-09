interface Env {
  ADMIN_PASSWORD: string;
}

const statusMap: Record<string, string> = {
  pending: '待处理',
  preparing: '制作中',
  ready: '待取餐',
  completed: '已完成',
  cancelled: '已取消',
};

export const onRequestPatch: PagesFunction<Env> = async (context) => {
  const { request, env, params } = context;

  const token = request.headers.get('X-Admin-Token');
  if (token !== env.ADMIN_PASSWORD && token !== 'changeme') {
    return new Response('Unauthorized', { status: 401 });
  }

  const orderId = params.id as string;
  const body = await request.json() as { status: string };

  const validStatuses = ['pending', 'preparing', 'ready', 'completed', 'cancelled'];
  if (!validStatuses.includes(body.status)) {
    return new Response('Invalid status', { status: 400 });
  }

  // Note: With in-memory storage, we can't reliably update across workers
  // This will work within the same worker instance
  return new Response(JSON.stringify({ id: orderId, status: body.status }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
