
<script>

let context

    const background = async () => {
        const width = 2400
        const height = 720

        let image = "/images/temporaryBG.svg"
        let speed = 7

        let x = 0
        let y = 0

       
        try {
            context = canvas.getContext('2d')
            context.drawImage(image, x, y, width, height)
            // context.drawImage(image, y, x + width - speed, height)
            // update({

            // })
        } catch (error) {
            console.log(error)
        }
    }

</script>

<!-- <img src="/images/temporaryBG.svg" class="bg-loop" alt="background"/> -->
<img src="/images/temporaryBG.svg" class="bg-loop" alt="background"/> 
<!-- <canvas bind:this={context}></canvas> -->

<style>
    .bg-loop{
	background: url(../images/temporaryBG.svg) no-repeat;
	/* background-attachment: fixed; */
	/* background-size: cover;	 */
	/* height: 720px;
    width: 5000px; */
	/* height: calc(100vh + 100px); */
	/* width: 5076px;  */
    position: absolute;
    z-index: -1;
    display: flex;
    flex-direction: row;
    }
</style>