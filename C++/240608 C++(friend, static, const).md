# const
* 객체에도 const 선언이 가능하며 const 선언 시 객체의 데이터(멤버변수)의 변경을 허용하지 않음
* 오버로딩도 마찬가지로 const 선언이 되어야만 가능
```c++
class SoSimple
{
    private:
        int num;
    public:
        SoSimple(int n) : num(n)
        {}
        SoSimple& AddNum(int n)
        {
            num+=n;
            return *this;
        }
        void ShowData() const
        {
            cout << "num : " <<num<<endl;
        }
};
int main(void)
{
    const SoSimple obj(7);
    //obj.AddNum(20); 이 함수는 obj객체가 const로 호출되었는데 함수 자체는 const로 호출된 것이 아니라 호출할 수 없음(컴파일 에러가 발생)
    obj.ShowData(); // ShowData함수는 const함수여서 호출가능
    return 0;
}

```
```c++
class SoSimple
{
    private:
        int num;
    public:
        SoSimple(int n) : num(n)
        {}
        SoSimple& AddNum(int n)
        {
            num+=n;
            return *this;
        }
        void SimpleFunc()
        {
            cout<<"SimpleFunc: "<<num<<endl;
        }
        void SimpleFunc() const
        {
            cout<<"SimpleFunc: const"<<num<<endl;
        }
};

void YourFunc(const SoSimple &obj)
{
    obj.SimpleFunc();
}
int main(void)
{
    SoSimple ojb1(2);
    const SoSimple obj2(7);
    obj1.SimpleFunc(); // SimpleFunc : 2
    obj2.SimpleFunc(); // SimpleFunc : const 7, const가 붙은 객체는 const 함수를 호출
    YourFunc(obj1); // SimpleFunc : 2 // 참조자로 호출하기 때문에 어떤 객체든지 const함수를 호출 가능 yourFunc가 const 참조자로 인자를 받기 때문
    YourFunc(obj2); // SimpleFunc : const 7
    return 0;
}
```
# 클래스와 함수에 대한 friend 선언
* class 간 friend 선언을 하면 각 class 끼리 private에 접근할 수 있음
* 하지만 이런 선언은 일방적인 방향이기 때문에 A class 가 B class 에 friend 선언을 한다면 B에서 A는 접근할 수 있지만 A는 B의 private에 접근이 불가능
* friend 선언은 정보의 은닉화를 위배하기 때문에 위험하고, 상호 독립 설계가 안되기 때문에 최대한 지양해야함
```c++
class Boy
{
    private:
        int height;
        friend class Girl; // Boy의 friend로 Girl 클래스를 지정
    public:
        Boy(int len) : height(len){}
};
class Girl
{
    private:
        char phNum[20];
    public:
        Girl(char * num)
        {
            strcpy(phNum,num);
        }
        void ShowYourFriendInfo(Boy &frn)
        {
            cout<<"His Height: "<<frn.height<<endl; // Girl이 Boy의 friend 선언되어 private 멤버에 직접 접근가능
        }
}
```
```c++
class Point
{
    private:
        int x;
        int y;
    public:
        Point(const int &xpos, const int &ypos) : x(xpos),y(ypos)
        {}
        friend Point PointOP::PointAdd(const Point&, const Point&);
        friend Point PointOP::PointSub(const Point&, const Point&);// 전역변수 대상의 friend 선언
        friend void ShowPointPos(const Point&);
};
Point PointOP::PointAdd(const Point& pnt1, const Point& pnt2)
{
    opcnt++;
    return Point(pnt1.x+pnt2.x, pnt1.y+pnt2.y); // private 멤버 접근
}
Point PointOP::PointSub(const Point& pnt1, const Point& pnt2)
{
    opcnt++;
    return Point(pnt1.x-pnt2.x, pnt1.y-pnt2.y);// private 멤버 접근
}

void ShowPointPos(const Point& pos)
{
    cout<<"x: "<<pos.x<<", "; // private 멤버 접근
    cout<<"y: "<<pos.y<<endl;
}
```
# C++에서의 static
* static으로 선언하면 explicit을 해도 file 내부에서만 권한을 갖게됨
* 멤버변수와 멤버함수의 static 선언을 한다면, 멤버의 성향을 갖지 않고 static 변수로 취급됨
## C언어에서의 static
* 전역변수에서 선언된 static의 의미 : 선언된 파일 내에서만 참조를 허용하겠다는 의미
* 함수 내에 선언된 static의 의미 : 한번만 초기화되고, 지역변수와 달리 함수를 빠져나가도 소멸되지 않음

```c++
void Counter()
{
    static int cnt;
    cnt ++;
    cout<<"Current cnt: "<<cnt<<endl;
}
int main(void)
{
    for(int i=0; i<10; i++)
        Counter();
    return 0;
}
// Current cnt : 1
// Current cnt : 2
// Current cnt : 3
// Current cnt : 4
// Current cnt : 5
// Current cnt : 6
// Current cnt : 7
// Current cnt : 8
// Current cnt : 9
// Current cnt : 10
```

## static 멤버 변수(클래스 변수)
* static 변수는 객체 별로 존재하는 변수가 아닌, 프로그램 전체 영역에서 하나만 존재하는 변수(하나의 변수를 각 객체가 공유하는 형식이라고 생가가면 편함)
* 클래스 선언 외부에서 별도의 초기화 과정이 필요
```c++
class SoSimple
{
    private:
        static int simObjCnt; // static 멤버 변수, 클래스 변수
    public:
        SoSimple()
        {
            simObjCnt++;
            cout<<simObjCnt<<"번째 SoSimple 객체"<<endl;
        }
};
int SoSimple::simObjCnt=0; // static 멤버변수의 초기화

```

## static 멤버변수의 접근방법
1. 클래스 내부에서의 접근
2. public 상태로 선언된 static 멤버변수의 경우 외부에서 접근이 가능
3. 객체에서 접근
```c++
class SoSimple
{
    public:
        static int simObjCnt;
    public:
        SoSimple()
        {
            simObjCnt++; // 접근1 : 클래스 내부에서의 접근
        }
};
int SoSimple::simObjCnt=0;
int main(void)
{
    cout<<SoSimple::simObjCnt<<"번째 SoSimple 객체"<<endl;
    SoSimple sim1;
    SoSimple sim2;
    cout<<SoSimple::simObjCnt<<"번째 SoSimple 객체"<<endl; // 접근2 : public으로 선언된 static 변수의 외부에서의 접근
    cout<<sim1.simObjCnt<<"번째 SoSimple 객체"<<endl;// 접근3 : 객체에서의 접근
    cout<<sim2.simObjCnt<<"번째 SoSimple 객체"<<endl;

}
```

## static 멤버함수

* static 멤버변수의 특징과 일치
* 선언된 클래스의 모든 객체가 공유
* public으로 선언되면, 클래스의 이름을 이용해서 호출이 가능
* 객체의 멤버로 존재하는 것이 아님 == 멤버변수나 멤버 함수에 접근이 불가능, static함수는 static변수에만 접근 가능하고 static함수만 호출 가능

## const static 멤버와 mutable
* const static 멤버변수는 클래스가 정의될 때 지정된 값이 유지되는 상수이기 때문에 초기화가 가능하도록 문법으로 정의
```c++
class CountryArea
{
    public:
        const static int RUSSIA = 1707540; // const 지정을 안한다면 별도의 초기화 과정이 필요함
}

```
* mutalbe로 선언된 멤버변수는 const 함수 내에서 값의 변경이 가능
```c++
class SoSimple
{
    private:
        int num1;
        mutable int num2;
    public:
        SoSimple(int n1, int n2)
            : num1(n1), num2(n2)
            {}
        void CopyToNum2() const
        {
            num2=num1;
        }
}

```
```c++


```
```c++


```