<template>
    <body>

        <div class="contact-form-area equal-height container" style="padding-top: 6%; max-width: 465px;">
            <div class="contact-text">
                <h1 class="title">회원 가입</h1>

                <div class="field2" id="sign">
                    <b label for="email">이메일(아이디)</b><br>
                    <input id="email" type="text" role="textbox" placeholder="이메일을 입력해 주세요." name="email"
                        v-model="email" /><br /><br />
                </div>


                <div class="field2" id="sign">
                    <b label for="nickname">닉네임</b><br />
                    <input type="text" id="nickname" role="textbox" placeholder="닉네임을 입력해 주세요." name="nickname"
                        v-model="nickname" />
                    <input type="button" id="crosscheck" value="중복 확인"><br /><br />
                </div>

                <div class="field2">
                    <b label for="password">비밀번호</b><br />
                    <input class="userpw" id="password" type="password" role="textbox" placeholder="비밀번호를 입력해 주세요."
                        name="password" v-model="password" /><br /><br />
                </div>

                <div class="field2">
                    <b label for="passwordCheck">비밀번호 재확인</b><br />
                    <input class="userpw-confirm" id="passwordCheck" type="password" role="textbox" name="passwordCheck"
                        v-model="passwordCheck" placeholder="비밀번호를 입력해 주세요." /><br /><br />
                </div>

                <div class="field2 tel-number">
                    <b label for="phone">휴대전화(-제외)</b>
                    <div>
                        <input id="phone1" type="text" role="textbox" name="phone" placeholder="ex)00012345678"
                            v-model="phone" /><br /><br />
                    </div>
                </div>

                <div class="field2">
                    <b label for="address">주소</b><br />
                    <input type="text" id="zonecode" placeholder="우편번호" role="textbox" v-model="zonecode" readonly/>
                    <input type="button" @click="openPostcode" value="우편번호 찾기" id="postcode" name="address"><br />
                    <input type="text" id="address" placeholder="주소" role="textbox" v-model="roadAddress" style="width: 67%;"/><br />
                    <input type="text" id="addressdetail" placeholder="상세주소" role="textbox" v-model="detailAddress" style="width: 67%;"/><br />
                </div>

                <div style="position: relative; left: 125px; top: 30px" class="signUp">
                    <input type="submit" id="addallow" onclick="signUpCheck()" value="가입하기">
                </div>

            </div>
        </div>

        <div class="main" style="width: 20%"></div>

    </body>
</template>


<script>

export default {
    el: "#app2",
    data() {
        return {
            errors: [],
            email: null,
            phone: null,
            nickname: null,
            password: null,
            passwordCheck: null,
            zonecode: null,
            roadAddress: null,
            detailAddress: null


        }
    },
    methods: {
        checkForm(e) {
            e.preventDefault();
            this.errors = [];
            if (!this.nickname) {
                this.errors.push("이름은 필수입니다.");
            }

            if (!this.phone) {
                this.errors.push("전화번호는 필수입니다");
            } else if (!this.validPhone(this.phone)) {
                this.errors.push("전화번호 형식을 확인하세요.");
            }

            if (!this.email) {
                this.errors.push("이메일은 필수입니다.");
            } else if (!this.validEmail(this.email)) {
                this.errors.push("이메일 형식을 확인하세요.");
            }

            if (!this.password) {
                this.errors.push("비밀번호는 필수입니다");
            } else if (!this.validPassword(this.password)) {
                this.errors.push("비밀번호 형식을 확인하세요.");
            }

            if(!this.address){
                this.errors.push("주소는 필수입니다");
            } 

            if (!this.errors.length) return true;
        },


        validNickname: function (nickname) {
            var re0 = /^[A-Za-z가-힣]{1,6}$/
            return re0.test(nickname);
        },

        validEmail: function (email) {
            var re1 = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
            return re1.test(email);
        },

        validPhone: function (phone) {
            var re2 = /^01([0|1|6|7|8|9]?)?([0-9]{3,4})?([0-9]{4})$/
            return re2.test(phone);
        },

        validPassword: function (password) {
            var re3 = /^[A-Za-z0-9]{4,12}$/
            return re3.test(password);
        },

        validPasswordCheck: function () {
            let pw = document.getElementById("password").value
            let pwcheck = document.getElementById("passwordCheck").value

            if (pw !== pwcheck) {
                alert("비밀번호가 맞지않습니다")
            } else {
                return true;
            }
        },

        openPostcode(){
            new window.daum.Postcode({
                oncomplete: (data) => {
                    this.zonecode = data.zonecode;
                    this.roadAddress = data.roadAddress;
                },
            }).open();
        },


        signUpCheck() {

            let email = document.getElementById("email").value
            let nickname = document.getElementById("nickname").value
            let password = document.getElementById("password").value
            let passwordCheck = document.getElementById("passwordCheck").value
            let sample6_address = document.getElementById("sample6_address").value;
            let phone = document.getElementById("phone").value;
            let check = true;

            // 이메일확인
            if (email.includes('@')) {
                let emailId = email.split('@')[0]
                let emailServer = email.split('@')[1]
                if (emailId === "" || emailServer === "") {
                    document.getElementById("emailError").innerHTML = "이메일이 올바르지 않습니다."
                    check = false
                }
                else {
                    document.getElementById("emailError").innerHTML = ""
                }
            } else {
                document.getElementById("emailError").innerHTML = "이메일이 올바르지 않습니다."
                check = false
            }


            // 닉네임확인
            if (nickname === "") {
                document.getElementById("nickError").innerHTML =
                    "닉네임을 입력해주세요";
                check = false;
            } else {
                document.getElementById("nickError").innerHTML = "";
            }

            // 비밀번호 확인
            if (password !== passwordCheck) {
                document.getElementById("passwordError").innerHTML = "";
                document.getElementById("passwordCheckError").innerHTML =
                    "비밀번호가 동일하지 않습니다.";
                check = false;
            } else {
                document.getElementById("passwordError").innerHTML = "";
                document.getElementById("passwordCheckError").innerHTML = "";
            }

            if (password === "") {
                document.getElementById("passwordError").innerHTML =
                    "비밀번호를 입력해주세요.";
                check = false;
            } else {
                //document.getElementById("passwordError").innerHTML=""
            }
            if (passwordCheck === "") {
                document.getElementById("passwordCheckError").innerHTML =
                    "비밀번호를 다시 입력해주세요.";
                check = false;
            } else {
                //document.getElementById("passwordCheckError").innerHTML=""
            }

            // 전화번호 확인
            if (phone === "") {
                document.getElementById("phoneError").innerHTML =
                    "전화번호를 입력해주세요";
                check = false;
            } else {
                document.getElementById("phoneError").innerHTML = "";
            }


            // 주소 확인
            if (sample6_address === "") {
                document.getElementById("addressError").innerHTML =
                    "주소를 입력해주세요";
                check = false;
            } else {
                document.getElementById("addressError").innerHTML = "";
            }

            if (check) {
                document.getElementById("emailError").innerHTML = ""
                document.getElementById("nickError").innerHTML = "";
                document.getElementById("passwordError").innerHTML = "";
                document.getElementById("passwordCheckError").innerHTML = "";
                document.getElementById("addressError").innerHTML = "";
                document.getElementById("phoneError").innerHTML = "";

                //비동기 처리이벤트
                setTimeout(function () {
                    alert("가입이 완료되었습니다.")
                    onclick = location.href = "login.html";
                });
            }
        },

        
    }
}

</script>


<style>
@import "Signup.css";



.error {
    font-size: 1px;
    height: 20px;
    color: red;
    font-weight: 700;
}</style>