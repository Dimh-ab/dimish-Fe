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
        <option value="en"> <img src="static/images/icons8-great-britain-48.png" alt="English" height="80px" width="80px"> 🇬🇧 </option>
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

    option {
        text-align: center;        
    }

    .language-img {
        width: 55px;
        height: 40px;
        position: fixed;
        bottom: .65em;
        right: 1rem;
        cursor: pointer;
        color: rgb(255, 6, 6);
        /* filter: opacity(0.5) drop-shadow(0 0 0 rgb(230, 6, 6)); */
        /* filter: invert(); */
        z-index: 2;
    }
</style>
