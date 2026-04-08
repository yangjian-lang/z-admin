// 注意mock文件夹必须与src同级
function createUserList() {
    return [
        {
            uid: 1,
            nickname: '阿龙',
            username: 'admin',
            password: '111111',
            token: 'Long Token',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        },
        {
            uid: 2,
            nickname: '阿红',
            username: 'user',
            password: '222222',
            token: 'Hong Token',
            avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
        }
    ]
}

export default [
    {
        url: '/api/user/login',
        method: 'post',
        response: ({ body }) => {
            const { username, password } = body
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password
            )
            if (!checkUser) {
                return { code: 201, data: { message: '账号或密码不正确，请重新输入' } }
            }

            const { token } = checkUser
            return { code: 200, data: { token, message: '登陆成功' } }
        }
    },
    {
        url: '/api/user/info',
        method: 'get',
        response: (request) => {
            const token = request.headers.token
            const checkUser = createUserList().find((item) => item.token === token)
            if (!checkUser) {
                return { code: 201, data: { message: '获取用户信息失败' } }
            }
            return { code: 200, data: checkUser }
        }
    }
]