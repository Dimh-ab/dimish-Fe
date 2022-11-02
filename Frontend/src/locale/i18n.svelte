<script>
    import { locale } from "svelte-i18n";

    const handleLocaleChange = (e) => {
        e.preventDefault();
        locale.set(e.target.value);
    };

    const changeLanguage = () => {
        console.log("language clicked");
    };
</script>

<body>
    <select on:change={handleLocaleChange} class="language-img">
        <option value="en">🇬🇧</option>
        <option value="sv">🇸🇪</option>
        <option value="hr">🇭🇷</option>
    </select>

    <!-- <img
        on:click={changeLanguage}
        src="static/images/earth.png"
        alt="Change the language"
        class="language-img"
    /> -->
</body>

<style>
    select {
        appearance: none;
        background-color: transparent;
        border: none;
    }

    select option {
        background-color: #2c2727;
    }

    option {
        text-align: center;
    }

    .language-img {
        width: 55px;
        height: 40px;
        position: fixed;
        bottom: 0.65em;
        right: 1rem;
        cursor: pointer;
        color: white;
        /* filter: opacity(0.5) drop-shadow(0 0 0 rgb(230, 6, 6)); */
        /* filter: invert(); */
        z-index: 2;
    }
</style>
