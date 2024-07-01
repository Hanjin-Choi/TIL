# 분할 컴파일
* c++는 파일을 별개로 나눠서 각각을 컴파일하는 것을 지향함
* 헤더 파일, 소스 파일, 리소스 파일
    * header : 구조체 선언, 함수의 원형, #define이나 const를 사용하는 기호 상수, 클래스 선언, 템플릿 선언, 인라인 함수 선언
    * 헤더파일을 호출할 때는 단 한번만 호출할 수 있도록 주의(헤더파일이 겹쳐서 중복되어 호출되지 않도록) => c++에서 이를 예방하기 위해 ifndef구문을 사용 => 한번만 헤더파일이 호출됨
* 코드의 재사용성을 높이고, 수정사항이 생길 경우 해당 파일만 수정하면 되기 떄문에 코드의 볼륨이 커질수록 이점이 큼

```c++
#ifndef STRUCT
#include <iostream>
#include <cstring>
using namespace std;
struct MyStruct
{
    string name;
    int age;
}
void display(MyStruct&);
#endif
// 여기까지 헤더 파일의 struct.h에 저장하면
#include "struct.h"
int main()
{
    MyStruct Choi ={
        "Choi",
        31,
    };
    display(Choi)
    return 0;
}
void display(MyStruct& temp)
{
    cout<<"이름 : "<<temp.name << endl;
    cout<<"나이 : "<<temp.age << endl;
}
// 이름 : Choi
// 나이 : 31
```
# 추상화와 클래스
```c++
#include <iostream>
#include <cstring>
using namespace std;
int main()
{
    return 0;
}

```
# 클래스 생성자와 파괴자
```c++
#include <iostream>
#include <cstring>
using namespace std;
int main()
{
    return 0;
}

```
# this 포인터, 클래스 객체 배열
```c++
#include <iostream>
#include <cstring>
using namespace std;
int main()
{
    return 0;
}

```

```c++
#include <iostream>
#include <cstring>
using namespace std;
int main()
{
    return 0;
}

```
```c++
#include <iostream>
#include <cstring>
using namespace std;
int main()
{
    return 0;
}

```
```c++
#include <iostream>
#include <cstring>
using namespace std;
int main()
{
    return 0;
}

```