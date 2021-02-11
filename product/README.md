# EJN Frontend assignment

![ 스크린샷 ](/etc/screenshot.png)

```bash
# 폴더로 이동 (<workspace>/hello-ejn/product)
cd ./product

# 패키지 설치
yarn

# devServer 실행
yarn dev
```

## 데모 사이트

- https://divlook-todo.netlify.app/

## 프로젝트 스펙

### 사용 언어

Typescript

### Framework

Vue

### Database

IndexedDB (jsstore)

## 설명

Vue.js 관련 라이브러리는 vuex, vue-class-component, vue-property-decorator 정도 사용하였고

페이지 이동이 없을 것으로 예상되어 vue-router는 사용하지 않았습니다.

오프라인 환경에서도 사용할 수 있는 앱을 만들기 위해 @vue/pwa 플러그인을 사용하였고 백업용 데이터 저장소는 IndexedDB를 선택하였습니다.

문제 내용을 토대로 와이어프레임을 그려본 뒤 문제 해결을 위한 최소한의 스펙으로만 UI 컴포넌트들을 구현하였습니다.

## 와이어 프레임

![ 와이어 프레임 ](/etc/wireframe.png)
