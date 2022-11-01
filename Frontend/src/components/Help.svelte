<script>
    import { _ } from "svelte-i18n";
    import { fly } from "svelte/transition";
    let showDesc = false;
    let key = "";

    $: console.log(key);
</script>

<main>
    <button
        class="help-button"
        tabindex="0"
        on:click={() => (showDesc = !showDesc)}>?</button
    >

    {#if showDesc}
        <article
            transition:fly={{ y: -20 }}
            alt="Photo by Tim Mossholder on Unsplash"
        >
            <h3>{$_("helpTitle")}</h3>
            <div class="text">
                <p>
                    {$_("helpP1")}
                </p>
                <br />
                <p>
                    {$_("helpP2")}
                </p>
                <p>
                    {$_("helpP3")}
                </p>
                <br />
                <p>
                    {$_("helpP4")}
                </p>
            </div>
            <div>
                <!-- svelte-ignore a11y-missing-attribute -->
                <!-- <iframe src="https://embed.lottiefiles.com/animation/7249"></iframe> -->
                <button
                    class="continueBTN"
                    on:click={() => (showDesc = !showDesc)}>{$_("helpContinue")}</button
                >
            </div>
        </article>
    {/if}
</main>

<svelte:window on:keydown={(e) => (key = e.key)} />

<style>
    article {
        background-image: url("../images/chalkboardDesc.jpg");
        background-size: cover;
        position: absolute;
        top: 50px;
        left: 200px;
        right: 200px;
        height: 480px;
        border-radius: 3px;
        border: 15px solid #deb886;
        box-shadow: 3px 3px 30px rgb(0, 0, 0);
        z-index: 2;
    }

    .text {
        margin: 40px;
    }

    h3 {
        color: white;
        font-family: "Cabin Sketch", cursive;
        font-size: 2.5em;
        text-align: center;
        margin-top: 15px;
    }

    p {
        color: white;
        font-family: "Cabin Sketch", cursive;
        font-size: 1.6em;
    }

    button {
        position: fixed;
        cursor: pointer;

        /* filter: opacity(0.5) drop-shadow(0 0 0 rgb(143, 44, 44)); */
        color: black;
        border: 2px solid black;
        font-weight: 600;
        font-size: 1.5em;
        border-radius: 90px;
        padding: 3px 14px;
        left: 0;
        bottom: 0.2rem;
        margin: 15px;
        z-index: 2;
        background-color: rgba(255, 255, 255, 0.7);
    }

    button:focus-visible {
        outline: 2px solid white;
    }

    .continueBTN {
        font-family: "Cabin Sketch", cursive;
        color: white;
        border: 1px solid white;
        position: absolute;
        background-color: transparent;
        right: 0;
        bottom: 0;
        margin: 0.7em 1em;
        z-index: 2;
        width: 200px;
        transition-duration: 0.2s;
    }

    .continueBTN:hover {
        color: rgb(229, 229, 0);
        border: 1px solid rgb(229, 229, 0);
        transform: scale(1.1);
    }

    @media only screen and (max-width: 1000px) {
        article {
            top: 10px;
            left: 50px;
            /* right: 150px; */
            height: 330px;
            width: 700px;
            margin: 10px;
        }

        h3 {
            font-size: 2em;
        }

        p {
            font-size: 1.3em;
        }

        .text {
            margin: 10px 40px;
        }
    }

    /* @media only screen and (max-width: 920px) {
            article{
                left: 120px;
                right: 120px;
            }
        } */

    /* @media only screen and (max-width: 820px) {
            article{
                left: 80px;
                right: 80px;
            }
        } */

    @media only screen and (max-width: 768px) {
        article {
            top: 10px;
            left: 50px;
            /* right: 150px; */
            height: 300px;
            width: 600px;
            margin: 10px;
        }

        h3 {
            font-size: 1.8em;
            margin-top: 2px;
        }

        p {
            font-size: 1.1em;
        }

        .text {
            margin: 5px 20px;
        }

        br {
            display: none;
        }

        .continueBTN {
            width: 150px;
            margin: 5px 20px;
        }
    }

    @media only screen and (max-width: 660px) {
        article {
            top: 10px;
            left: 50px;
            /* right: 150px; */
            height: 220px;
            width: 500px;
            margin: 10px;
        }

        h3 {
            font-size: 1.6em;
        }

        p {
            font-size: 1em;
        }
    }

    @media only screen and (max-width: 600px) {
        article {
            height: 350px;
            width: 400px;
        }
        button {
            right: 5px;
        }

        h3 {
            font-size: 1.4em;
        }

        .text {
            margin: 0 10px;
        }

        p {
            font-size: 1.2em;
        }
    }

    /* @media only screen and (max-width: 500px) {
            article{
                height: 330px;
                width: 325px;
                left: 30px;
            }

            h3{
                font-size: 1.3em;
            }

            .text{
                margin: 0 10px;
            }

            p{
                font-size: 1.1em;
            }

            .continueBTN{
                font-size: 1em;
                letter-spacing: 1.5px;
            }

            .help-button{
                width: 43px;
            }
        }

        @media only screen and (max-width: 400px) {
            article{
                top: 150px;
                left: 5px;
                right: 5px;
                height: 290px;
                width: 300px;
                margin: 10px;
            }

            h3{
                font-size: 1.1em;
            }

            p{
                font-size: 0.9em;
            }

            .text{
                margin: 0 5px;
            }
        } */
</style>
