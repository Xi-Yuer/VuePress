# Node
## express 中间件

::: tip
express 中遇到的中间件 
:::
### 全局中间件

### 全局函数挂载

```js
app.use((req, res, next) => {
  // 在全局中间件的res上挂载一个函数，该函数可以在任意路由处理函数中使用
  res.cc = function () {
    //doSomething...
  };
  next(); //必须调用next函数将处理好的数据交给下一个中间价或路由
});
```

### 全局错误捕获

```js
app.use((err,req,res，next)=>{
    //全局错误捕获
    if(err) return res.send( {  status: 1, message: err } )
    //全局错误捕获需要注册在所有路由之后
})
```

### 解决跨域

```js
const cors = require('cors');
app.use(cors()); //允许跨域
```

### 托管静态资源

```js
app.use(express.static('assets'));
//通过http://127.0.0.1/img/bg1.jpg 访问文件
// 或者
app.use('/assets', express.static('assets'));
// 访问方式:http://127.0.0.1/assets/img/bg1.jpg
```

### 生成 token

```js
const jwt = require('jsonwebtoken'); //生成token
//导入秘钥和token有效期
const { jwtSecretKey, expiresIn } = require('../config');

// 登录成功，生成token并返回到客户端
//获取用户信息并剔除密码和用户头像等敏感长数据信息
const user = { ...result[0], password: '', user_pic: '' };
const token = jwt.sign(user, jwtSecretKey, { expiresIn });
```

### 验证 token

```js
const jwtSecretKey = 'loginSecretKey'; //秘钥
const expressJWT = require('express-jwt'); //验证token

app.use(
  expressJWT({ secret: jwtSecretKey, algorithms: ['HS256'] }).unless({
    path: [/^\/api/],
  })
); //排除以/api开头的请求不需要验证token

//token验证成功之后，在req身上会挂载一个user属性，该属性是token的解密数据

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError')
    return res.send({ message: '身份验证失败' });
});
```

### 用户提交密码加密和验证密码正确性

```js
const bcrypt = require('bcryptjs'); //密码加密

//密码加密(参数一：加密数据，参数二：加密安全值)
const password = bcrypt.hashSync(userInfo.password, 10);

//用户传入的密码与服务器做对比返回true则密码正确，反之;
const isCorrect = bcrypt.compareSync(userInfo.password, password);
```

### 解析表单数据

```js
// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }));
```

### 提交数据规则验证

```js
const joi = require('joi') //规则
const expressJoi = require('@escook/express-joi'); //验证规则

/**
 * string()字符串
 * alphamun() a-Z | 0-9
 * min() max() 最大最小
 * required() 必传
 * pattern() 自定义规则(正则表达式)
 */

//定义规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required() // 6-12个非空字符

//使用规则
const valid = expressJoi({ body: { username，password } }); //body参数验证
const valid = expressJoi({ params: { username，password } });//params参数验证
const valid = expressJoi({ query: { username，password } });//query参数验证

...
router.post('post',valid,(req,res)=>{  doSomething... })

app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError){
        res.send( { message:'表单数据验证失败!',err } )
    }
})
```

:::tip
koa项目中遇到的中间件
:::


## nodeJs-koa

### dotenv

> 用与给 progress 环境中注入环境变量，他会自动寻找根目录文件下的
> .env 文件夹中的变量，并将这些变量注入到环境中

### koa-router

> koa 路由

### nodemon

> 自动更新

### koa-bodyparser

> 用来解析客户端传来的 Json 格式的数据

```js
const bodyParser = require('koa-bodyparser');

app.use(bodyParser());
```

### mysql2

> 用于连接和操作数据库

### crypto(node 程序自带)

> 对用户密码进行加密存储

```js
const crypto = require('crypto');

const md5password = password => {
  const md5 = crypto.createHash('md5');
  const result = md5.update(password).digest('hex');
  return result; //返回加密过后的内容
};

module.exports = md5password;
```

### jsonwebtoken

> 用于生成 token

### koa-multer

> 文件处理

```js
const Multer = require('koa-multer');

const avatarUpload = Multer({
  //他会在目录中自动创建一个uoloads的文件夹（文件夹下有avatar文件夹）
  dest: './uploads/avatar',
});
//中间件，他会将客户端传来的avartar字段中的文件保存到avatar文件夹下
const avatarHandler = avatarUpload.single('avatar');
```

### jimp

> 对图像大小进行处理
