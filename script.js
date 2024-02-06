const DEFAULT_MESSAGE = "Please enter the password:";
const DEFAULT_PASSWORD = "hello world";

const source = document.querySelector("#source");
const target = document.querySelector("#target");
const message = document.querySelector("#message");
const password = document.querySelector("#password");
const btn = document.querySelector("button");

message.setAttribute(
  "placeholder",
  `Custom message (default: '${DEFAULT_MESSAGE}')`
);
password.setAttribute(
  "placeholder",
  `Custom password (default: '${DEFAULT_PASSWORD}')`
);

btn.addEventListener("click", function () {
  const html = source.value;
  const cryptoJSScript = document.head.querySelector("#cryptojs");

  if (!html) {
    alert("The HTML code is mandatory.");
    return;
  }

  target.value = "Working on it...";

  const encrypted = CryptoJS.AES.encrypt(
    html,
    password.value || DEFAULT_PASSWORD
  ).toString();

  const template = `
            <html>
                <head>
                    <title>Login to access the website</title>
                    ${cryptoJSScript.outerHTML}
                    <script defer>
                        while(1) {
                            const input = prompt("${
                              message.value || DEFAULT_MESSAGE
                            }");
                            try {
                                const result = CryptoJS.AES.decrypt('${encrypted}', input).toString(CryptoJS.enc.Utf8);
                                if(result) {
                                    document.write(result);
                                    break;
                                }
                            } catch(e) {
                              console.error(e);
                            }
                        }
                    <\/script>
                </head>
                <body></body>
            </html>
        `.replace(/(\s)+/g, "$1");

  target.value = template;
});
