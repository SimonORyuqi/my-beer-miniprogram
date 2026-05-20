// 测试数据 - 精酿啤酒商城
module.exports = {
  // 商品分类
  categories: [
    { id: 'all', name: '全部', icon: '🍺' },
    { id: 'ipa', name: 'IPA', icon: '🌿' },
    { id: 'stout', name: '世涛', icon: '🖤' },
    { id: 'lager', name: '拉格', icon: '💧' },
    { id: 'wheat', name: '小麦', icon: '🌾' },
    { id: 'sour', name: '酸啤', icon: '🍋' },
    { id: 'new', name: '新锐', icon: '✨' }
  ],

  // 酒款列表
  products: [
    {
      id: '001',
      name: '迷失海岸',
      nameEn: 'Lost Coast',
      style: 'ipa',
      styleName: 'IPA',
      brewery: '迷失海岸酿酒厂',
      origin: '美国加州',
      abv: 6.5,
      ibu: 45,
      volume: '330ml',
      price: 38,
      originalPrice: 48,
      rating: 4.8,
      reviews: 236,
      image: '/images/products/beer1.png',
      description: '经典西海岸IPA，酒花香气浓郁，带有柑橘和松木的风味。',
      flavor: {
        aroma: '浓郁的酒花香气，伴有柑橘和松针味',
        taste: '入口清爽，苦度适中，麦芽甜味平衡',
        finish: '余韵悠长，带有持久的酒花苦味'
      },
      foodPairing: ['汉堡', '墨西哥玉米片', '辛辣食物'],
      stock: 50,
      specs: [
        { name: '330ml', price: 38, stock: 30 },
        { name: '500ml', price: 52, stock: 15 },
        { name: '1L', price: 88, stock: 5 }
      ]
    },
    {
      id: '002',
      name: '督威',
      nameEn: 'Duvel',
      style: 'lager',
      styleName: '拉格',
      brewery: '督威酿酒厂',
      origin: '比利时',
      abv: 8.5,
      ibu: 35,
      volume: '330ml',
      price: 45,
      originalPrice: 45,
      rating: 4.9,
      reviews: 512,
      image: '/images/products/beer2.png',
      description: '比利时金色烈性艾尔，泡沫细腻持久，口感清爽。',
      flavor: {
        aroma: '酵母香气混合着水果香',
        taste: '入口微甜，随后是清爽的苦味',
        finish: '干爽收尾，令人愉悦'
      },
      foodPairing: ['海鲜', '沙拉', '奶酪'],
      stock: 30,
      specs: [
        { name: '330ml', price: 45, stock: 20 },
        { name: '750ml', price: 98, stock: 10 }
      ]
    },
    {
      id: '003',
      name: '创始者早餐世涛',
      nameEn: 'Founders Breakfast Stout',
      style: 'stout',
      styleName: '世涛',
      brewery: '创始者酿酒厂',
      origin: '美国密歇根',
      abv: 8.3,
      ibu: 60,
      volume: '355ml',
      price: 58,
      originalPrice: 68,
      rating: 4.7,
      reviews: 189,
      image: '/images/products/beer3.png',
      description: '浓郁咖啡世涛，加入了咖啡和燕麦，口感丝滑。',
      flavor: {
        aroma: '咖啡和巧克力的浓郁香气',
        taste: '咖啡苦涩与巧克力甜味完美平衡',
        finish: '丝滑绵长，咖啡余韵'
      },
      foodPairing: ['牛排', '烤肉', '甜点'],
      stock: 20,
      specs: [
        { name: '355ml', price: 58, stock: 15 },
        { name: '473ml', price: 72, stock: 5 }
      ]
    },
    {
      id: '004',
      name: '福佳白',
      nameEn: 'Hoegaarden',
      style: 'wheat',
      styleName: '小麦',
      brewery: '福佳酿酒厂',
      origin: '比利时',
      abv: 4.9,
      ibu: 15,
      volume: '330ml',
      price: 28,
      originalPrice: 28,
      rating: 4.6,
      reviews: 876,
      image: '/images/products/beer4.png',
      description: '经典比利时小麦啤酒，添加了橙皮和香菜，清新易饮。',
      flavor: {
        aroma: '淡淡的橙皮和香菜气息',
        taste: '清爽微酸，伴有柑橘风味',
        finish: '干净利落，适合畅饮'
      },
      foodPairing: ['海鲜', '沙拉', '亚洲料理'],
      stock: 100,
      specs: [
        { name: '330ml', price: 28, stock: 60 },
        { name: '500ml', price: 38, stock: 40 }
      ]
    },
    {
      id: '005',
      name: '梦想之地酸IPA',
      nameEn: 'Dreamsicle Sour IPA',
      style: 'sour',
      styleName: '酸啤',
      brewery: '梦想之地',
      origin: '美国',
      abv: 5.8,
      ibu: 25,
      volume: '330ml',
      price: 42,
      originalPrice: 52,
      rating: 4.5,
      reviews: 134,
      image: '/images/products/beer5.png',
      description: '新英格兰酸IPA，加入了百香果和芒果，热带水果风味爆炸。',
      flavor: {
        aroma: '浓郁的热带水果香气',
        taste: '酸甜平衡，果香丰富',
        finish: '清爽愉悦，回味无穷'
      },
      foodPairing: ['水果拼盘', '奶酪', '烧烤'],
      stock: 35,
      specs: [
        { name: '330ml', price: 42, stock: 25 },
        { name: '500ml', price: 58, stock: 10 }
      ]
    },
    {
      id: '006',
      name: '另一半双倍干投',
      nameEn: 'Other Half DDH',
      style: 'new',
      styleName: '新锐',
      brewery: '另一半酿酒厂',
      origin: '美国纽约',
      abv: 8.0,
      ibu: 50,
      volume: '330ml',
      price: 68,
      originalPrice: 88,
      rating: 4.9,
      reviews: 78,
      image: '/images/products/beer6.png',
      description: '限量版双倍干投IPA，投放了大量酒花，香味浓郁。',
      flavor: {
        aroma: '爆炸性的酒花香气',
        taste: '苦味与甜味交织',
        finish: '余韵悠长，酒花风味持久'
      },
      foodPairing: ['重口味食物', '炸鸡', '披萨'],
      stock: 10,
      specs: [
        { name: '330ml', price: 68, stock: 8 },
        { name: '1L', price: 158, stock: 2 }
      ]
    },
    {
      id: '007',
      name: '酿酒狗凌晨五点',
      nameEn: 'BrewDog 5am Saint',
      style: 'ipa',
      styleName: 'IPA',
      brewery: '酿酒狗',
      origin: '英国',
      abv: 5.0,
      ibu: 40,
      volume: '330ml',
      price: 35,
      originalPrice: 35,
      rating: 4.4,
      reviews: 298,
      image: '/images/products/beer7.png',
      description: '琥珀色艾尔，具有浓郁的麦芽味和适度的酒花苦味。',
      flavor: {
        aroma: '焦糖和坚果的香气',
        taste: '麦芽甜味与酒花苦味平衡',
        finish: '略带苦味的收尾'
      },
      foodPairing: ['炸鱼薯条', '烤肉', '三明治'],
      stock: 45,
      specs: [
        { name: '330ml', price: 35, stock: 30 },
        { name: '500ml', price: 48, stock: 15 }
      ]
    },
    {
      id: '008',
      name: '内华达山脉',
      nameEn: 'Sierra Nevada',
      style: 'lager',
      styleName: '拉格',
      brewery: '内华达山脉',
      origin: '美国加州',
      abv: 5.6,
      ibu: 37,
      volume: '355ml',
      price: 32,
      originalPrice: 32,
      rating: 4.5,
      reviews: 445,
      image: '/images/products/beer1.png',
      description: '经典美式淡色艾尔，开启了美国精酿啤酒革命。',
      flavor: {
        aroma: '柑橘和松木的经典香气',
        taste: '清爽易饮，苦度适中',
        finish: '干净利落'
      },
      foodPairing: ['墨西哥料理', '披萨', '汉堡'],
      stock: 80,
      specs: [
        { name: '355ml', price: 32, stock: 50 },
        { name: '1L', price: 68, stock: 30 }
      ]
    }
  ],

  // 会员等级
  vipLevels: [
    { id: 'vip1', name: 'VIP1', minScore: 0, maxScore: 1500, benefit: '无折扣', icon: '🍺' },
    { id: 'vip2', name: 'VIP2', minScore: 1500, maxScore: 3000, benefit: '专属券', icon: '🍻' },
    { id: 'vip3', name: 'VIP3', minScore: 3000, maxScore: 8888, benefit: '专属券', icon: '🥃' },
    { id: 'vip4', name: 'VIP4', minScore: 8888, maxScore: 99999, benefit: '专属券', icon: '👑' }
  ],

  // 测试用户信息
  userInfo: {
    avatar: '/images/avatar.png',
    nickname: '精酿爱好者',
    phone: '138****8888',
    vipLevel: 'vip2',
    vipName: 'VIP2',
    points: 2680,
    growthValue: 2680,
    memberId: 'DJ2026050001',
    nextLevelAmount: 320,
    nextVipName: 'VIP3'
  },

  // 测试订单数据
  orders: [
    {
      id: 'ORD20231015001',
      status: 'ready',
      statusText: '待取酒',
      createTime: '2023-10-15 14:30',
      totalPrice: 83,
      items: [
        { name: '迷失海岸', price: 38, quantity: 1, image: '/images/products/beer1.png' },
        { name: '督威', price: 45, quantity: 1, image: '/images/products/beer2.png' }
      ],
      pickupTime: '立即制作',
      pickupMethod: '到店自取'
    },
    {
      id: 'ORD20231014002',
      status: 'completed',
      statusText: '已完成',
      createTime: '2023-10-14 19:20',
      totalPrice: 58,
      items: [
        { name: '创始者早餐世涛', price: 58, quantity: 1, image: '/images/products/beer3.png' }
      ],
      pickupTime: '2023-10-14 19:45',
      pickupMethod: '到店自取'
    },
    {
      id: 'ORD20231013003',
      status: 'completed',
      statusText: '已完成',
      createTime: '2023-10-13 16:45',
      totalPrice: 70,
      items: [
        { name: '福佳白', price: 28, quantity: 1, image: '/images/products/beer4.png' },
        { name: '梦想之地酸IPA', price: 42, quantity: 1, image: '/images/products/beer5.png' }
      ],
      pickupTime: '2023-10-13 17:10',
      pickupMethod: '到店自取'
    },
    {
      id: 'ORD20231012004',
      status: 'pending',
      statusText: '待付款',
      createTime: '2023-10-12 20:15',
      totalPrice: 103,
      items: [
        { name: '另一半双倍干投', price: 68, quantity: 1, image: '/images/products/beer6.png' },
        { name: '内华达山脉', price: 32, quantity: 1, image: '/images/products/beer1.png' }
      ],
      pickupTime: '立即制作',
      pickupMethod: '到店自取'
    }
  ],

  // 门店信息
  storeInfo: {
    name: '精酿啤酒·社区小店',
    address: '朝阳区三里屯酒吧街28号',
    phone: '010-12345678',
    hours: '10:00 - 02:00'
  },

  // 积分兑换商品数据
  pointsProducts: [
    {
      id: 'p001',
      name: '330ml升级475ml券',
      type: '升级券',
      pointsCost: 1000,
      image: '/images/products/coupon_upgrade.svg', // 使用升杯券专用图标
      description: '可将您购买的330ml啤酒免费升级为475ml',
      exchangeNotes: [
        '积分兑换商品一经兑换成功，不予退回，请您确认后再兑换。',
        '本券自兑换起生效，有效期7天，过期后即失效，不延期或补发。',
        '本券不找零，不兑换现金，核销后即失效，不退换货，也不能与其他优惠同时使用'
      ]
    },
    {
      id: 'p002',
      name: '买二送一券',
      type: '赠送券',
      pointsCost: 2000,
      image: '/images/products/coupon_buy2get1.svg', // 使用买二送一券专用图标
      description: '购买任意两杯啤酒，免费赠送一杯',
      exchangeNotes: [
        '积分兑换商品一经兑换成功，不予退回，请您确认后再兑换。',
        '本券自兑换起生效，有效期7天，过期后即失效，不延期或补发。',
        '本券不找零，不兑换现金，核销后即失效，不退换货，也不能与其他优惠同时使用'
      ]
    }
  ],

  // 积分明细记录数据
  pointsRecords: [
    {
      id: 'pr001',
      type: 'earn',
      amount: 500,
      description: '充值获得',
      createTime: '2026-05-19 10:00:00'
    },
    {
      id: 'pr002',
      type: 'earn',
      amount: 38,
      description: '消费获得',
      createTime: '2026-05-18 15:30:00'
    },
    {
      id: 'pr003',
      type: 'spend',
      amount: 200,
      description: '兑换满100减20优惠券',
      createTime: '2026-05-17 12:00:00'
    },
    {
      id: 'pr004',
      type: 'earn',
      amount: 100,
      description: '签到获得',
      createTime: '2026-05-16 08:00:00'
    },
    {
      id: 'pr005',
      type: 'expire',
      amount: 50,
      description: '积分过期',
      createTime: '2026-05-15 23:59:59'
    },
    {
      id: 'pr006',
      type: 'earn',
      amount: 200,
      description: '评价获得',
      createTime: '2026-05-14 20:15:00'
    },
    {
      id: 'pr007',
      type: 'spend',
      amount: 150,
      description: '兑换新品折扣券',
      createTime: '2026-05-13 14:20:00'
    },
    {
      id: 'pr008',
      type: 'earn',
      amount: 1000,
      description: '首次充值奖励',
      createTime: '2026-05-10 09:00:00'
    }
  ]
}
