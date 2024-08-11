# Anaconda
* python은 기본모듈로 venv를 사용한 가상환경을 만들 수 있지만 이 경우에는 해당 python 버전으로만 사용가능
* conda는 파이썬의 버전이 다르더라도 가상환경을 파이썬버전에 맞춰서 형성해줌
* conda는 venv와 달리 아나콘다 설치 디렉토리 안쪽으로 디렉토리가 형성됨
    * 기본경로 : /Users/brayden/opt/anaconda3

## Anaconda 명령어
* conda env list : 가상환경 목록 보기
* conda create -n <가상환경이름> python =<버전>
    : 가상환경 생성 => conda create -n TestEnv python=3.7
* conda env remove -n <가상환경이름> : 가상환경 삭제
* conda activate <가상환경이름> : 가상환경 실행
* conda deactivate : 가상환경 종료
* conda list : 현재 가상환경에서 설치되어 있는 패키지 확인
* conda install <패키지 이름> : 현재 가상환경에서 라이브러리 설치
    * conda install numpy pandas
* conda uninstall <패키지 이름> : 현재 가상환경에서 라이브러리 삭제
* conda create --name <복사하여 생성할 가상환경명> --clone <복사할 가상환경명>
    : conda create --name NewProject --clone OldProject
* conda env create --file <yml파일명.yml or yaml> : yml/yaml 파일을 참고해서 가상환경 생성(안에 설정된 라이브러리를 기준으로 가상환경 생성)
* conda env update --file <yml파일명.yml or yaml> --prune: yml/yaml 파일을 덮어쓰기(가상환경 실행 후 사용가능)
    * conda env update --file environment.yml --prune
* conda env export --f <yml파일명.yml or yaml> : 현재 가상환경의 yml 생성