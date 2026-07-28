const image = (fileName) => `/vendor-original/image/${fileName}`;

export const COLORS = [
  {
    id: "sprout-yellow",
    name: "嫩芽黄",
    price: 20000,
    group: "定制车漆",
    premium: true,
    background: image("bfccb0b6c826d537_78805A221A988E79EF3F42D7C5BFD418_1758720728295.png"),
    foreground: image("1b6b6e7a5f603f0d_78805A221A988E79EF3F42D7C5BFD418_1758720660756.png"),
  },
  {
    id: "amethyst",
    name: "紫水晶",
    description: "双层清漆 五道打磨工序",
    price: 32000,
    group: "定制车漆",
    premium: true,
    background: image("fc7d07f515da9252_78805A221A988E79EF3F42D7C5BFD418_1758720728306.png"),
    foreground: image("683a8e042bfd1477_78805A221A988E79EF3F42D7C5BFD418_1758720660814.png"),
  },
  {
    id: "satin-pink",
    name: "流金粉 哑光",
    description: "磨砂雕塑般的质感",
    price: 28000,
    group: "定制车漆",
    premium: true,
    background: image("13ad185ae066437b_78805A221A988E79EF3F42D7C5BFD418_1758720732632.png"),
    foreground: image("257adc3677c06429_78805A221A988E79EF3F42D7C5BFD418_1758720660753.png"),
  },
  {
    id: "racing-red",
    name: "竞速红",
    description: "特制高饱和度红色清漆",
    price: 20000,
    group: "定制车漆",
    premium: true,
    background: image("0cbc16232a668c63_78805A221A988E79EF3F42D7C5BFD418_1758720728300.png"),
    foreground: image("8fd59cf01fc669ea_78805A221A988E79EF3F42D7C5BFD418_1758720660731.png"),
  },
  {
    id: "twilight-rose",
    name: "暮光玫瑰",
    price: 11000,
    group: "标准车漆",
    background: image("533bbe62d402be8a_78805A221A988E79EF3F42D7C5BFD418_1758720728358.png"),
    foreground: image("a069d2e528c40704_78805A221A988E79EF3F42D7C5BFD418_1758720660804.png"),
  },
  {
    id: "space-silver",
    name: "太空银",
    price: 9000,
    group: "标准车漆",
    background: image("73e88668b7079873_78805A221A988E79EF3F42D7C5BFD418_1758720728286.png"),
    foreground: image("f16b4ce85e2ed943_78805A221A988E79EF3F42D7C5BFD418_1758720660751.png"),
  },
  {
    id: "parrot-green",
    name: "鹦鹉绿",
    price: 9000,
    group: "标准车漆",
    background: image("d7399049bd8c1a24_78805A221A988E79EF3F42D7C5BFD418_1758720728319.png"),
    foreground: image("f56ee63d0a1fb8d7_78805A221A988E79EF3F42D7C5BFD418_1758720660771.png"),
  },
  {
    id: "obsidian-black",
    name: "曜石黑",
    price: 9000,
    group: "标准车漆",
    background: image("155d6c959084cfc7_78805A221A988E79EF3F42D7C5BFD418_1758720728304.png"),
    foreground: image("815337a881b87fd3_78805A221A988E79EF3F42D7C5BFD418_1758720660772.png"),
  },
  {
    id: "lightning-yellow",
    name: "闪电黄",
    price: 0,
    group: "标准车漆",
    background: image("553f1fc21c3ef3c7_78805A221A988E79EF3F42D7C5BFD418_1758720728252.png"),
    foreground: image("80106800c961e603_78805A221A988E79EF3F42D7C5BFD418_1758720694679.png"),
  },
  {
    id: "pearl-white",
    name: "珍珠白",
    price: 0,
    group: "标准车漆",
    background: image("9c757341de26ba80_78805A221A988E79EF3F42D7C5BFD418_1758720728316.png"),
    foreground: image("ff81f974910fdecc_78805A221A988E79EF3F42D7C5BFD418_1758720660776.png"),
  },
];

export const WHEELS = [
  {
    id: "forged-carbon",
    name: "21英寸五辐双层锻造轮毂 碳黑",
    price: 14000,
    group: "定制轮毂",
    premium: true,
    image: image("e4d2eba5b1950e9e_78805A221A988E79EF3F42D7C5BFD418_1758718882020.png"),
  },
  {
    id: "forged-gold",
    name: "21英寸五辐双层锻造轮毂 琥珀金",
    price: 14000,
    group: "定制轮毂",
    premium: true,
    image: image("4b0cf52d316e6daf_78805A221A988E79EF3F42D7C5BFD418_1758728729122.png"),
  },
  {
    id: "forged-mirror",
    name: "21英寸五辐双层锻造轮毂 镜面银",
    price: 14000,
    group: "定制轮毂",
    premium: true,
    image: image("e29fb514e099cef7_78805A221A988E79EF3F42D7C5BFD418_1758718961395.png"),
  },
  {
    id: "forged-moon",
    name: "21英寸五辐双层锻造轮毂 月岩银",
    price: 14000,
    group: "定制轮毂",
    premium: true,
    image: image("d9fcedf32533636e_78805A221A988E79EF3F42D7C5BFD418_1758718997294.png"),
  },
  {
    id: "u-graphite",
    name: "21英寸U型锻造轮毂 石墨黑",
    price: 10000,
    group: "标准轮毂",
    image: image("685d21e4062e76df_78805A221A988E79EF3F42D7C5BFD418_1758088730622.png"),
  },
  {
    id: "u-neodymium",
    name: "21英寸U型锻造轮毂 金属钕色",
    price: 10000,
    group: "标准轮毂",
    image: image("d511517bfb004f88_78805A221A988E79EF3F42D7C5BFD418_1758088751589.png"),
  },
  {
    id: "u-yellow-ring",
    name: "21英寸U型轮毂 黄轮廓圈",
    price: 1000,
    group: "标准轮毂",
    image: image("fe18d2481326d70d_78805A221A988E79EF3F42D7C5BFD418_1758088793950.png"),
  },
  {
    id: "u-standard",
    name: "21英寸U型轮毂",
    price: 0,
    group: "标准轮毂",
    image: image("2d1156762518b82b_78805A221A988E79EF3F42D7C5BFD418_1758088823391.png"),
  },
];

export const CALIPERS = [
  {
    id: "blue",
    name: "Akebono六活塞固定卡钳 蓝色",
    price: 1500,
    image: image("99bc94a314e51327_78805A221A988E79EF3F42D7C5BFD418_1758090123113.png"),
  },
  {
    id: "green",
    name: "Akebono六活塞固定卡钳 绿色",
    price: 1500,
    image: image("c1b2a279da86686a_78805A221A988E79EF3F42D7C5BFD418_1758090125177.png"),
  },
  {
    id: "red",
    name: "Akebono六活塞固定卡钳 红色",
    price: 1500,
    image: image("461cfefbd2dfb58a_78805A221A988E79EF3F42D7C5BFD418_1758090126928.png"),
  },
  {
    id: "yellow",
    name: "Akebono六活塞固定卡钳 黄色",
    price: 0,
    image: image("a754ee14b760cf12_78805A221A988E79EF3F42D7C5BFD418_1758090128307.png"),
  },
];

export const INTERIORS = [
  {
    id: "moon-grey",
    name: "月影灰（灰黑黄 三色）",
    description: "Alcantara®座椅材质",
    subline: "七针同步绗缝，1862针专属刺绣",
    price: 15000,
    group: "定制内饰套装",
    premium: true,
    image: image("c4e970214e0e16ea_78805A221A988E79EF3F42D7C5BFD418_1758720927770.png"),
  },
  {
    id: "black-blue",
    name: "极夜黑/冰河蓝 双色",
    description: "Alcantara®座椅材质",
    subline: "七针同步绗缝，1862针专属刺绣",
    price: 15000,
    group: "定制内饰套装",
    premium: true,
    image: image("93bb68f83d17f8dd_78805A221A988E79EF3F42D7C5BFD418_1758720932251.png"),
  },
  {
    id: "black-yellow",
    name: "黑黄 双色",
    price: 3000,
    group: "标准内饰套装",
    image: image("30e69338d13b8b04_78805A221A988E79EF3F42D7C5BFD418_1758720935728.png"),
  },
  {
    id: "black-red",
    name: "黑红 双色",
    price: 3000,
    group: "标准内饰套装",
    image: image("c752cf58f69d0bad_78805A221A988E79EF3F42D7C5BFD418_1758720939360.png"),
  },
  {
    id: "bright-yellow",
    name: "明黄（黄黑 双色）",
    price: 0,
    group: "标准内饰套装",
    image: image("ec4a4039bbe4e2e0_78805A221A988E79EF3F42D7C5BFD418_1758720942398.png"),
  },
];

export const BODY_SECTIONS = [
  {
    title: "前舱盖",
    items: [
      {
        id: "carbon-hood",
        name: "碳纤维双风道前舱盖 碳纤维原色",
        price: 42000,
        premium: true,
        image: image("8f3f6ceac6a2830f_C16D4A69221C6E959C1E103D45626E2A_1758804849861.jpg"),
      },
      {
        id: "standard-hood",
        name: "标准前舱盖",
        price: 0,
        selected: true,
        image: image("52f00c050ef04eb1_041B369C15C5048475DAA4FE5F4C6742_1758804912490.jpg"),
      },
    ],
  },
  {
    title: "拉花",
    items: [
      {
        id: "stripe-blue",
        name: "经典闪电拉花 蓝",
        price: 2000,
        premium: true,
        image: image("d00b2a63be07c1ab_78805A221A988E79EF3F42D7C5BFD418_1758721129945.jpg"),
      },
      {
        id: "stripe-yellow",
        name: "经典闪电拉花 黄",
        price: 2000,
        premium: true,
        image: image("f4953626b4079b56_78805A221A988E79EF3F42D7C5BFD418_1758721146416.jpg"),
      },
      {
        id: "stripe-black",
        name: "经典闪电拉花 黑",
        price: 2000,
        premium: true,
        image: image("1b8952374d072ecd_78805A221A988E79EF3F42D7C5BFD418_1758090880403.jpg"),
      },
      {
        id: "no-stripe",
        name: "无拉花",
        price: 0,
        selected: true,
        image: image("5d747a8a6844a7dd_78805A221A988E79EF3F42D7C5BFD418_1758090882086.jpg"),
      },
    ],
  },
  {
    title: "徽标",
    items: [
      {
        id: "white-ceramic",
        name: "24K金 白陶瓷车标",
        description: "陶瓷与24K金的碰撞艺术",
        price: 2000,
        premium: true,
        image: image("8d4fafcaabb5d845_custom-logo.png"),
      },
      {
        id: "black-ceramic",
        name: "24K金 黑陶瓷车标",
        description: "陶瓷与24K金的碰撞艺术",
        price: 2000,
        premium: true,
        image: image("47c0bdad958ef317_98CAFCE82B641D365DF172063E7FC31A_1779178154535.png"),
      },
      {
        id: "carbon-badge",
        name: "24K金 碳纤维车标",
        price: 0,
        selected: true,
        image: image("8d4fafcaabb5d845_custom-logo.png"),
      },
    ],
  },
  {
    title: "尾翼",
    items: [
      {
        id: "electric-spoiler",
        name: "电动尾翼",
        price: 0,
        selected: true,
        image: image("77860591bdf4b607_78805A221A988E79EF3F42D7C5BFD418_1758719134881.jpg"),
      },
      {
        id: "carbon-spoiler",
        name: "碳纤维尾翼 3挡可调版",
        description: "专业级空气动力学性能，整车最大下压力176kg",
        price: 12000,
        image: image("aba99a7f44a3919d_78805A221A988E79EF3F42D7C5BFD418_1758721047159.jpg"),
      },
    ],
  },
];

export const INTERIOR_OPTIONS = [
  {
    id: "fridge",
    name: "车载智能冰箱",
    price: 2000,
    image: image("d7f68509ea2dbaf1_78805A221A988E79EF3F42D7C5BFD418_1758720882131.jpg"),
  },
  {
    id: "carbon-interior",
    name: "碳纤维内饰套装",
    price: 9000,
    image: image("a76aaf0cd11db71f_9EECBC54381E78FE2CA473698ACA050D_1758767393699.jpg"),
  },
  {
    id: "seat-back",
    name: "碳纤维前排座椅背板",
    price: 10000,
    included: true,
    image: image("d7f68509ea2dbaf1_78805A221A988E79EF3F42D7C5BFD418_1758720882131.jpg"),
  },
  {
    id: "steering-wheel",
    name: "碳纤维运动方向盘",
    price: 6000,
    included: true,
    image: image("c8def760e3229aef_78805A221A988E79EF3F42D7C5BFD418_1758720801839.jpg"),
  },
];

export const INTERIOR_STAGE = image(
  "d7f68509ea2dbaf1_78805A221A988E79EF3F42D7C5BFD418_1758720882131.jpg",
);

export const LOGO = image(
  "47c0bdad958ef317_98CAFCE82B641D365DF172063E7FC31A_1779178154535.png",
);

export const MI_LOGO = image("mi-logo.png");

export const ICONS = {
  reset: image("b7b9b7b487237b45_reset.svg"),
  door: image("512a529a67635124_openDoor.svg"),
  view: image("47289c7cb878ae01_viewCollapse.svg"),
  fullscreen: image("018ccdded3ca5080_fullscreen-expand.svg"),
  arrow: image("a3b248027b9b2693_arrow.svg"),
};
