# C++의 표준과 표준 string 클래스
* 표준 string 클래스 : 헤더파일 \<string>
    * 문자열의 처리를 위한 클래스
    * 이 때 문자열은 " "로 묶어주어야함(' '은 글자한개를 묶어주는 역할)
```c++
int main(void)
{
    string str1="I like ";
    string str2="string class";
    string str3=str1+str2;
    cout << str1<<endl;
    cout << str2<<endl;
    cout << str3<<endl;
    str1+=str2;
    if(str1==str3) //str1.operator=(str3)
        cout<<"동일 문자열!"<<endl;
    else
        cout <<"동일하지 않은 문자열!"<<endl;
    string str4;
    cout<< "문자열 입력 : ";
    cin >> str4;
    cout<<"입력한 문자열 : "<<str4<<endl;
    return 0;

}
// I like
// string class
// i like string class
// 동일 문자열!
// 문자열 입력 : Hi~
// 입력한 문자열 : Hi~
```

# string 클래스의 정의
1. 문자열을 인자로 전달받는 생성자의 정의

```c++
// string class는 char * 형의 생성자가 있기 때문에 아래와 같이 정의가 가능
string str1="I like "; // string str1("I like ")
string str2="string class"; // string str1("string class")
```

```c++
class String
{
    private:
        int len;
        char * str;
    public:
        String();
        String(const char * s);
        String(const String& s);
        ~String();
        String& operator= (const String& s);
        String& operator+= (const String& s);
        bool operator== (const String& s);
        String operator+ (const String s);

        friend ostream& operator<< (ostream& os, const String& s);
        friend istream& operator>> (istream& is, String& s);



}

```

2. 생성자, 소멸자, 복사 생성자, 대입 연산자의 정의
* 생성자 내에서 문자열 저장을 위한 메모리의 동적 할당이 이루어짐

3. 결합된 문자열로 초기화된 객체를 반환하는 + 연산자의 오버로딩
* string str3=str1+str2;


```c++
String::String()
{
    len=0;
    str=NULL;
}
String::String(const char* s)
{
    len=strlen(s)+1;
    str=new char[len];
    strcpy(str,s);
}
String::String(const String& s)
{
    len=s.len;
    str=new char[len];
    strcpy(str,s.str);
}
String::~String()
{
    if(str!=NULL)
        delete []str; // str이 NULL임을 확인하고 delete
}
String& String::operator= (const String& s)
{
    if(str!=NULL)
        delete []str;
    len=s.len;
    str=new char[len];
    strcpy(str,s.str);
    return *this;
}
String& String::operator+= (const String& s) // 배열은 확장이 불가능하기 때문에 새로운 배열을 생성하고 기존 배열을 삭제
{
    len+=(s.len-1);
    char* tempstr=new char[len];
    strcpy(tempstr,str);
    strcat(tempstr,s.str);
    if (str!=NULL)
        delete []str;
    str=tempstr;
    return *this;

}
```
4. 문자열을 덧붙이는 += 연산자의 오버로딩

5. 내용비교를 진행하는 == 연산자의 오버로딩

6. 콘솔 입출력을 가능하게 하는 <<, >> 연산자의 오버로딩
```c++
String String::operator+(const String& s)
{
    char * tempstr=new char[len+s.len-1];
    strcpy(tempstr,str);
    strcpy(tempstr,s.str);
    String temp(tempstr); // String temp=tempstr;
    delete []tempstr;
    return temp;
}
ostream& operator<< (ostream& os, const String& s)
{
    os<<s.str;
    return os;
}
istream& operator>> (istream& is, String&s)
{
    char str[100];
    is>>str;
    s=String(str);
    return is;
}
bool String::operator==(const String& s)
{
    return strcmp(str,s.str) ? false:true;
}
```