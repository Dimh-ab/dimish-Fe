<script>
    const changeLanguage = () => {
        console.log("language clicked");
    };
</script>

<body>
    <img
        on:click={changeLanguage}
        src="static/images/earth.png"
        alt="Change the language"
        class="language-img"
    />
</body>

<style>
    .language-img {
        width: 45px;
        height: 45px;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        cursor: pointer;
        filter: opacity(0.5) drop-shadow(0 0 0 rgb(230, 6, 6));
    }
</style>
