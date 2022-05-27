import { defaultTheme, defineUserConfig } from 'vuepress';

export default defineUserConfig({
  // 站点语言，默认为 `en-US`
  lang: 'zh-CN',
  // 站点标题
  title: '前端学习站',
  // 描述
  description: '前端学习站',
  // 头部添加额外标签
  head: [['link', { rel: 'icon', href: '/img/logo.jpg' }]], // 静态资源路径默认为 `/public`
  //多语言支持
  locales: {},
  //主题
  theme: defaultTheme({
    // displayAllHeaders: true, // 默认值：false
    // logo
    logo: '/img/logo.jpg',
    // 夜间模式的Logo
    logoDark: '/img/logo.jpg',
    // navbar
    navbar: [
      {
        text: 'Github',
        link: 'https://github.com/Xi-Yuer',
      },
      {
        text: 'Gitee',
        link: 'https://gitee.com/Xi-Yuer',
      },
      {
        text: '项目',
        children: [
          {
            text: '静态网页 HTML',
            link: 'https://xi-yuer.github.io/html/',
          },
          {
            text: '购物商城H5 Vue2.0',
            link: 'http://112.124.28.77:3000/home',
          },
          {
            text: '后台管理项目 Vue3.0 + Ts',
            link: 'http://112.124.28.77/login',
          },
          {
            text: '网易云 React + Hooks',
            link: 'http://112.124.28.77:3232/',
          },
          {
            text: '动态猫',
            children: [
              {
                text: '接口 Koa + Mysql',
                link: 'https://xi-yuer.github.io/html/',
              },
              {
                text: '前端 H5',
                link: 'http://112.124.28.77:7878/login',
              },
            ],
          },
          {
            text: '小程序',
            link: 'https://xi-yuer.github.io/html/',
          },
          {
            text: 'Nuxt',
            link: 'http://112.124.28.77:8888/',
          },
        ],
      },
      {
        text: '前端学习',
        children: [
          {
            text: 'HTML&CSS',
            link: '/learn/html/',
          },
          {
            text: 'Javascript',
            link: '/learn/js',
          },
          {
            text: 'Node',
            link: '/learn/node',
          },
          {
            text: 'vue',
            link: '/learn/vue',
          },
          {
            text: 'react',
            link: '/learn/react',
          },
          {
            text: '小程序',
            link: '/learn/miniprogram',
          },
          {
            text: 'Git',
            link: '/learn/git',
          },
        ],
      },
      {
        text: '后端学习',
        children: [
          {
            text: 'Go',
            link: '/learn/go',
          },
          {
            text: 'Docker',
            link: '/learn/docker',
          },
        ],
      },
    ],
    // sidebar: ['/guide', '/learn/html', '/learn/js', '/learn/node', '/learn/vue', '/learn/react', '/learn/miniprogram', '/learn/git'],
  }),
  //开发配置项(默认为false,当为true时,在终端输出一些额外的信息)
  debug: false,
  //域名配置 (默认为 0.0.0.0)
  host: '0.0.0.0',
  //端口号配置 (默认为 8080)
  port: 8080,
  // 每次启动服务是否打开浏览器(默认为false)
  open: false,
  //pagePatterns ( 默认为['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'] )
  // pagePatterns: ['**/*.md', '!**/README.md', '!.vuepress', '!node_modules'],
});
