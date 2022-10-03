import { addMessages, init } from "svelte-i18n";
    import en from "./en.json";
    import sv from "./sv.json";
    import hr from "./hr.json"

    addMessages("en", en);
    addMessages("sv", sv);
    addMessages("hr", hr);

    init({ fallbackLocale: "en", initialLocale: "en" });