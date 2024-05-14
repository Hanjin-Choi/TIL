# Authentication with DRF
## 개요
* 인증 로직 진행을 위해 User 모델 관련 코드 활성화




## 인증(Authentication)
* 수신된 요청을 해당 요청의 사용자 또는 자격 증명과 연결하는 메커니즘
* 누구인지를 확인하는 과정
### 권한(Pemissions)
* 요청에 대한 접근 허용 또는 거부 여부를 결정

### 인증과 권한
* 순서상 인증이 먼저 진행되며 수신요청을 해당 요청의 사용자 또는 해당 요청이 서명된 토큰(token)과 같은 자격 증명 자료와 연결
* 그런 다음 권한 및 제한 정책은 인증이 완료된 해당 자격 증명을 사용하여 요청을 허용해야 하는 지를 결정

#### DRF에서의 인증
* 인증은 항상 view함수 시작시, 권한 및 제한 확인 발생하기 전, 다른 코드의 진행이 허용되기 전에 실행됨
* 인증 자체로는 들어오는 요청을 허용하거나 거부할 수 없으며, 단순히 요청에 사용된 자격 증명만 식별한다는 점에 유의
* https://www.django-rest-framework.org/api-guide/authentication/

#### 승인되지 않은 응답 및 금지된 응답
* 인증되지 않은 요청이 권한을 거부하는 경우 해당되는 두가지 오류 코드를 응답
1. HTTP 401 Unathorized
    - 요청된 리소스에 대한 유효한 인증 자격 증명이 없기 때문에 클라이언트 요청이 완료되지 않았음을 나태냄(누구인지를 증명할 자료가 없음)
2. HTTP 403 Forbidden(Permission Denied)
    - 서버에 요청이 전달되었지만, 권한 때문에 거절되었다는 것을 의미
    - 401과 다른점은 서버는 클라이언트가 누구인지 알고 있음


## 인증 체계 설정
### 1. 전역설정
* DEFAULT_AUTHENTICATION_CLASSES를 사용
* 사용예시

![전역설정](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%EC%A0%84%EC%97%AD%EC%84%A4%EC%A0%95.PNG)

### 2. View 함수 설정
* authentication_classes 데코레이터를 사용
* 사용예시

![view 함수 설정](<../이미지/240514/view 함수 설정.PNG>)

### DRF가 제공하는 인증 체계
1. BasicAuthentication
2. TokenAuthentication
3. SessionAuthentication
4. RemoteUserAuthentication
#### TokenAuthentication
* token 기반 HTTP 인증 체계
* 기본 데스크톱 및 모바일 클라이언트와 같은 클라이언트-서버 설정에 적합
* 서버가 인증된 사용자에게 토큰을 발급하고 사용자는 매 요청마다 발급받은 토큰을 요청과 함께 보내 인증 과정을 거침
* https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication

## Token 인증 설정
### 1. 인증 클래스 설정
* TokenAuthentication 활성화 코드 작성
* 기본적으로 모든 view함수가 토큰 기반 인증이 진행될 수 있도록 설정하는 것

![인증 클래스 설정](<../이미지/240514/인증 클래스 설정.PNG>)

### 2. INSTALLED_APPS 추가
* rest_framework.authtoken 추가

![token installed app 추가](<../이미지/240514/token installed app 추가.PNG>)

### 3. Migrate 진행
```bash
$ python manage.py migrate
```

### 4. 토큰 생성 코드 작성
* accounts/signals.py 작성
    * signals.py
        * 사용자가 어떠한 조건을 성공했을 때 실행되는 파일 여기서는 로그인에 성공했을때 실행되는 파일
* 인증된 사용자에게 자동으로 토큰을 생성해주는 역할
![토큰생성코드 작성](<../이미지/240514/토큰생성코드 작성.PNG>)
## Dj-Rest-Auth 라이브러리
* 회원가입, 인증(소셜미디어 인증 등), 비밀번호 재설정, 사용자 세부 정보 검색, 회원 정보 수정 등 다양한 인증 관련 기능을 제공하는 라이브러리

### Dj-Rest-Auth 설치 및 적용
1. 설치
```bash
$ pip install dj-rest-auth
```
2. dj_rest_auth 앱 등록

![dj_rest_auth 앱등록](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/djrestauth%EB%93%B1%EB%A1%9D.PNG)

3. urls.py 작성

![dj rest auth url 작성](<../이미지/240514/dj rest auth url 작성.PNG>)

### Dj-Rest-Auth의 Registration(등록) 기능 추가 설정
* https://dj-rest-auth.readthedocs.io/en/latest/installation.html#registration-optional
1. 패키지 추가 설치
```bash
$ pip install 'dj-rest-auth[with_social]'
```

2. 추가 App 등록

![registration app 등록](<../이미지/240514/registration app 등록.PNG>)

3. setting 설정

![registration settings 설정](<../이미지/240514/registration settings 설정.PNG>)

4. 추가 URL 등록

![registration URL 등록](<../이미지/240514/registration URL 등록.PNG>)

5. Migrate
```bash
$ python manage.py migrate
```

## Token 발급 및 활용
* 회원 가입 및 로그인을 진행하여 토큰 발급 테스트
* 라이브러리 설치로 인해 추가된 URL 목록 확인
    - http://127.0.0.1:8000/accounts/

    ![Token 발급1](<../이미지/240514/토큰발급 및 활용1.PNG>)

* 회원 가입 진행(DRF 페이지 하단 회원 가입 form 사용)
    - http://127.0.0.1:8000/accounts/signup/

    ![Token 발급2](<../이미지/240514/토큰발급 및 활용2.PNG>)

* 로그인 진행(DRF 페이지 하단 로그인 form 사용)
    - http://127.0.0.1:8000/accounts/login/

    ![Token 발급3](<../이미지/240514/토큰발급 및 활용3.PNG>)

* 로그인 성공 후 DRF로부터 발급 받은 Token 확인

    ![Token 발급4](<../이미지/240514/토큰발급 및 활용4.PNG>)
* Token을 Vue에서 별도로 저장하여 매 요청마다 함께 보내야 함

### Token 활용
* 게시글 작성과정을 통해 Token 사용 방법 익히기
* Postman을 활용해 게시글 작성 요청
* Body에 게시글 제목과 내용 입력

![Token 활용1](<../이미지/240514/Token 활용1.PNG>)

* Headers에 발급받은 Token 작성 후 요청 성공 확인
    * Key : 'Authorization'
    * Value : 'Token 토큰 값'

    ![Token 활용2](<../이미지/240514/Token 활용2.PNG>)

    ![Token 활용3](<../이미지/240514/Token 활용3.PNG>)

### 클라이언트가 Token으로 인증 받는 방법
1. 'Authorization' HTTP Header에 포함
2. 키 앞에는 문자열 "Token"이 와야 하며 "공백"으로 두 문자열을 구분해야함

![클라이언트가 Token인증 받는 방법](<../이미지/240514/클라이언트 Token 인증.PNG>)

* https://www.django-rest-framework.org/api-guide/authentication/#tokenauthentication

* 발급 받은 Token을 인증이 필요한 요청마다 함께 보내야 함

## 권한 정책 설정
### 1. 전역 설정
* DEFAULT_PERMISSION_CLASSES를 사용
* 사용예시

![Defualt permission classes](<../이미지/240514/Default permission classes.PNG>)

* 지정하지 않을 경우 이설정은 기본적으로 무제한 액세스를 허용

![Defualt permission classes 미지정](<../이미지/240514/default permission class 미 지정.PNG>)


### 2. View 함수 별 설정
* permission_classes 데코레이터를 사용
* 사용예시
![Token view 함수별 설정](<../이미지/240514/Token view 함수 별 설정.PNG>)

## DRF가 제공하는 권한 정책
1. IsAuthenticated
2. IsAdminUser
3. IsAuthenticatedOrReadOnly

## IsAutheticated 권한 설정
* 인증되지 않은 사용자에 대한 권한을 거부하고 그렇지 않은 경우 권한을 허용
* 등록된 사용자만 API에 액세스할 수 있도록 하려는 경우에 적합

1. DEFAULT_PERMISSION_CLASSES 작성
* 기본적으로 모든 view 함수에 대한 접근을 허용

![isAuthenticated 권한 설정](<../이미지/240514/isAuthenticated 권한 설정.PNG>)

2. permission_classes 관련 코드 주석 해제
* 전체 게시글 조회 및 생성시에만 인증된 사용자만 진행할 수 있도록 권한 설정

![isAuthenticated 권한 설정](<../이미지/240514/isAuthenticated 권한 설정2.PNG>)

### isAuthenticated 권한 활용
1. 만약 관리자만 전체 게시글 조회가 가능한 권한이 설정되었을 때, 인증된 일반 사용자가 조회 요청을 할 경우 어떻게 되는지 응답 확인하기
* 테스트를 위해 임시로 관리자 관련 권한 클래스 IsAdminUser로 변경

![IsAdminUser로 변경](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/isAdminUser.PNG)

2. 전체 게시글 조회 요청
    - http://127.0.0.1:8000/api/v1/articles/
    * 403 응답 확인
![IsAdminUser 조회 요청](<../이미지/240514/isAdminUser 전체게시글 조회요청.PNG>)

3. IsAdminUser 삭제 후 IsAuthenticated 권한으로 복구

![권한 복구](<../이미지/240514/권한 복구.PNG>)

# Authentication with Vue

* 정상작동하던 게시글 전체 조회가 작동하지 않음
    - 401 status code 확인
* 게시글 조회 요청시 인증에 필요한 수단(token)을 보내지 않고 있으므로 게시글 조회가 불가능해진 것

![authentication with vue](<../이미지/240514/authentication with vue.PNG>)

## 회원가입
1. SignUpView route 코드 작성

![회원가입1](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%851.PNG)

2. App 컴포넌트에 SignUpView 컴포넌트로 이동하는 RouterLink 작성

![회원가입2](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%852.PNG)

3. 회원가입 form 작성

![회원가입3](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%853.PNG)

4. 사용자 입력 데이터와 바인딩 될 반응형 변수 작성

![회원가입4](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%854.PNG)

5. SignUpView 컴포넌트 출력 확인

![회원가입5](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%855.PNG)

6. 회원가입 요청을 보내기 위한 signUp 함수가 해야할 일
* 사용자 입력 데이터를 받아 서버로 회원가입 요청을 보냄

![회원가입6](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%856.PNG)

7. 컴포넌트에 사용자 입력 데이터를 저장 후 store의 signUp 함수를 호출하는 함수 작성

![회원가입7](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%857.PNG)

8. 실제 회원가입 요청을 보내는 store의 signUp 함수 작성

![회원가입8](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%858.PNG)

9. 회원가입 테스트

![회원가입9](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%859.PNG)

10. Django DB 확인

![회원가입10](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%8510.PNG)

## 로그인
### 로그인 로직 구현
1. LoginInView route 관련 코드 작성

![로그인1](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%EB%A1%9C%EA%B7%B8%EC%9D%B81.PNG)

2. App 컴포넌트에 LogInView 컴포넌트로 이동하는 RouterLink 작성

![로그인2](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%EB%A1%9C%EA%B7%B8%EC%9D%B82.PNG)

3. 로그인 form 작성

![로그인3](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%EB%A1%9C%EA%B7%B8%EC%9D%B83.PNG)

4. 사용자 입력 데이터와 바인딩 될 반응형 변수 작성

![로그인4](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%EB%A1%9C%EA%B7%B8%EC%9D%B84.PNG)

5. LogInView 컴포넌트 출력 확인

![로그인5](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%EB%A1%9C%EA%B7%B8%EC%9D%B85.PNG)

6. 로그인 요청을 보내기 위한 logIn 함수가 해야할 일 
    * 사용자 입력 데이터를 받아 서버로 로그인 요청 및 응답 받은 토큰 저장

![로그인6](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%EB%A1%9C%EA%B7%B8%EC%9D%B86.PNG)

7. 컴포넌트에 사용자 입력 데이터를 저장 후 store의 logIn 함수를 호출하는 함수 작성

* 컴포넌트에 사용자 입력 데이터를 저장 후 store의 logIn 함수를 호출하는 함수 작성

![로그인7](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%EB%A1%9C%EA%B7%B8%EC%9D%B87.PNG)

8. 실제 로그인 요청을 보내는 store의 logIn 함수 작성

![로그인8](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%EB%A1%9C%EA%B7%B8%EC%9D%B88.PNG)

9. 로그인 테스트
* 응답 객체 안에 Django가 발급한 Token이 함께 온 것을 확인

![로그인9](../%EC%9D%B4%EB%AF%B8%EC%A7%80/240514/%EB%A1%9C%EA%B7%B8%EC%9D%B89.PNG)

## 토큰 저장 로직 구현
* Token을 store에 저장하여 인증이 필요한 요청마다 함께 보낸다.

1. 반응형 변수 token 선언 및 토큰 저장

![토큰 저장 로직 구현](<../이미지/240514/토큰 저장 로직 구현1.PNG>)

2. 다시 로그인 요청 후 store에 저장된 토큰 확인

![토큰 저장 로직 구현 결과](<../이미지/240514/토큰 저장 로직 구현 결과.PNG>)

### 토큰이 필요한 요청
1. 게시글 전체 목록 조회 시
2. 게시글 작성 시

#### 게시글 전체 목록 조회 with token
1. 게시글 전체 목록 조회 요청 함수 getArticles에 token 추가

![게시글 전체 목록 조회 with token1](<../이미지/240514/게시글 전체 목록 조회 with token1.PNG>)

2. 401상태 코드가 사라지고 게시글이 정상적으로 출력되는 것을 확인

![게시글 전체 목록 조회 with token2](<../이미지/240514/게시글 전체 목록 조회 with token2.PNG>)

#### 게시글 작성 with token
1. 게시글 전체 목록 조회 요청 함수 getArticles에 token 추가

![게시글 작성 with token1](<../이미지/240514/게시글 작성 with token.PNG>)

2. 게시글 작성 확인

![게시글 작성 with token2](<../이미지/240514/게시글 작성 with token2.PNG>)

## 인증 여부 확인
* 사용자의 인증(로그인) 여부에 따른 추가 기능 구현
    1. 인증되지 않은 사용자 : 메인 페이지 접근 제한
    2. 인증된 사용자 : 회원가입 및 로그인 페이지에 접근 제한

### 인증 상태 여부를 나타낼 속성값 지정
* token 소유 여부에 따라 로그인 상태를 나타낼 isLogin 변수 작성
* 그리고 computed를 활용해 token 값이 변할 때만 상태를 계산하도록 함

![인증 상태 속성값 지정](<../이미지/240514/인증 상태 여부를 나타낼 속성값 지정.PNG>)

### 1. 인증되지 않은 사용자는 메인 페이지 접근 제한
* 전역 네비게이션 가드 beforeEach를 활용해 다른 주소에서 메인페이지로 이동 시 인증되지 않은 사용자라면 로그인 페이지로 이동시키기

![인증되지 않은 사용자 메인페이지 접근 제한](<../이미지/240514/인증되지 않은 사용자 메인페이지 접근 제한.PNG>)

![인증되지 않은 사용자 메인페이지 접근 제한 결과](<../이미지/240514/인증되지 않은 사용자 메인페이지 접근 제한2.PNG>)

### 2. 인증된 사용자는 회원가입과 로그인 페이지에 접근 제한
* 다른 주소에서 회원가입 또는 로그인 페이지로 이동시 이미 인증된 사용자라면 메인 페이지로 이동시키기

![인증된 사용자는 회원가입과 로그인 페이지에 접근 제한](<../이미지/240514/인증된 사용자는 회원가입과 로그인 페이지에 접근 제한.PNG>)

![인증된 사용자는 회원가입과 로그인 페이지에 접근 제한 결과](<../이미지/240514/인증된 사용자는 회원가입과 로그인 페이지에 접근 제한2.PNG>)

## 기타 기능 구현
### 자연스러운 애플리케이션을 위한 기타 기능 구현
1. 로그인 성공 후 자동으로 메인 페이지로 이동

![로그인 성공 후 자동으로 메인페이지로 이동](<../이미지/240514/로그인 성공 후 자동으로 메인페이지로 이동.PNG>)

2. 회원가입 성공 후 자동으로 로그인까지 진행

![회원가입 성공 후 자동으로 로그인까지 진행](<../이미지/240514/회원가입 성공 후 자동으로 로그인까지 진행.PNG>)

# 참고
## Django Signals
* '이벤트 알림 시스템'
* 애플리케이션 내에서 특정 이벤트가 발생할 때, 다른 부분에게 신호를 보내어 이벤트가 발생했음을 알릴 수 있음
* 주로 모델의 데이터 변경 또는 저장, 삭제와 같은 작업에 반응하여 추가적인 로직을 실행하고자 할때 사용
    * 예를 들어, 사용자가 새로운 게시글을 작성할 때마다 특정 작업(예: 이메일 알림 보내기)을 수행하려는 경우

## 환경변수(environment variableg)

* 애플리케이션의 설정이나 동작을 제어하기 위해 사용되는 변수

### 환경변수의 목적
* 개발, 테스트 및 프로덕션 환경에서 다르게 설정되어야 하는 설정 값이나 민감한 정보(ex. API key)를 포함
* 환경 변수를 사용하여 애플리케이션의 설정을 관리하면, 다양한 환경에서 일관된 동작을 유지하면서 필요에 따라 변수를 쉽게 변경할 수 있음
* 보안적인 이슈를 피하고, 애플리케이션을 다양한 환경에 대응하기 쉽게 만들어줌

### Vite에서 환경변수를 사용하는법
* https://vitejs.dev/guide/env-and-mode.html

![Vite 환경 변수](<../이미지/240514/vite 환경 변수.PNG>)

## Vue 프로젝트 진행시 유용한 자료
* Awesome Vue.js
    - Vue와 관련하여 선별된 유용한 자료를 아카이빙 및 관리하는 프로젝트
    - https://github.com/vuejs/awesome-vue
    - https://awesome-vue.js.org/

* Vuetify
    - Vue를 위한 UI 라이브러리(like 'Bootstrap')
    - https://vuetifyjs.com/en/

* https://poiemaweb.com