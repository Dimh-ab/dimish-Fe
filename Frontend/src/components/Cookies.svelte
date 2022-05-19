<script>
    const acceptCookie = () => {
        const setCookie = (cName, cValue, expDays) => {
            let date = new Date();
            date.setTime(date.getTime() + expDays * 24 * 60 * 60 * 1000);
            const expires = "expires=" + date.toUTCString();
            document.cookie = cName + "=" + cValue + ";" + expires + "; path=/";
        };

        const getCookie = (cName) => {
            const name = cName + "=";
            const decodedCookie = decodeURIComponent(document.cookie);
            const cArr = decodedCookie.split("; ");
            let value;
            cArr.forEach((val) => {
                if (val.indexOf(name) === 0) {
                    value = val.substring(name.length);
                }
            });
            return value;
        };

        document.getElementById("cookies-btn").addEventListener("click", () => {
            document.getElementById("cookies").style.display = "none";
            setCookie("cookie", true, 30);
            console.log("cookie");

            var addGoogleAnalytics = document.createElement("script");
            addGoogleAnalytics.setAttribute(
                "src",
                "https://www.googletagmanager.com/gtag/js?id=UA-144484874-6"
            );
            addGoogleAnalytics.async = "true";
            document.head.appendChild(addGoogleAnalytics);

            var addDataLayer = document.createElement("script");
            var dataLayerData = document.createTextNode(
                "window.dataLayer = window.dataLayer || []; \n function gtag(){dataLayer.push(arguments);} \n gtag('js', new Date()); \n gtag('config', 'G-MYIDHERE');"
            );
            addDataLayer.appendChild(dataLayerData);
            document.head.appendChild(addDataLayer);
        });

        const cookieMsg = () => {
            if (!getCookie("cookie")) {
                document.getElementById("cookies").style.display = "block";
            }
        };

        window.addEventListener("load", cookieMsg);
    };

    const declineCookie = () => {
        document
            .getElementById("cookies-decline-btn")
            .addEventListener("click", () => {
                document.getElementById("cookies").style.display = "none";
            });
    };
</script>

<body>
    <div id="cookies">
        <div class="container">
            <div class="subcontainer">
                <div class="cookies">
                    <img
                        src="/static/images/pngwing.com.png"
                        alt="cookies-girl"
                        class="cookies-img"
                    />
                    <p>
                        This website uses cookies to ensure you get the best
                        experience on our website. 
                        <!-- <a href="https://www.termsfeed.com/">More info</a> -->
                    </p>
                    <button id="cookies-btn" use:acceptCookie>Yum, cookies! 🍪</button>
                    <button id="cookies-decline-btn" use:declineCookie
                        >No, thanks 😋 </button
                    >
                </div>
            </div>
        </div>
    </div>
</body>

<style>
    * {
        margin: 0;
        padding: 0;
    }

    body {
        font-family: "Open Sans", sans-serif;
        font-size: 1rem;
    }

    .container {
        width: 1600px;
        margin: auto;
    }

    .subcontainer {
        width: 85%;
        margin: auto;
    }

    #cookies {
        width: 100%;
        position: fixed;
        bottom: 0;
        color: white;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 1;
        display: none;
        padding: 1rem 0rem;
    }

    .cookies-img {
        width: 4rem;
        height: auto;
    }

    p {
        color: rgb(226, 220, 202);
    }

    .cookies {
        min-height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 20px;   
    }

/*     .cookies a {
        color: burlywood;
        font-weight: 500;
        text-decoration: none;
    } */

    #cookies-btn {
        border-radius: 5px;
        padding: 8px 12px;
        font-size: 1rem;
        font-family: inherit;
        cursor: pointer;
        border: 1px solid white;
        background-color: rgb(128, 105, 76);
        color: white;
    }

    #cookies-decline-btn {
        cursor: pointer;
        background: none;
        color: rgb(182, 155, 123);
        border: none !important;
        outline: none !important;
    }

    @media (max-width: 1600px) {
        .container {
            width: 100%;
        }
    }

    @media (max-width: 1024px) {
        .cookies {
            padding: 10px 0;
        }
    }
</style>
