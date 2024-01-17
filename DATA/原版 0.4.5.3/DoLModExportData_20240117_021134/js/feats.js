
/*
	Key points
	series: "seriesName", //Will only show the first locked feat in a series to the player
	softLockable: true, //Will disable the unlocking of the feat if softmode is enabled
	pregnancyLockable: true, //Will disable the unlocking of the feat if certain pregnancy settings are too low
	hidden: true, //Will hide the feat at all times unless unlocked, best for feats for unreleased content
*/
setup.feats = {
	"Pocket Change": {
		title: "第一桶金",
		desc: "持有£1,000",
		difficulty: 1,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Money Maker": {
		title: "生财有道",
		desc: "持有£10,000",
		difficulty: 1,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	Tycoon: {
		title: "财富大亨",
		desc: "持有£100,000",
		difficulty: 2,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	Millionaire: {
		title: "百万富翁",
		desc: "持有£1,000,000",
		difficulty: 3,
		series: "money",
		filter: ["All", "General"],
		softLockable: true,
	},
	"It Belongs in a Museum": {
		title: "它属于博物馆！",
		desc: "找到所有文物",
		difficulty: 3,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Fully Covered": {
		title: "淫装素裹",
		desc: "被水之外的某些东西完全浸透",
		difficulty: 3,
		series: "",
		filter: ["All", "General"],
	},
	"Being a Boy": {
		title: "我是个男孩",
		desc: "作为男性，到达第 50 天",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Being a Girl": {
		title: "我是个女孩",
		desc: "作为女性，到达第 50 天",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Being a Hermaphrodite": {
		title: "我是个扶他",
		desc: "作为双性，到达第 50 天",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Being an Orphan": {
		title: "小镇孤儿",
		desc: "到达第 150 天",
		difficulty: 2,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Stressful Challenge": {
		title: "放松心态",
		desc: "在未曾昏倒的情况下度过第 50 天",
		difficulty: 2,
		series: "challenge",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Long Stressful Challenge": {
		title: "心如止水",
		desc: "在未曾昏倒的情况下度过第 150 天",
		difficulty: 3,
		series: "challenge",
		filter: ["All", "General"],
		softLockable: true,
	},
	Billboard: {
		title: "广告板",
		desc: "在身上写条广告并借此盈利",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
	},
	"A Living Canvas": {
		title: "行走的画布",
		desc: "全身上下都被写满",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
	},
	Farmhand: {
		title: "农场帮手",
		desc: "帮艾利克斯扩张农场",
		difficulty: 2,
		series: "alex",
		filter: ["All", "General"],
	},
	Farmer: {
		title: "农场主",
		desc: "让农场恢复往日辉煌",
		difficulty: 3,
		series: "alex",
		filter: ["All", "General"],
	},
	Cultivator: {
		title: "农场大亨",
		desc: "开垦艾利克斯农场的每一块地",
		difficulty: 3,
		series: "alex",
		filter: ["All", "General"],
	},
	"The Rival Farm": {
		title: "金牌农场",
		desc: "完全升级农场的一个设施",
		difficulty: 2,
		series: "farm",
		filter: ["All", "General"],
	},
	"The Rival Estate": {
		title: "金牌庄园",
		desc: "完全升级农场的所有设施",
		difficulty: 3,
		series: "farm",
		filter: ["All", "General"],
	},
	"Heroic Victory": {
		title: "史诗大捷",
		desc: "在雷米的攻势下守住全部九块田地",
		difficulty: 3,
		series: "",
		filter: ["All", "General"],
	},
	"Five in a Row": {
		title: "赌怪",
		desc: "在21点游戏中连胜五场",
		difficulty: 1,
		series: "",
		filter: ["All", "General"],
	},
	Distinction: {
		title: "拔得头筹",
		desc: "在学校考试中获得1次优秀",
		difficulty: 1,
		series: "distinction",
		filter: ["All", "General"],
	},
	Distinctive: {
		title: "出类拔萃",
		desc: "在学校考试中获得5次优秀",
		difficulty: 2,
		series: "distinction",
		filter: ["All", "General"],
	},
	Distinguished: {
		title: "卓尔不群",
		desc: "在学校考试中获得15次优秀",
		difficulty: 3,
		series: "distinction",
		filter: ["All", "General"],
	},
	"Science Fair Winner": {
		title: "科学竞赛赢家",
		desc: "用科学闪瞎大家",
		difficulty: 2,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Maths Competition Winner": {
		title: "数学竞赛冠军",
		desc: "光明正大，抑或不择手段",
		difficulty: 2,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Rich Hearts": {
		title: "圣诞节，圣之心",
		desc: "你的演出惊为天人",
		difficulty: 2,
		series: "",
		filter: ["All", "General"],
		softLockable: true,
	},
	"Most Aware": {
		title: "凝视深渊",
		desc: "你已触及常人难至之境",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	"Most Innocent": {
		title: "天真无邪",
		desc: "一切都很好",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	"No More Control": {
		title: "失控",
		desc: "你已经淫荡到不能再淫荡了！",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	Thief: {
		title: "神偷",
		desc: "你深谙窃贼之道",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"May I have this Dance?": {
		title: "可与你共舞一曲？",
		desc: "没人能抵挡你的舞步",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Aquanaut: {
		title: "波塞冬",
		desc: "致所有的寻宝者",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Seductress: {
		title: "魅魔",
		desc: "没人能拒绝你的诱惑",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	"Green Fingered": {
		title: "园艺大师",
		desc: "鲜花在膝间盛开",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Majordomo: {
		title: "高级总管",
		desc: "任何污渍都逃不过你的目光",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Swift: {
		title: "风驰电掣",
		desc: "迅捷如风",
		difficulty: 1,
		series: "",
		filter: ["All", "Stats"],
	},
	Alluring: {
		title: "诱人尤物",
		desc: "吸引他人的目光是如此简单",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
		softLockable: true,
	},
	"Sex Specialist": {
		title: "性爱专家",
		desc: "有没有考虑过去应聘动作片？",
		difficulty: 3,
		series: "",
		filter: ["All", "Stats"],
	},
	"Perfect Record": {
		title: "完美成绩",
		desc: "没有什么是你学不明白的",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"Perfect Sub": {
		title: "温顺的绵羊",
		desc: "达到屈服的极致",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"Defying the Odds": {
		title: "绝境反击",
		desc: "达到反抗的极致",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	Hawker: {
		title: "小贩",
		desc: "自己动手，丰衣足食",
		difficulty: 1,
		series: "market",
		filter: ["All", "Stats"],
	},
	Vendor: {
		title: "摊主",
		desc: "你证明了你的销售能力",
		difficulty: 2,
		series: "market",
		filter: ["All", "Stats"],
	},
	Merchant: {
		title: "大商人",
		desc: "支配整个市场",
		difficulty: 2,
		series: "market",
		filter: ["All", "Stats"],
	},
	"Twisted Desire": {
		title: "扭曲的欲望",
		desc: "疼痛并不一定意味着痛苦……也可能是愉悦",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	"Served Hot": {
		title: "残酷施虐者",
		desc: "用铜头皮带把他们抽得如陀螺般旋转！",
		difficulty: 2,
		series: "",
		filter: ["All", "Stats"],
	},
	Sadomasochist: {
		title: "施虐受虐狂",
		desc: "祈求我，鞭打我，用力改变我啊！",
		difficulty: 3,
		series: "",
		filter: ["All", "Stats"],
	},
	"Shining Reputation": {
		title: "辉煌的声誉",
		desc: "声名远扬，但只有好的那面",
		difficulty: 3,
		series: "",
		filter: ["All", "Stats"],
	},
	"Social Butterfly": {
		title: "交际花",
		desc: "你是众人关注的焦点",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Anti-Social Moth": {
		title: "不合群的飞蛾",
		desc: "谁需要朋友？",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Teachers Pet": {
		title: "老师的宠儿",
		desc: "小红花贴都贴不下",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Teachers Nightmare": {
		title: "老师的噩梦",
		desc: "你是个恐怖分子！",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Robin the Lover": {
		title: "恋人罗宾",
		desc: "把你的第一次交给对方",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Robin's Song": {
		title: "罗宾的最终归属",
		desc: "帮助罗宾适应异装",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Whitney the Tsundere": {
		title: "恶霸惠特尼",
		desc: "把你的第一次交给对方",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Delinquent Antics": {
		title: "违纪？上课！",
		desc: "让惠特尼在课堂上高潮",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Giddy Up": {
		title: "这就是飞一般的感觉",
		desc: "惠特尼也有今天",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Kylar the Obsessed": {
		title: "病娇凯拉尔",
		desc: "把你的第一次交给对方",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Eden the Lonely": {
		title: "孤独的伊甸",
		desc: "把你的第一次交给对方",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Avery the Moneybags": {
		title: "ATM机艾弗里",
		desc: "把你的第一次交给对方",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Leighton the Shady": {
		title: "阴暗的礼顿",
		desc: "把你的第一次交给对方",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Alex the Robust": {
		title: "农场主艾利克斯",
		desc: "把你的第一次交给对方",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Great Hawk the Terror": {
		title: "恐怖的巨鹰",
		desc: "你将成为一个优秀的伴侣",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Wren the Sly": {
		title: "狡猾的伦恩",
		desc: "把你的第一次交给对方",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Great Wolf the Alpha": {
		title: "首领黑狼",
		desc: "把你的第一次交给对方",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Sydney the Pure Hearted": {
		title: "纯净的悉尼",
		desc: "这孩子将自己的贞操献给了你",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Harper the Hypnotist": {
		title: "催眠师哈珀",
		desc: "把你的第一次交给对方",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Morgan the Lost": {
		title: "迷失的摩根",
		desc: "把你的第一次交给对方",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Love Triangles": {
		title: "左拥右抱",
		desc: "你不知道该选择谁",
		difficulty: 2,
		series: "love triangles",
		filter: ["All", "Social"],
	},
	"Love Trapezoids": {
		title: "后宫之主",
		desc: "三个对你来说还不够",
		difficulty: 3,
		series: "love triangles",
		filter: ["All", "Social"],
	},
	"Ballroom Show-off": {
		title: "Slay全场",
		desc: "与艾弗里一起赢得跳舞比赛",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Under the Table": {
		title: "烂醉如泥",
		desc: "在饮酒比赛中证明你的勇气",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Pub Crawl Victors": {
		title: "酒吧巡游冠军",
		desc: "赢得了与同事的比赛",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"Mason's Secret": {
		title: "梅森的秘密",
		desc: "说服梅森分享一些其不愿分享之事",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Mason's Shame": {
		title: "梅森的耻辱",
		desc: "让梅森在储物柜里达到高潮",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"Animal Tender": {
		title: "万兽之王",
		desc: "赢得艾利克斯农场所有动物的尊重",
		difficulty: 2,
		series: "",
		filter: ["All", "Social"],
	},
	"I Spy": {
		title: "锁孔看人",
		desc: "偷看艾利克斯洗澡",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"First Kiss": {
		title: "甜蜜初吻",
		desc: "把初吻送给一位爱情对象",
		difficulty: 1,
		series: "",
		filter: ["All", "Social"],
	},
	"A Crime Most Foul": {
		title: "罪不容赦",
		desc: "一朝不还书，终生留耻辱",
		difficulty: 2,
		series: "",
		hint: "提示: 将涂鸦惩罚永远留下",
		filter: ["All", "Social"],
	},
	Longing: {
		title: "渴望",
		desc: "逃离凯拉尔的洋馆",
		difficulty: 3,
		series: "",
		hint: "提示: 平息凯拉尔的疯狂",
		filter: ["All", "Social"],
	},
	"Pagan Rite": {
		title: "异教仪式",
		desc: "了解凯拉尔的父母",
		difficulty: 1,
		series: "",
		hint: "提示: 凯拉尔家似乎有着什么秘密",
		filter: ["All", "Social"],
	},
	Neko: {
		title: "精喵绝伦",
		desc: "呼噜呼噜小猫咪",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Wolf: {
		title: "月下长啸",
		desc: "成为狼群的一员",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Cattle: {
		title: "惹毛公牛……",
		desc: "做好被榨汁的准备",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Harpy: {
		title: "鹰击长空",
		desc: "投下巨大的阴影",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Fox: {
		title: "你个狐狸精",
		desc: "狡猾的小家伙",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Angel: {
		title: "如天使般降临",
		desc: "小心不要堕落",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	"Fallen Angel": {
		title: "堕落，坠落，直至地狱……",
		desc: "玷污，如此残酷",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	Demon: {
		title: "恶魔降世",
		desc: "淫乱的本源",
		difficulty: 1,
		series: "",
		filter: ["All", "Transformation"],
	},
	"A Special Trait": {
		title: "一个特殊的特质",
		desc: "获得一个特殊的特质",
		difficulty: 2,
		series: "special trait",
		hint: "提示: 特殊的存在",
		filter: ["All", "Special"],
	},
	"A Special Trait Collector": {
		title: "特质收藏家",
		desc: "获得所有特殊特质",
		difficulty: 3,
		hint: "提示: 更多特殊的存在",
		series: "special trait",
		filter: ["All", "Special"],
	},
	"Broodmother Host": {
		title: "宿主",
		desc: "孕育了数不尽的小动物",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "提示: 生下的东西",
	},
	"Top Broodmother Host": {
		title: "我即是虫群",
		desc: "一个完美的寄生物宿主",
		difficulty: 3,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "提示: 生下一些令人惊奇的东西",
	},
	"Broodmother Zoologist": {
		title: "小动物学家",
		desc: "所有的寄生物一眼便知",
		difficulty: 3,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "提示: 生下所有的东西并详细记录",
	},
	"Miracle of Life": {
		title: "生命的奇迹",
		desc: "生下你的第一个孩子",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		pregnancyLockable: true,
	},
	"First Fatherhood": {
		title: "初为人父",
		desc: "成为首个孩子的父亲",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
	},
	"Hail Mary": {
		title: "万福玛利亚",
		desc: "以处女之身分娩",
		difficulty: 4,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "提示: 获得一些东西，但不以别人的东西为代价",
		pregnancyLockable: true,
		pregnancySillyLockable: true,
	},
	"Bicycle Mother": {
		title: "我的母亲是公车",
		desc: "在不知道孩子父亲是谁的情况下分娩",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "提示: 你知道是谁干的吗？",
	},
	"Life Comes in Threes": {
		title: "三个愿望，一次满足",
		desc: "生下三胞胎",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "提示: 一口气三个",
		pregnancyLockable: true,
	},
	"Life begins when you least expect": {
		title: "生命会在你最意想不到的时候降临",
		desc: "以男性身份生下孩子",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "提示: 帮忙创造出不该存在的魔法",
	},
	"Diversity of Life": {
		title: "生物多样性",
		desc: "一口气生下不同物种的孩子",
		difficulty: 4,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "提示: 生物有着多样性的存在和诞生",
		pregnancyLockable: true,
	},
	/* "Broken Dam":{ //Not in the code right now
		title: "溃坝",
		desc: "因避孕套破损而怀孕",
		difficulty: 2,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "提示："
	}, */
	/* "Seed Spreader":{  ToDo: Pregnancy: uncomment once you can impregnate more that 3 named npc's
		title: "种马",
		desc: "在一天内让三个NPC怀孕",
		difficulty: 1,
		series: "",
		filter: ["All", "Pregnancy"],
		hint: "提示："
	}, */
	"Producer of Lewd Fluids": {
		title: "淫秽液体供应商",
		desc: "让这些触手知道谁才是老大",
		difficulty: 1,
		series: "lewd fluids",
		filter: ["All", "Special"],
		hint: "提示: 触手嫉妒着你",
	},
	"Literally Buckets": {
		title: "呃，你跟水桶没差了",
		desc: "你是触手之神",
		difficulty: 2,
		series: "lewd fluids",
		filter: ["All", "Special"],
		hint: "提示: 一个装满了[数据删除]的浴缸",
	},
	"Feeling Full": {
		title: "如此充实",
		desc: "充满了淫秽液体",
		difficulty: 1,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 饱餐一顿",
	},
	"Head Chief": {
		title: "厨师长",
		desc: "人们就是喜欢你的面包",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 该给食物加点料了",
	},
	"Locked In Gold": {
		title: "八门金锁",
		desc: "但不能让你免受挫折",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 裆部挂金",
	},
	"Bailey's Trouble Maker": {
		title: "贝利的克星",
		desc: "让其高潮",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 连贝利都曾拜倒在你的身下",
	},
	"Leighton's Nightmare": {
		title: "礼顿的噩梦",
		desc: "让其高潮",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 连礼顿都曾跪倒在你脚下",
	},
	"Alex's Partner": {
		title: "艾利克斯的合伙人",
		desc: "让其高潮",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 在田野上欢乐放纵一下",
	},
	"Harper's Bane": {
		title: "哈珀的祸源",
		desc: "让哈珀喝下血清",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 是时候该让那家伙尝尝自己药的味道了",
	},
	Laughingstock: {
		title: "笑柄",
		desc: "把某个人送上颈手枷",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 你在历史课体验过，现在该让其他人也体验一下了",
	},
	"You're the Laughingstock": {
		title: "你才是笑柄",
		desc: "被送上颈手枷",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 你在历史课看到过，但这次是真的",
	},
	"The Endless Deep": {
		title: "海的那边是什么",
		desc: "一直游到海水变蓝",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 前往世界的边缘",
	},
	"Wet and Ruined": {
		title: "这里又湿又破旧",
		desc: "发现废墟上的城堡",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 在泥沼中迷失",
	},
	"Head of the Pack": {
		title: "族群首领",
		desc: "成为狼群的首领。",
		difficulty: 2,
		series: "wolves",
		filter: ["All", "Special"],
		hint: "提示: 我将带领你们！",
	},
	"Top of the Food Chain": {
		title: "登顶食物链",
		desc: "连贝爷都望尘莫及",
		difficulty: 2,
		series: "wolves",
		filter: ["All", "Special"],
		hint: "提示：证明你的领导地位",
	},
	"Illicit Science": {
		title: "黑科技",
		desc: "发现麋鹿街大院",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 三好公民可不知道……但你不是",
	},
	"Mouth Sealed Shut": {
		title: "噤声",
		desc: "撑过审讯",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 不要泄密",
	},
	"Neck Deep": {
		title: "仰头才能呼吸",
		desc: "抵抗住催情剂的效力。",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 在愉悦中被吞噬",
	},
	Seedy: {
		title: "种子收集者",
		desc: "种子虽小，却也逃不过你的双眼",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 收获大自然的奥秘",
		softLockable: true,
	},
	"Pride of the Farm": {
		title: "农场的骄傲",
		desc: "货真价实的榨汁机",
		difficulty: 2,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 产量冠军",
	},
	"Dawn to Dusk": {
		title: "从黎明到黄昏",
		desc: "在农场工作一整天",
		difficulty: 1,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 勤劳的劳作者",
	},
	"Runaway Cattle": {
		title: "牛牛快跑",
		desc: "从雷米的牧场逃脱",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 你也不想再被烙上什么吧",
		softLockable: true,
	},
	"Equine Rescue": {
		title: "友谊是魔法！",
		desc: "谢谢你，苹果杰克！",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 也许在你昏倒时，你的苹果杰克会来救你",
	},
	"A Thunderous Response": {
		title: "我讨厌奶油",
		desc: "在商业街引起一场骚乱",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 奶油总有消失的那一刻",
	},
	"A Lewd Adventure": {
		title: "行为艺术",
		desc: "在镇里享受衣不蔽体的自由",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 不是什么环保游行，单纯只是自我乐趣",
		softLockable: true,
	},
	"Sour Dealing": {
		title: "苦涩的交易",
		desc: "从一个团伙中被解救",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 结识一些不怀好意的朋友",
		softLockable: true,
	},
	"Rear Passenger": {
		title: "嘿！看着点路",
		desc: "差点毁了一辆车",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 违反道路安全法规",
	},
	"Cornered Rogue": {
		title: "讨厌的小流氓",
		desc: "从一只调皮的狐狸手中夺回了你的衣服",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 打败调皮的野生小流氓",
		softLockable: true,
	},
	"Pain Rider": {
		title: "痛苦骑士",
		desc: "为温特完成三角马的演示",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 骑着三角马完成任务",
		softLockable: true,
	},
	Submerged: {
		title: "被水淹没，不知所措",
		desc: "为温特完成浸水椅的演示",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 在博物馆里被水淹没",
		softLockable: true,
	},
	"Farm Protector": {
		title: "这个农场，我罩着呢",
		desc: "从对手的暴徒手中捍卫田地",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 闯入者会受到应有的结局",
		softLockable: true,
	},
	"A Knot to Remember": {
		title: "真·推土机",
		desc: "在田里做不可描述之事",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 一个最离经叛道的展示",
	},
	"Wrong Size": {
		title: "这不是我的衣服！",
		desc: "交换男孩和女孩们的衣服",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 喜欢异性的人不一定喜欢异性的衣服",
	},
	"Idle Hands": {
		title: "魔手",
		desc: "在担任按摩师时，从你的客户那赚点外快",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 熟练的双手有很多其他用途",
	},
	"Stolen Technology": {
		title: "出毛病了就拍一拍",
		desc: "修理妓院的性爱机器",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 布莱尔为每个人提供了一些服务",
		softLockable: true,
	},
	Spelunking: {
		title: "洞穴探险",
		desc: "在海滩附近找到古老的走私者洞穴",
		difficulty: 1,
		series: "beach cave",
		filter: ["All", "Discoveries"],
		hint: "提示: 找到走私者的古老路线",
		softLockable: true,
	},
	"X Marks the Spot": {
		title: "宝藏的标记点",
		desc: "在走私者的洞穴中找到一张藏宝图",
		difficulty: 2,
		series: "beach cave",
		filter: ["All", "Discoveries"],
		hint: "提示: 在隐蔽的深处",
		softLockable: true,
	},
	"Buried Treasure": {
		title: "埋藏的宝藏",
		desc: "藏宝图不会骗人",
		difficulty: 3,
		series: "beach cave",
		filter: ["All", "Discoveries"],
		hint: "提示: 跟着地图走",
		softLockable: true,
	},
	"Abnormal Mollusc": {
		title: "这是……蛞蝓？",
		desc: "逃出大鼻涕虫的魔爪",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 洞穴里最早的原住民",
		softLockable: true,
	},
	Leverage: {
		title: "金蝉脱壳",
		desc: "安然无恙地离开走私犯的巢穴",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 无视那些混蛋",
		softLockable: true,
	},
	Flurry: {
		title: "麻烦终结者1000",
		desc: "捍卫罗宾的摊位",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示：赢得一场雪球大战",
	},
	"Under the Ice": {
		title: "冰层下的世界",
		desc: "逃出冰湖",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 挣脱束缚",
		softLockable: true,
	},
	"A Festive Home": {
		title: "真的有圣诞老人耶",
		desc: "向孤儿们赠送礼物",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 为孤儿们带来寒冬中的欢乐",
	},
	"In Red Light": {
		title: "红光之下",
		desc: "收获野生血柠",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 奇怪光下奇怪果",
		softLockable: true,
	},
	"Oh Bother": {
		title: "我爱蜂蜜，讨厌蜜蜂",
		desc: "收获野生蜂巢",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 甜的粘牙",
		softLockable: true,
	},
	"Employee Benefits": {
		title: "员工福利",
		desc: "在夜里偷走黄金",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 在这工作居然还有金子拿",
		softLockable: true,
	},
	"Not Like the Movies": {
		title: "电影可不是这么演的！",
		desc: "掌握了流沙的相关知识",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 沉没的荒原智慧",
		softLockable: true,
	},
	Slippery: {
		title: "你们都抓不到我",
		desc: "逃离雷米的手下",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 逃离雷米的手下",
		softLockable: true,
	},
	"High Reflection": {
		title: "顶层的倒映",
		desc: "现在你终于能看清这个世界了",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 盲目和毁灭",
		softLockable: true,
	},
	Schism: {
		title: "分裂",
		desc: "见证了一段被掩埋的历史",
		difficulty: 3,
		series: "",
		hint: "提示: 不曾诞生的女王身在何方？",
		filter: ["All", "Discoveries"],
		softLockable: true,
	},
	"Catch the Wind": {
		title: "捕风捉影",
		desc: "始终向往着天空",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 学会飞翔",
		softLockable: true,
	},
	"Trading Dignity": {
		title: "那么，代价是什么呢",
		desc: "用嘴满足了雷米的一帮手下",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 口口口！",
		softLockable: true,
	},
	"Playing with Fire": {
		title: "芳心纵火犯",
		desc: "让伦恩先高潮",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 忍受赌徒的要求",
		softLockable: true,
	},
	Firestarter: {
		title: "纵火犯",
		desc: "说服伦恩点火",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 山上一把火，雷米逃厕所",
		softLockable: true,
	},
	Dealing: {
		title: "肮脏的交易",
		desc: "把产品卖给一家无良企业",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 出售艾利克斯的奇特产品",
		softLockable: true,
	},
	"To Watch the Fields": {
		title: "麦田里的守望者",
		desc: "为你的农场雇用安保人员",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 找个帮手",
		softLockable: true,
	},
	"Reliable Employer": {
		title: "SR→SSR",
		desc: "雇佣了一名S级的守卫",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 让你的雇工小宇宙爆发！",
		softLockable: true,
	},
	"Into the Sunset": {
		title: "荒野大镖客",
		desc: "骑马击退雷米的手下",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 大表哥，但是dol",
		softLockable: true,
	},
	"Bent Copper": {
		title: "三好市民",
		desc: "扫黑除恶",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 在做社区服务时也别忘记当一个好人",
		softLockable: true,
	},
	"Social Contract": {
		title: "唉，该死的社会实习",
		desc: "完成一次社会服务",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 只不过就是捡捡垃圾",
		softLockable: true,
	},
	Institutionalised: {
		title: "肖申克并没有救赎",
		desc: "老老实实地服刑",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 成为安迪太困难了，还是不当了",
		softLockable: true,
	},
	Breaker: {
		title: "我没有网瘾！",
		desc: "破坏监狱里的电击项圈",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 你不是网瘾少年！",
		softLockable: true,
	},
	"Time and Pressure": {
		title: "救赎之道，就在其中",
		desc: "在海报后面挖一个洞并逃出生天",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "在我们心里，有一块地方是无法锁住的，那块地方叫做希望",
		softLockable: true,
	},
	"More than a Number": {
		title: "江湖朋友",
		desc: "在监狱里得知所有人的名字",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 这里全都是人才，说话又好听",
		softLockable: true,
	},
	"Friends in the Sky": {
		title: "来自天空的朋友",
		desc: "与观察者成为朋友",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 找回失去的东西",
		softLockable: true,
	},
	"Not Meant to be Caged": {
		title: "有些鸟儿是关不住的",
		desc: "成功越狱",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 自己给自己减刑",
		softLockable: true,
	},
	"Slip Through the Backdoor": {
		title: "是时候该溜了",
		desc: "抹除贝利处的名单并逃避惩罚",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示:完成任务，侥幸逃脱",
	},
	"Life of the Party": {
		title: "聚会生活",
		desc: "用你的舞步给聚会留下深刻印象",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 给查里的朋友留下深刻印象",
		softLockable: true,
	},
	"Belle of the Ball": {
		title: "舞会天王",
		desc: "所有的聚光灯都照耀着你",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 给那些上层社会留下个深刻印象",
		softLockable: true,
	},
	"Breaking the Stone": {
		title: "破坏仪式",
		desc: "打破多瑙河街庄园下的仪式",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 用舞蹈来进入一处神秘的地方，然后破坏仪式",
		softLockable: true,
	},
	"Pound Alpha": {
		title: "领头狗",
		desc: "在流浪狗收留所获得最高声望",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 让流浪狗们知道谁是老大",
		softLockable: true,
	},
	"Pound Runt": {
		title: "犬下犬",
		desc: "在流浪狗收留所获得最低声望",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 是个狗都能骑你",
		softLockable: true,
	},
	"Pounded Pound": {
		title: "我讨厌这里",
		desc: "将流浪狗收留所的事情告知贝利",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 看起来流浪狗收留所并不是想象中的那么简单",
		softLockable: true,
	},
	"Pound Liberator": {
		title: "狗狗解放者",
		desc: "救下黑狗",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 帮助一个特殊的囚犯逃出生天",
		softLockable: true,
	},
	"The Value of Pain": {
		title: "良心发现",
		desc: "在夜间狩猎时救下一个孤儿",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 恶魔也会做好事",
		softLockable: true,
	},
	"Free Booze": {
		title: "免费续杯",
		desc: "喝下所有酒并抵御强奸",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 在荒原喝一大堆酒",
		softLockable: true,
	},
	"Bewitching Echoes": {
		title: "欢迎来到地狱",
		desc: "让你的观众陷入疯狂",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 用恶魔最喜欢的方式来为一场表演收尾",
		softLockable: true,
	},
	"Dark Delvings": {
		title: "黑暗科技",
		desc: "取回白色水晶",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 闯入一处古老的遗迹",
		softLockable: true,
	},
	"Lurker Beyond": {
		title: "驱魔师",
		desc: "击败触手森林中的潜伏者",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 击溃那些来自异世界的生物",
		softLockable: true,
	},
	"Down Below": {
		title: "暗无天日",
		desc: "从矿坑中逃出来",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 这里只有鞭子和苦工，是时候跑路了",
		softLockable: true,
	},
	"Bridging the Past": {
		title: "重建过往",
		desc: "修复旧运河上的桥",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 修一座桥",
		softLockable: true,
	},
	"Safe Trail": {
		title: "安全通道",
		desc: "修复通往森林湖的道路",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 修一条路",
		softLockable: true,
	},
	"Field Work": {
		title: "这是为了科学！",
		desc: "在森林湖边上建立一座考古工作站",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 完成温特的心愿",
		softLockable: true,
	},
	"Concrete Woodland": {
		title: "混凝土林地",
		desc: "修整住宅区的那片灌木丛",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 复原灌木丛",
		softLockable: true,
	},
	"School Green": {
		title: "给学校添点绿",
		desc: "为学校重建绿化带",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 做点绿化工作",
		softLockable: true,
	},
	"Hookah Master": {
		title: "水烟大师",
		desc: "继承水烟馆",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 研究水烟，开家小店",
		softLockable: true,
	},
	"Sins of the Past": {
		title: "过去的罪孽",
		desc: "发现市长的秘密",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 市长似乎有什么东西在电脑上",
		softLockable: true,
	},
	"Panic Room": {
		title: "逃离公寓楼",
		desc: "在触发公寓楼警报后顺利逃离",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 在倒钩街触发安全警报",
		softLockable: true,
	},
	"Lost World": {
		title: "失落的世界",
		desc: "发现被人遗忘的岛屿",
		difficulty: 1,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 在那片土地，被薄雾所笼罩着",
		softLockable: true,
	},
	"Prehistoric Landscape": {
		title: "史前景观",
		desc: "探索了岛上的所有地区",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 探索岛屿",
		softLockable: true,
	},
	"Face of a Guardian": {
		title: "守护者之面",
		desc: "制作面具",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 在野外练习木工活",
		softLockable: true,
	},
	"Wild Monarch": {
		title: "荒野兽王",
		desc: "建造一个王座",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示:习得野外木工技巧",
		softLockable: true,
	},
	Naturalised: {
		title: "归化",
		desc: "完美潜入岛屿城堡",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 伪装，然后潜行",
		softLockable: true,
	},
	"Gilded Spear": {
		title: "金枪",
		desc: "找回黄金长枪",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 它在岛屿的某处等待着你",
		softLockable: true,
	},
	"Defy the Night": {
		title: "战胜黑夜",
		desc: "忍受痛苦的考验直到结束",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 提升神殿内的等级",
		softLockable: true,
	},
	"Withering Truth": {
		title: "枯萎的真理",
		desc: "见过主教",
		difficulty: 3,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 忏悔，启示",
		softLockable: true,
	},
	"Lost Heirloom": {
		title: "丢失的传家宝",
		desc: "找回黄金指南针",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 在海外被盗。",
		softLockable: true,
	},
	"Max Those Shots": {
		title: "全副武装",
		desc: "获得所有防狼喷雾",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 最好的防守就是进攻",
		softLockable: true,
	},
	"Opened Pandoras Box": {
		title: "潘多拉魔盒",
		desc: "为成人用品店的开张提供一次帮助",
		difficulty: 1,
		series: "Adult Shop",
		filter: ["All", "Discoveries"],
		hint: "提示: 是否值得协助打开魔盒？",
	},
	"Brothel Provider": {
		title: "妓院额外生意",
		desc: "为妓院安装一台售卖机并从中获利",
		difficulty: 2,
		series: "",
		filter: ["All", "Discoveries"],
		hint: "提示: 说服布莱尔拓展一下生意",
	},
	"Opened Pandoras Cocks": {
		title: "潘多拉魔♥棒",
		desc: "为成人用品店的开张提供超多的帮助",
		difficulty: 3,
		series: "Adult Shop",
		filter: ["All", "Discoveries"],
		hint: "提示: 真的值得这么快打开魔盒吗？",
	},
	"Ear Slime Lover": {
		title: "我耳朵里有耳史！",
		desc: "它是你最好的朋友",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 接受它的一切要求",
	},
	"Ear Slime Amalgam": {
		title: "耳中史莱姆混合体",
		desc: "你成为了你最好的朋友的一部分",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 只需要时间……还有无限的爱",
	},
	"The Path to Redemption": {
		title: "救赎之路，就在脚下",
		desc: "从恶魔形态中恢复人性。",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 找回你失去的东西",
		softLockable: true,
	},
	"A New Life": {
		title: "是时候开始新生活了",
		desc: "使用成就加成",
		difficulty: 1,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 获得一点新周目的帮助",
	},
	Negotiator: {
		title: "嘿，再给点吧！",
		desc: "一次获得超过£500的小费",
		difficulty: 3,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 赚点小费",
	},
	"Curious Attire": {
		title: "奇装异服",
		desc: "解锁森林商店里的全部服饰",
		difficulty: 2,
		series: "",
		filter: ["All", "Special"],
		hint: "提示: 我爱这些奇怪的服装",
		softLockable: true,
	},
	"My Collection of Feats": {
		title: "成就收藏者",
		desc: "获得好多好多成就",
		difficulty: 3,
		series: "collection",
		filter: ["All", "Special"],
		hint: "提示: 收集完成一些东西",
	},
	"My Timeless Collection of Feats": {
		title: "成就收藏大师",
		desc: "完成超多的成就",
		difficulty: 5,
		series: "collection",
		filter: ["All", "Special"],
		hint: "提示: 完成更多的一些东西",
	},
};

async function featsMergePre() {
	// Replace getting the count with a better method that gets included with the sugarcube format
	T.saveDataImportCount = 0;
	const localStorageSaves = DoLSave.getSaves();

	const result = () => {
		if (!T.saveDataImportCount) {
			$("#featsBeginText").html(`0 saves detected, did you make a local save before trying this?`);
		} else if ((T.saveDataImportCount >= 10 && Browser.isMobile.any()) || T.saveDataImportCount >= 25) {
			$("#featsBeginText").html(`${T.saveDataImportCount} saves detected, this might take some time on a slower device.`);
		} else {
			$("#featsBeginText").html(`Only ${T.saveDataImportCount} saves detected, this shouldn't take too long.`);
		}
		$("#featsBeginLoadingText").addClass("hidden");
		$("#featsBeginButton").removeClass("hidden");
	};

	// Count the local storage saves
	if (localStorageSaves.autosave) T.saveDataImportCount++;
	if (localStorageSaves.slots) {
		localStorageSaves.slots.forEach(slot => {
			if (slot) T.saveDataImportCount++;
		});
	}

	// Count the index db saves
	try {
		// eslint-disable-next-line no-undef
		idb.getSaveDetails()
			.then(saveDataDetails => {
				T.saveDataImportCount += saveDataDetails.length;
			})
			.finally(() => {
				result();
			});
	} catch {
		result();
	}
}
DefineMacro("featsMergePre", featsMergePre);

function featsMerge() {
	if (window.featsMerge) return;
	window.featsMerge = true;

	const savesToLoad = T.saveDataImportCount;
	const loadingBar = $("#featsLoadingMeter .greenbar");
	const loadingText = $("#featsLoadingText");
	let featData = localStorage.getItem("dolFeats");
	if (featData) {
		featData = JSON.parse(featData);
	} else {
		featData = {};
	}

	const loadFeats = (data = {}) => {
		Object.entries(data).forEach(([key, date]) => {
			if (!featData[key] || new Date(date).getTime() < new Date(featData[key]).getTime()) {
				featData[key] = date;
			}
		});
	};

	const result = () => {
		let points = 0;
		Object.keys(featData).forEach(key => {
			if (setup.feats[key]) points += setup.feats[key].difficulty;
		});
		featData.points = points;

		V.feats.allSaves = featData;
		localStorage.setItem("dolFeats", JSON.stringify(featData));

		loadingBar.css("width", "100%");
		loadingText.html("All feat data imported.");
		$("#featsFinishButton").removeClass("hidden");

		delete window.featsMerge;
	};

	// Read the local storage saves
	let localSavesChecked = 0;
	const localStorageSaves = clone(DoLSave.getSaves());
	if (localStorageSaves) {
		if (localStorageSaves.autosave) {
			localStorageSaves.autosave.state.history = State.deltaDecode(localStorageSaves.autosave.state.delta);
			DoLSave.decompressIfNeeded(localStorageSaves.autosave);

			if (
				localStorageSaves.autosave.state.history &&
				localStorageSaves.autosave.state.history[0] &&
				localStorageSaves.autosave.state.history[0].variables
			) {
				const variables = localStorageSaves.autosave.state.history[0].variables;
				if (variables.feats) {
					loadFeats(variables.feats.allSaves);
					loadFeats(variables.feats.currentSave);
				}
			}
			localSavesChecked++;
			loadingBar.css("width", `${(localSavesChecked / savesToLoad) * 100}%`);
		}
		if (localStorageSaves.slots) {
			localStorageSaves.slots.forEach(slot => {
				if (slot) {
					slot.state.history = State.deltaDecode(slot.state.delta);
					DoLSave.decompressIfNeeded(slot);
					if (slot.state.history && slot.state.history[0] && slot.state.history[0].variables) {
						const variables = slot.state.history[0].variables;
						if (variables.feats) {
							loadFeats(variables.feats.allSaves);
							loadFeats(variables.feats.currentSave);
						}
					}
					localSavesChecked++;
					loadingBar.css("width", `${(localSavesChecked / savesToLoad) * 100}%`);
				}
			});
		}
	}

	// Read the index db saves
	try {
		// eslint-disable-next-line no-undef
		idb.getAllSaves()
			.then(saves =>
				saves.forEach((slot, index) => {
					if (slot.data && Array.isArray(slot.data.history)) {
						slot.data.history.forEach(saveData => {
							if (saveData.variables && saveData.variables.feats) {
								loadFeats(saveData.variables.feats.allSaves);
								loadFeats(saveData.variables.feats.currentSave);
							}
						});
					}
					loadingBar.css("width", `${((localSavesChecked + index + 1) / savesToLoad) * 100}%`);
					loadingText.html(`${index + 1} out of ${savesToLoad} saves checked.`);
				})
			)
			.finally(() => {
				result();
			});
	} catch {
		result();
	}
}
DefineMacro("featsMerge", featsMerge);






