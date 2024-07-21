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
* 추상화 : 어떠한 객체를 사실적으로 표현하는 것이 아니라, 공통되 특징을 간결한 방식으로, 이해하기 쉽게 표현한것
* 클래스 : 추상화를 사용자 정의 데이터형으로 변환해주는 수단
## 클래스의 선언
* public : 공개 멤버, 클래스 외부에서도 접근가능
* private : 비공개 멤버, 클래스 내에서만 접근 가능
    * private를 이용하여 데이터를 은닉할 수 있음
* 사용범위 결정 연산자(::)를 통해 클래스 내부의 멤버를 정의하거나 사용할 수 있음
```c++
#include <iostream>
#include <cstring>
using namespace std;

class Stock
{
    private:
        string name;
        int shares;
        float share val;
        double total val;
    public:
        void acquire(string&, int, float);
        void buy(int,float);
        void sell(int,float);
        void update(float);
        void show();
        Stock();
        ~Stock();
}
void Stock::acquire(string& co, int n, float pr){
    name =co;
    shares =n ;
    share_val=pr;
    set_total();
}
void Stock::buy(int n,float pr){
    shares +=n;
    share_val=pr;
    set_total();
}
void Stock::sell(int, float){
    shares -=n;
    share_val=pr;
    set_total();
}
void Stock::update(float pr){
    share_val=pr;
    set_total();
}
void Stock::show(){
    cout<<"회사 명 : "<<name <<endl;
    cout<<"주식 수 : "<<shares <<endl;
    cout<<"주가 : "<<share_val <<endl;
    cout<<"주식 총 가치 : "<<total_val <<endl;

}
int main()
{
    Stock temp;
    temp.acquire("panda",100,1000);
    temp.show();
    temp.buy(10,1200);
    temp.show();
    temp.sell(10,1200);
    temp.show();
    return 0;
}
/*
회사 명 : panda
주식 수 : 100
주가 : 1000
주식 총 가치 : 100000
회사 명 : panda
주식 수 : 110
주가 : 1200
주식 총 가치 : 132000
회사 명 : panda
주식 수 : 105
주가 : 800
주식 총 가치 : 84000
*/
```

# 클래스 생성자와 파괴자
* 생성자, 파괴자는 C++에서 클래스에 제공하는 기본 문법이므로 디폴트로 함수를 제공
* 생성자에 의해 객체가 초기화되고, 객체의 수명이 끝나면 파괴자를 통해 객체를 삭제
* 틸테(~)를 통해 파괴자를 선언하고, 파괴자는 매개변수가 없음
```c++
class Stock
{
    private:
        string name;
        int shares;
        float share val;
        double total val;
    public:
        void acquire(string&, int, float);
        void buy(int,float);
        void sell(int,float);
        void update(float);
        void show();
        Stock();
        ~Stock();
}
Stock::Stock(){
    name="";
    shares=0;
    share_val=0;
    set_total();
}
int main()
{
    cout << "생성자를 이용하여 객체 생성\n";
    Stock temp("panda",100,1000);

    cout << "디폴트 생성자를 이용하여 객체 생성\n";
    Stock temp2; // 생성자를 통해 인자를 전달하지 않아도 객체를 생성가능

    cout<< "temp를 temp2에 대입\n";
    temp2 =temp;

    cout<<"temp와 temp2 출력\n"
    temp.show();
    temp2.show();

    cout<<"생성자를 이용하여 temp 내용 재설정\n";
    temp =Stock("Coding", 200,1000);
    
    cout<< "재설정된 temp 출력\n";
    temp.show();
    
    return 0;
}
/*
생성자를 이용하여 객체 생성
디폴트 생성자를 이용하여 객체 생성
temp를 temp2에 대입
temp와 temp2 출력
회사 명 : panda
주식 수 : 100
주가 : 1000
주식 총 가치 : 100000
회사 명 : panda
주식 수 : 100
주가 : 1000
주식 총 가치 : 100000
생성자를 이용하여 temp 내용 재설정
Coding 클래스가 소멸되었습니다.
재설정된 temp 출력
회사명 : Coding
주식 수 : 200
주가 : 1000
주식 총 가치 : 200000
panda클래스가 소멸되었습니다.
Coding 클래스가 소멸되었습니다.
*/
```