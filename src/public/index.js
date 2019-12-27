
export const LOGIN = 'api/login/loginIn'//登录

export const LOGINOUT ='api/user/info'//退出登录

export const FORGET = 'api/resetPwd/update'//忘记密码提交
export const FORGETCODE ='api/resetPwd/sendPhoneCode'//发送验证码

export const FINANCIAL = 'api/home/earnings'//财务

export const CASH = 'api/withdraw/index'//获取数据
export const CASHSUBMIT = 'api/withdraw/insert'//提现

export const INVEST = 'api/user/myEthAddress'//充值
export const INVESRECORD = 'api/recharge/order'

export const NEWS = 'api/msg/index'//新闻
export const NEWSDETAIL = 'api/msg/get'//新闻详情

export const NOTES = 'api/home/algebraRecord'//套利记录

export const HOME = 'api/home/index' //首页

export const FC = 'api/fc/index'//FC

export const RECYCLING = 'api/repo/index'//预约
export const RECYCLINGSUBMIT = 'api/repo/insert'//预约提交

export const FCRECORD = 'api/wallet/record'//FC记录

export const EXCHANGE = 'api/change/index'//兑换
export const EXCHANGESUBMIT = 'api/change/insert'//兑换提交

export const TAKE = 'api/takeOut/index'//取出
export const TAKESUBMIT = 'api/takeOut/insert'//取出提交
export const TAKERECORD = 'api/takeOut/record'//取出记录

export const USER = 'api/user/info'//个人中心

export const USDTBING = 'api/usdt/get'//usdt绑定
export const USDTSUBMIT = 'api/usdt/bind'//usdt提交

export const PINSET = 'api/safeSet/isSetPayPwd'//支付密码
export const EDITORPIN = 'api/safeSet/changeSafePwd'//修改支付密码

export const LOGINPASSWORD = 'api/safeSet/changPwd'//登录密码

export const COUNTRY = 'api/getCountryRegion'//国家区号
export const MOBILE = 'api/user/getMobile'//获取手机号码
export const OLDMOBILECODE = 'api/safeSet/oldPhoneCode'//获取旧手机验证码
export const NEWMOBILECODE = 'api/safeSet/newPhoneCode'//获取新手机验证码
export const EDITORMOBILE = 'api/safeSet/updatePhone'//修改手机号

export const EDITORPERSONALITY = 'api/user/changeAttr'//修改个性设置

export const MANAGE = 'api/user/myChild'//直接管理

export const INVITE = 'api/register/index'//邀请伙伴

export const ABOUT = 'api/home/uploadAddress'//关于我们

export const VALUE = 'api/fc/insert'//增值

export const INTEREST ='api/home/algebraSubmit'//套利

export const CONTRACT = 'api/investment/index'//合约
export const OVERCONTRACT = 'api/investment/cancelOrer'//终止合约
export const BUYCONTRACT ='api/investment/insert'//购买合约

export const CREATECONTRACT = 'api/investment/insert'//创建合约
export const CHECKOUT = 'api/investment/cancelOrer'//出仓
export const COVERING = 'api/investment/cover'//补仓
export const CONTRACTDETAILS = 'api/wallet/record'//财务明细

export const GUESS = 'api/guess/index'//小组竞猜
export const SUBMITGUESS = 'api/guess/insert'//竞猜提交
export const GUESSHISTRY = 'api/guess/record'//竞猜记录

export const CASHCODE ='withdraw/sendPhoneCOde'//提现发送手机验证码