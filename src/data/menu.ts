export interface Dish {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  spicy: number;
  emoji: string;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export const categories: Category[] = [
  { id: 'cantonese', name: '粤菜', emoji: '🥡', description: '清淡鲜美，讲究原味' },
  { id: 'hunan', name: '湘菜', emoji: '🌶️', description: '香辣浓烈，口味独特' },
  { id: 'sichuan', name: '川菜', emoji: '🔥', description: '麻辣鲜香，百味俱全' },
  { id: 'dongbei', name: '东北菜', emoji: '🍖', description: '量大实在，豪爽过瘾' },
  { id: 'staple', name: '主食', emoji: '🍚', description: '米饭面食，饱腹之选' },
  { id: 'drinks', name: '饮品', emoji: '🥤', description: '清爽解渴，搭配好菜' },
];

export const dishes: Dish[] = [
  // 粤菜
  { id: 'y1', name: '白切鸡', price: 38, description: '皮爽肉滑，原汁原味', category: 'cantonese', spicy: 0, emoji: '🍗' },
  { id: 'y2', name: '清蒸鲈鱼', price: 58, description: '鲜嫩细腻，清香四溢', category: 'cantonese', spicy: 0, emoji: '🐟' },
  { id: 'y3', name: '蜜汁叉烧', price: 42, description: '甜香入味，肥瘦相间', category: 'cantonese', spicy: 0, emoji: '🥩' },
  { id: 'y4', name: '虾饺皇', price: 28, description: '晶莹剔透，鲜虾满溢', category: 'cantonese', spicy: 0, emoji: '🥟' },
  { id: 'y5', name: '干炒牛河', price: 32, description: '镬气十足，牛肉嫩滑', category: 'cantonese', spicy: 1, emoji: '🍜' },
  { id: 'y6', name: '煲仔饭', price: 35, description: '锅巴香脆，腊味浓郁', category: 'cantonese', spicy: 0, emoji: '🍚' },
  { id: 'y7', name: '豉油皇炒面', price: 26, description: '酱油飘香，面条弹牙', category: 'cantonese', spicy: 0, emoji: '🍝' },
  { id: 'y8', name: '皮蛋瘦肉粥', price: 18, description: '绵密顺滑，暖心暖胃', category: 'cantonese', spicy: 0, emoji: '🥣' },

  // 湘菜
  { id: 'x1', name: '剁椒鱼头', price: 58, description: '鲜辣过瘾，湘菜之魂', category: 'hunan', spicy: 3, emoji: '🐟' },
  { id: 'x2', name: '农家小炒肉', price: 36, description: '家常味道，下饭神器', category: 'hunan', spicy: 2, emoji: '🥬' },
  { id: 'x3', name: '毛氏红烧肉', price: 48, description: '肥而不腻，入口即化', category: 'hunan', spicy: 1, emoji: '🥩' },
  { id: 'x4', name: '辣椒炒肉', price: 32, description: '湖南经典，香辣开胃', category: 'hunan', spicy: 2, emoji: '🌶️' },
  { id: 'x5', name: '湘西外婆菜', price: 28, description: '腌菜飘香，咸辣下饭', category: 'hunan', spicy: 2, emoji: '🥗' },
  { id: 'x6', name: '酸辣鸡杂', price: 34, description: '酸辣爽脆，口感丰富', category: 'hunan', spicy: 2, emoji: '🐔' },
  { id: 'x7', name: '腊味合蒸', price: 42, description: '烟熏浓香，传统风味', category: 'hunan', spicy: 1, emoji: '🍖' },
  { id: 'x8', name: '口味虾', price: 68, description: '麻辣鲜香，宵夜必点', category: 'hunan', spicy: 3, emoji: '🦞' },

  // 川菜
  { id: 'c1', name: '麻婆豆腐', price: 28, description: '麻辣鲜烫，豆腐嫩滑', category: 'sichuan', spicy: 3, emoji: '🧈' },
  { id: 'c2', name: '宫保鸡丁', price: 36, description: '花生酥脆，鸡丁弹嫩', category: 'sichuan', spicy: 2, emoji: '🐔' },
  { id: 'c3', name: '回锅肉', price: 38, description: '肉片卷曲，酱香浓郁', category: 'sichuan', spicy: 2, emoji: '🥩' },
  { id: 'c4', name: '水煮鱼', price: 58, description: '麻辣鲜嫩，油亮诱人', category: 'sichuan', spicy: 3, emoji: '🐟' },
  { id: 'c5', name: '夫妻肺片', price: 42, description: '红油飘香，口感层次丰富', category: 'sichuan', spicy: 2, emoji: '🥩' },
  { id: 'c6', name: '鱼香肉丝', price: 32, description: '甜酸辣鲜，百搭下饭', category: 'sichuan', spicy: 1, emoji: '🥕' },
  { id: 'c7', name: '毛血旺', price: 52, description: '重油重辣，酣畅淋漓', category: 'sichuan', spicy: 3, emoji: '🍲' },
  { id: 'c8', name: '担担面', price: 22, description: '芝麻酱香，微辣回甘', category: 'sichuan', spicy: 1, emoji: '🍜' },

  // 东北菜
  { id: 'd1', name: '锅包肉', price: 42, description: '外酥里嫩，酸甜可口', category: 'dongbei', spicy: 0, emoji: '🥩' },
  { id: 'd2', name: '地三鲜', price: 28, description: '土豆茄子青椒，家常美味', category: 'dongbei', spicy: 0, emoji: '🥔' },
  { id: 'd3', name: '小鸡炖蘑菇', price: 48, description: '鸡汤浓郁，蘑菇鲜香', category: 'dongbei', spicy: 0, emoji: '🐔' },
  { id: 'd4', name: '酸菜炖粉条', price: 32, description: '酸菜爽口，粉条软糯', category: 'dongbei', spicy: 1, emoji: '🥬' },
  { id: 'd5', name: '溜肉段', price: 36, description: '外焦里嫩，酱汁浓郁', category: 'dongbei', spicy: 0, emoji: '🥩' },
  { id: 'd6', name: '东北大拌菜', price: 22, description: '爽脆开胃，解腻佳品', category: 'dongbei', spicy: 0, emoji: '🥗' },
  { id: 'd7', name: '酱骨架', price: 38, description: '大口吃肉，酱香满溢', category: 'dongbei', spicy: 0, emoji: '🍖' },
  { id: 'd8', name: '猪肉炖粉条', price: 34, description: '东北名菜，暖胃暖心', category: 'dongbei', spicy: 0, emoji: '🍲' },

  // 主食
  { id: 's1', name: '白米饭', price: 3, description: '精选东北大米', category: 'staple', spicy: 0, emoji: '🍚' },
  { id: 's2', name: '蛋炒饭', price: 15, description: '粒粒分明，蛋香四溢', category: 'staple', spicy: 0, emoji: '🍳' },
  { id: 's3', name: '扬州炒饭', price: 18, description: '配料丰富，色彩缤纷', category: 'staple', spicy: 0, emoji: '🍚' },
  { id: 's4', name: '炸酱面', price: 16, description: '酱香浓郁，面条劲道', category: 'staple', spicy: 1, emoji: '🍜' },
  { id: 's5', name: '酸辣粉', price: 14, description: '酸辣开胃，红薯粉Q弹', category: 'staple', spicy: 2, emoji: '🍜' },

  // 饮品
  { id: 'b1', name: '可乐', price: 5, description: '冰爽畅饮', category: 'drinks', spicy: 0, emoji: '🥤' },
  { id: 'b2', name: '雪碧', price: 5, description: '清凉解渴', category: 'drinks', spicy: 0, emoji: '🥤' },
  { id: 'b3', name: '王老吉', price: 6, description: '怕上火喝王老吉', category: 'drinks', spicy: 0, emoji: '🥫' },
  { id: 'b4', name: '酸梅汤', price: 8, description: '酸甜生津，消暑解腻', category: 'drinks', spicy: 0, emoji: '🧃' },
  { id: 'b5', name: '豆浆', price: 5, description: '现磨醇香，温暖脾胃', category: 'drinks', spicy: 0, emoji: '🥛' },
];
