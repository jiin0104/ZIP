// Vuex 어플리케이션의 모든 컴포넌트들에 대한 중앙 집중식 저장소의 역할 및 관리 를 담당. 여기선 로그인을 통해 바당온 회원 테이블를 저장
//데이터를 Store라는 곳을 통해서 관리하고 프로젝트에 존재하는 모든 컴포넌트들이 이 Store를 사용하는 것
import { createStore } from "vuex";
//싱글페이지 구조에서 새로고침 안해도 페이지가 렌딩되게 하는 모듈
//vuex의 state에 저장된 값을 그대로 리턴해주는 원리
import createPersistedState from "vuex-persistedstate";

const store = createStore({
  state() {
    //공통으로 참조하기 위한 변수를 정의. State에 접근하는 것은 Component의 computed 영역내에서 가능. 기본 접근 방법: this.$store.state.items
    return {
      user: null,
      userId: '',
      userPw: '',
      userNo: '',
      isLogin: '',
      isLoginError: ''
    };
  },
  mutations: {
    //Mutation을 통해서만 State를 변경. 함수작성. Mutations에 접근하는 것은 Component의 Methods 영역내에서 가능. 기본 접근 방법: this.$store.commit('경로명/함수명')
    
    // 저장된 유저 정보와 불러온 유저 정보가 일치하는지 확인
    localUser(state, payload) {
      state.userId = payload.userId;
      state.userPw = payload.userPw;
      state.userNo = payload.userNo;
    },
    user(state, data) {
      state.user = data;
    },
    loginSuccess(state) {
      state.isLogin = true
      state.isLoginError = false
    },
    loginOut(state) {
      state.isLogin = false
      state.isLoginError = false
    },
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
  },

  plugins: [
    createPersistedState()
  ]
});

export default store;