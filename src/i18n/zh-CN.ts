export default {
    confirmUpdate: '检测到新版本，是否立即启用？',
    agendaIntro: '议题简介',
    speaker: '演讲者',
    sessionTopic: '专场主题',
    relatedTopics: '主题相关议题',
    contact: '联系方式',
    highlights: '精彩内容',
    guests: '参会大咖',
    liveSchedule: '直播日程表',
    cloudShowroom: '云端展厅',
    conferenceLecturer: '大会讲师',
    officialCommunity: '官方社群',
    orgBoothSubmitted: ({ name }: { name: string }) =>
        `展示组织 ${name} 的展位申请已提交`,
    name: '名称',
    searchOrgPlaceholder: '可搜索已注册组织',
    slogan: '标语',
    intro: '简介',
    logo: '标识',
    website: '官方网址',
    imLink: '即时通讯链接',
    imLinkPlaceholder: '加群二维码、公众平台账号等对应的链接',
    submitOrg: '提交组织',
    showProject: '展示项目',
    back: '返回',
    projectBoothSubmitted: ({ name }: { name: string }) =>
        `展示项目 ${name} 的展位申请已提交`,
    searchProjectPlaceholder: '可搜索已注册项目',
    startDate: '发起日期',
    endDate: '结束日期',
    submitProject: '提交项目',
    marketBoothApply: '开源市集 展位申请',
    individual: '个人',
    organization: '组织',
    orgInfo: '组织信息',
    projectInfo: '项目信息',
    lecture: '演讲',
    workshop: '动手训练营',
    exhibition: '展位',
    communityPartner: '社区伙伴',
    mediaPartner: '媒体合作伙伴',
    sponsorPartner: '赞助伙伴',
    applyNow: '立即申请',
    loginFirst: '请先登录',
    allCategories: '全部类别',
    currentTopic: '当前议题',
    lecturer: '讲师',
    venue: '场地',
    conferenceAgenda: '大会议程',
    noAgenda: '没有议程',
    openMarket: '开源市集',
    openMarketVenue: '本届大会的开源市集设置于',
    partners: '合作伙伴',
    time: '时间：',
    address: '地址：',
    summary: '简介：',
    userAvatar: '用户头像',
    editProfile: '编辑用户资料',
    registrationList: '报名列表',
    topicSubmitted: ({ title }: { title: string }) =>
        `您的《${title}》讲题已提交，请静候组织者审核~`,
    topicApply: '讲题申报',
    topicTitle: '题目',
    type: '类型',
    category: '分类',
    document: '文档',
    documentLabel: 'Word 文档、PPT、PDF、开放文档格式',
    select: '选择',
    relatedProject: '相关项目',
    none: '（暂无）',
    relatedOrg: '相关组织',
    submit: '提交',
    discard: '放弃',
    userInfo: '用户基本信息',
    nickname: '昵称',
    username: '用户名',
    email: '电邮地址',
    mobile: '手机号码',
    personalIntro: '个人简介',
    avatar: '头像',
    syncGithub: '同步 GitHub',
    save: '保存',
    openSource: '开放源码',
    'open-source-bazaar': '开源市集',
    score: '评分',
    loginToComment: '登录即可评论',
    yourComment: '您的评语',
    saySomething: '我来说两句',
    exhibitionUnit: '参展单位',
    currentAgenda: '当前议题',
    chengduVenue: '成都分会场',
    signIn: '登录',
    signOut: '退出',
    proudlyDevelopedWith: '自豪地开发自'
} as const;
