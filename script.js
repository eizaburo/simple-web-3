//要素の取得（一般）
const title = document.getElementById("title");
const email = document.getElementById("email");
const message = document.getElementById("message");
const button = document.getElementById("button");

//要素の取得（エラーメッセージ）
const error_message_title = document.getElementById("error-message-title");
const error_message_email = document.getElementById("error-message-email");
const error_message_message = document.getElementById("error-message-message");

//正規表現
const title_regexp = /^.{1,10}$/;
const email_regexp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const message_regexp = /^.{1,10}$/;


// 各入力欄のキー入力イベントリスナーを最初に一度だけ登録します
title.addEventListener("keyup", () => {
    if (title_regexp.test(title.value)) {
        error_message_title.classList.remove("show");
    } else {
        error_message_title.classList.add("show");
    }
});

email.addEventListener("keyup", () => {
    if (email_regexp.test(email.value)) {
        error_message_email.classList.remove("show");
    } else {
        error_message_email.classList.add("show");
    }
});

message.addEventListener("keyup", () => {
    if (message_regexp.test(message.value)) {
        error_message_message.classList.remove("show");
    } else {
        error_message_message.classList.add("show");
    }
});

button.addEventListener("click", async (e) => {

    e.preventDefault();

    if (!title_regexp.test(title.value)) {
        error_message_title.classList.add("show");
    }

    if (!email_regexp.test(email.value)) {
        error_message_email.classList.add("show");
    }

    if (!message_regexp.test(message.value)) {
        error_message_message.classList.add("show");
    }

    if (!error_message_title.classList.contains("show") &&
        !error_message_email.classList.contains("show") &&
        !error_message_message.classList.contains("show")) {

        //送信処理
        // alert(`title:${title.value}, email:${email.value}, message:${email.value}`);
        
        //自分のURLに置き換える
        const url = "https://script.google.com/macros/s/deploy_id/exec";

        try {
            // 送信処理中にボタンを無効化します
            button.disabled = true;

            //送信処理
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    title: title.value,
                    email: email.value,
                    message: message.value
                }).toString()
            });

            const text = await response.text();

            alert(text);

        } catch (error) {
            alert(error);
        } finally {
            // 値をリセット
            title.value = "";
            email.value = "";
            message.value = "";

            // 処理完了後、成功・失敗にかかわらずボタンを再度有効化します
            button.disabled = false;
        }
    }
});