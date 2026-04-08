// 常量路由路由
export const constantRoute = [
    {
        // 登录
        path: "/login",
        component: () => import('@/views/login/index.vue'),
        name: 'Login',
        meta: {
            title: '登录',
            hidden: true,
            icon: ''
        }
    },
    {
        // 首页
        path: "/",
        component: () => import('@/layout/index.vue'),
        name: 'Layout',
        meta: {
            title: '',
            hidden: false,
            icon: ''
        },
        redirect: '/home',
        children: [
            {
                path: "/home",
                component: () => import('@/views/home/index.vue'),
                name: 'Home',
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        // 数据大屏
        path: "/screen",
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'Platform'
        }
    },
    {
        // 404
        path: "/404",
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
            icon: ''
        }
    }
]

// 异步路由
export const asyncRoute = [
    {
        // 权限管理
        path: '/acl',
        // 该路由下的子路由都需要使用layout结构故需要在父集引入layout结构
        component: () => import('@/layout/index.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            hidden: false,
            icon: 'TrendCharts'
        },
        redirect: '/acl/user',
        children: [
            {
                // 用户管理
                path: '/acl/user',
                component: () => import('@/views/acl/user/index.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    hidden: false,
                    icon: 'UserFilled'
                },
            },
            {
                // 角色管理
                path: '/acl/role',
                component: () => import('@/views/acl/role/index.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    hidden: false,
                    icon: 'Avatar'
                },
            },
            {
                // 菜单管理
                path: '/acl/permission',
                component: () => import('@/views/acl/permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    hidden: false,
                    icon: 'Histogram'
                },
            }
        ]
    },
    {
        // 商品管理
        path: '/product',
        // 该路由下的子路由都需要使用layout结构故需要在父集引入layout结构
        component: () => import('@/layout/index.vue'),
        name: 'Product',
        meta: {
            title: '商品管理',
            hidden: false,
            icon: 'Grid'
        },
        redirect: '/product/trademark',
        children: [
            {
                // 品牌管理
                path: '/product/trademark',
                component: () => import('@/views/product/trademark/index.vue'),
                name: 'Trademark',
                meta: {
                    title: '品牌管理',
                    hidden: false,
                    icon: 'Briefcase'
                },
            },
            {
                // 属性管理
                path: '/product/attr',
                component: () => import('@/views/product/attr/index.vue'),
                name: 'Attr',
                meta: {
                    title: '属性管理',
                    hidden: false,
                    icon: 'Shop'
                },
            },
            {
                // SPU管理
                path: '/product/spu',
                component: () => import('@/views/product/spu/index.vue'),
                name: 'Spu',
                meta: {
                    title: 'SPU管理',
                    hidden: false,
                    icon: 'Platform'
                },
            },
            {
                // SKU管理
                path: '/product/sku',
                component: () => import('@/views/product/sku/index.vue'),
                name: 'Sku',
                meta: {
                    title: 'SKU管理',
                    hidden: false,
                    icon: 'ChromeFilled'
                },
            }
        ]
    },
]

// 任意路由
export const anyRoute = {
    // 重定向
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'Any',
    meta: {
        title: '重定向',
        hidden: true,
        icon: ''
    }
}