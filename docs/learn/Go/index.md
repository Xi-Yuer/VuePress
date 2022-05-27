## hello

```go
package main
import "fmt"
func main()  {
	fmt.Println("hello,\nword")
}
```

## 变量

```go
package main

import "fmt"

func main() {
	// 定义变量 int 的默认值为 0
	var i int
	i = 10
	fmt.Println("i = ", i)

	// 变量声明
	num := 10
	fmt.Println("num = ", num)

	// 多变量声明
	var n1, n2, n3 int
	fmt.Println(n1,n2,n3) // 0 0 0

	var m1, m2, m3 = 3, "M1", 2
	fmt.Println(m1,m2,m3)

}
```

## 运算符

```go
package main

import "fmt"

// 全局变量
var (
	num1 = 10
	num2 = 20
	str1 = "Tom"
	str2 = "Sily"
)

func main()  {
	// 数值运算
	fmt.Println(num1 + num2)
	// 字符串拼接
	fmt.Println(str1 + str2)
}
```

## 数据类型

### int

```go
package main

// import "fmt"
// import "unsafe"

// 引入方式
import (
	"fmt"
	"unsafe"
)

func main()  {
	// int(和电脑系统有关 32位 64位), int8(-128 - 127), int16(-32768 - 32767), int32, int64
	// uint(无符号 大于零), uint8(0 - 255), uint16(0 - 2 的16次方 - 1), uint32(0 - 2 的32次方 - 1), uint64(0 - 2 的64次方 - 1)
	// rune
	// byte(0 - 255)

	var i int = 10
	var n uint8 = 255

	fmt.Println(i)
	fmt.Println(n)

	// 查看变量数据类型 (fmt.Printf("%T"))
	fmt.Printf("数据类型是 %T",i) // int

	// 查看数据及占用字节大小 (fmt.Printf("%d", n, unsafe.Sizeof(n)))
	fmt.Printf("占用字节 %d", unsafe.Sizeof(i)) // 8

	// 浮点类型(float32:单精度 4字节 float64:双精度 8 字节) 默认类型 float64
	// 科学计数法 2.12345e2 ==> 2.12345 * 10 的 2 次方
	// 推荐使用 float64 双精度

	var z float32 = 1.2

	fmt.Printf("数据类型是 %T",z)
}
```

### 字符类型

```go
package main
import "fmt"

func main()  {
	// Println：打印字符串、变量；
	// Printf：打印需要格式化的字符串，可以输出字符串类型的变量；不可以输出整型变量和整型；
	// 简单理解，当需要格式化输出信息时，一般选择Printf，其余使用Println。


	// %T 输出类型
	// %d 十进制整数
	// %c 一个Unicode的字符(格式化输出)
	// %b 一个二进制整数，将一个整数格式转化为二进制的表达方式

	 n := 'a'
	 m := '0'

	 v := 100

	 var z string = "嘿"

	//  输出 ASCII表中的值
	 fmt.Println(n,m)  // 97 48
	 fmt.Println(z)  // 嘿
	 fmt.Printf("%T \n",z) // string

	//  格式化输出
	fmt.Printf("%c %c",n,m) // a 0

	fmt.Printf("%b",v) // 01100100

}
```

### 基本数据类型转化

#### int

```go
package main
import (
	"fmt"
)

var i int = 10
// 将 int 数据类型转化为 float64 类型
// 语法： T(v)  ==>  [数据类型](value)
var n float64 = float64(i)

// 数据可以从 小 => 大 | 大 => 小
// 		大 => 小 时数据溢出会导致与期望结果不一样( int64 => int8 )
// 		转化时需要考虑范围
// 数据类型转化不影响原来的数据类型
// 不同数据类型转化进行运算时同样需要考虑范围问题，否则会造成溢出或编译不通过问题


var a int32 = 10
// var b int64 = a  //不能将 int32 赋值给 int64, 编译不能通过

var c int64 = int64(a)  // 转化之后再赋值




func main()  {
	fmt.Println(n) 		  // 10
	fmt.Printf("%T \n",i) // int
	fmt.Printf("%T \n",n) // float64
}
```

#### string

```go
package main
import (
	"fmt"
	_"strconv"

)


// 基本数据类型 ==> string
// 方式一： fmt.Sprintf() 根据参数返回格式化的字符串
// 方式二： strconv
// 			strconv.FormatBool(i)
// 			strconv.FormatFloat(i,fmt,prec,bitSize)
// 			strconv.FormatInt(i,base) | strconv.Itoa(i)

// string ==> 基本数据类型
// 			strconv.ParseBool(str) 返回值 [value bool,err error]  [ value, _ ] 可以这样接受第一个参数，忽略第二个参数
// 			strconv.ParseInt(str, base int, bitSize int) 返回值 [ value int, err error ]
// 			strconv.ParseFloat(str,bitSize int) 返回值 [value float, err error]

var str string
// 将下面的数据转化为 string
var num1 int = 10
var num2 float64 = 23.4
var b bool = true
// 将下面的string转换为基本数据类型
var str1 string = "1"
var str2 string = "true"
var str3 string = "130"


func main()  {
	// int ==> string("%d")
	str = fmt.Sprintf("%d",num1)
	fmt.Println(str) 				// 10
	fmt.Printf("%T",str)				//string

	// foat ==> string("%f")
	str = fmt.Sprintf("%f",num2)
	fmt.Println(str) 				    // 23.400000
	fmt.Printf("%T",str) 				// string

	// foat ==> string("%t")
	str = fmt.Sprintf("%t",b)
	fmt.Println(str) 				    // true
	fmt.Printf("%T",str) 				// string
}
```

## 指针

### 指针数据类型

```go
package main

import (
	"fmt"
)

// 每个值类型都有对应的指针类型( *int, *float32, *float64, *string, *bool..... )
func main()  {
	var n int = 10
	var m int = 10
	// &n 可以打印出 n 的内存地址
	fmt.Println(&n) // 0xc0000aa058
	fmt.Println(&m) // 0xc0000120b0

	// 指针变量存的是一个内存地址，该内存地址所指向的空间才是值

	// ptr 是一个指针变量，类型是 *int(int类型的指针),值为 &n
	var ptr *int = &n
	fmt.Println(&ptr) // 0xc000006030 ptr 本身的内存地址
    // 值为：0xc0000aa058 与 n 的内存地址相同 并且该内存地址指向 10 这个值
	fmt.Println(ptr)

	// 获取指针类型所指向的值
	fmt.Println(*ptr) // 10
}
```

### 指针练习

```go
package main
import (
	"fmt"
)

// 获取一个 int 变量的地址 并显示到终端
// 将 num 的指针赋值给 ptr 并通过 ptr 去修改 num
func main(){
	num := 10
	var ptr *int = &num
	*ptr = 11
	fmt.Println(&num)
	fmt.Println(num)
}

```

## 位运算

### 正码

> 正数的正码、反码、补码一致
> 1 ==> 0000 0001(正码)
> -1 ===> 1000 0001（负数正码第一位为 1 ）

### 反码

> -1 ==> 正码 1000 0001 ==> 反码 1111 1110

### 补码

> 补码等于反码 + 1 （-1 的反码 ==> 1111 1111）
