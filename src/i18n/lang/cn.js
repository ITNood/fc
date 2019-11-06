import zhLocale from 'element-ui/lib/locale/lang/zh-CN' //引入element语言包
const cn = {
    message: {
        'appointment':'预约',
        'pending':'待受理',
        'noCentent':'没有内容可复制',
        'picter': '暂图图片',
        'rechargeRecord': '充值记录',
        'successful': '充值成功',
        'failed': '充值失败',
        'arbteam': '套利小组',
        "language": "语言设置",
        "about": '关于我们',
        'exit': '退出登录',
        'security': '安全设置',
        'bing': 'USDT 绑定',
        'manage': '直接管理',
        'invite': '邀请伙伴',
        'character': '个性设置',
        'confirm': '确认',
        'nickname': '请输入昵称',
        'nicknames': '请输入2~6个字符昵称',
        'account': '伙伴账号',
        'inviteAccount': '请输入您需邀请的伙伴账号',
        'partnerPhone': '伙伴手机号码',
        'phoneNumber': '请输入您伙伴的手机号码',
        'allPertner': '全部伙伴',
        'level_1': '一级伙伴',
        'level_2': '二级伙伴',
        'level_3': '三级伙伴',
        'level_4': '四级伙伴',
        'level_5': '五级伙伴',
        'current': '当前有效级别',
        'yesterday': '昨日有效直推',
        'team': '昨日有效团队',
        'invitePartner': '直邀伙伴',
        'address': 'USDT 地址',
        'tips': '温馨提示',
        'protocol': '平台只允许ERC20协议发行的USDT地址',
        'mobile': '手机号码',
        'loginPwd': '登录密码',
        'payPwd': '支付密码',
        'send': '发送',
        'resend': '重新发送',
        'empty': '验证码和新手机号不能为空',
        'newCode': '请输入新手机验证码',
        'currentMobile': '当前手机号码',
        'messageCode': '短信验证码',
        'smsCode': '请输入短信验证码',
        'newMobile': '新手机号码',
        'entryMobile': '请输入您的新手机号码',
        'oldPwd': '原登录密码',
        'entryOldPwd': '请输入原登录密码',
        'newPwd': '新登录密码',
        'entryNewPwd': '请输入新登录密码',
        'confirmLoginPwd': '确认新登录密码',
        'entryconfirmLgoinPwd': '请确认新登录密码',
        'againPwd': '请再次输入密码',
        'match': '两次输入密码不一致',
        'setPwd': '请设置PIN密码',
        'newPinCode': '请输入新PIN密码',
        'confirmPinCode': '请确认新的PIN密码',
        'oldPin': '请输入原PIN密码',
        'criculation': '流通FC',
        'lock': '锁定FC',
        'valueAdd': '增值',
        'exchange': '兑换',
        'compensation': '薪酬',
        'repo': '回购',
        'ongoing': '进行中',
        'end': '已完成',
        'week': '剩余天数',
        'total': '增值总额',
        'salary': '增值标准',
        'forWeek': '待结算次',
        'settlement': '已结算次',
        'arbitrage': '套利',
        'recharge': '充值',
        'withdrawal': '提现',
        'detail': '财务',
        'usdtRecharge': 'USDT充值',
        'type': '链类型',
        'save': '保存二维码到相册',
        'copy': '复制',
        'fill': '充币地址',
        'rechargeTips': '充值提示',
        'return': '本次充值仅支持ERC20(即ETH底层协议)，先自行确认否则资产不能到帐且无法退回',
        'deposit': '请勿向上述地址充值任何非USDT资产，否则资产将不可找回',
        'use': '您充值至上述地址后，需要整个网络节点的确认，网络确认后到帐，即可正确使用',
        'min': '最小充值金额为：100 USDT，小于最小金额的充值将不能上帐且无法退回',
        'usdtWith': 'USDT提现',
        'myusdt': '我的USDT',
        'withAmount': '提现数量',
        'please': '请输入',
        'multiple': '的倍数',
        'record': '提现记录',
        'processing': '处理中',
        'more': '没有更多数据了',
        'arbitRecord': '套利记录',
        'mynews': '我的消息',
        'News': '消息公告',
        'notice': '公告',
        'me': '我',
        'logOut': '是否退出登录',
        'cancel': '取消',
        'username': '用户名',
        'acoountPwd': '账号密码',
        'forget': '忘记密码',
        'login': '登录',
        'otherLogin': '其他登录方式',
        'entryAccount': '请输入账号',
        'phone': '请输入手机号码',
        'currency': '套利币种',
        'arbitAmount': '套利金额',
        'open': '套利开放时间为9：00 ~ 18：00 （每周日不支持套利服务）',
        'nextDay': '每日所产生的利润将在次日开盘前结算',
        'must': '套利金额必须为',
        'entryAmount': '请输入套利金额',
        'cannot': '提现数量不能为0',
        'copied': '已复制充币地址',
        'subdidiary': 'USDT明细',
        'pleasePwd': '请输入密码',
        'download': '扫一扫，下载DORNE',
        'only': '只接受ERC20协议USDT',
        'error': '如因绑定错误产生无法到帐与本平台无关',
        'locked': '当前锁定FC',
        'valueAdd': '增值金额',
        'entryValue': '请输入增值金额',
        'eventGet': '最终获得',
        'forRecord': '预约记录',
        'myfc': '我的流通FC',
        'lockfc': '我的锁定FC',
        'currentfc': '流通FC兑换锁定FC',
        'exchangeNumber': '请输入兑换数量',
        'takeRecord': '取出记录',
        'cap': '封顶金额/周',
        'earning': '本周收益/周',
        'card': '绩效工资卡',
        'takeNum': '取出数量',
        'needtake': '请输入你需取出的数量',
        'allout': '全部取出',
        'poundage': '手续费',
        'shars': '自动兑换股权份额',
        'auto': '自动兑换现金金额',
        'top': '距离封顶',
        'max': '最大',
        'repo': '回购',
        'back': '回购记录',
        'selectback': '选择预约份额（USDT）',
        'backAccount': '预约到账',
        'trading': '交易须知',
        'hand': '您将流通FC兑换于平台，平台将付于对应价格的USDT作为支付货币。',
        'had': '已撤销',
        'quantily': '请输入数量',
        'invitation': '邀请账号和手机号码不能为空',
        'paste': '请输入或长按粘贴您的USDT地址'
    },
    ...zhLocale
}

export default cn
