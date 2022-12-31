<script>
    import { members, channels, makeChannelObj } from '$lib/guild-data.js'
    import messageStories from '$lib/stories.js'
    import FakeDiscordApp from '$lib/FakeDiscordApp.svelte'
	import { beforeNavigate } from '$app/navigation'
    import { onMount } from 'svelte'
    let channel = makeChannelObj('genderal', (newChannel => channel=newChannel))
    
    function shuffleArray(array) {
        let currentIndex = array.length,  randomIndex

        // While there remain elements to shuffle.
        while (currentIndex != 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]
            ]
        }

        return array
    }

    let doneTelling = false

    beforeNavigate((e) => {
        doneTelling = true
    })
    
    onMount(async () => {
        async function tellAllStories(shuffled) {
            let story
            for (let e = 0; e < shuffled.length; e ++) {
                if (story===shuffled[e]) continue
                story = shuffled[e]
                for (let i in shuffled[e]) {
                    if (i>0&&story[i-1].author!==story[i].author) {
                        await new Promise(r => setTimeout(r, Math.random()*200+1200))
                    } else {
                        await new Promise(r => setTimeout(r, Math.random()*200+400))
                    }
                    if (doneTelling) return
                    channel.addMessage(story[i])
                    // channel.messages = channel.messages
                }
                await new Promise(r => setTimeout(r, Math.random()*8000+6200))
            }
            let lastStory = shuffled[shuffled.length-1]
            shuffled = shuffleArray(shuffled)
            if (shuffled[0]===lastStory) {
                shuffled = shuffled.slice(1)
                shuffled.splice(Math.round(Math.random()*(shuffled.length-2))+1, 0, lastStory)
            }
            tellAllStories(shuffled)
        }
        tellAllStories(shuffleArray(messageStories))
        return e => doneTelling = true
    })
</script>

<svelte:head>
    <title>besties</title>

    <meta name="title" content="besties">
    <meta name="description" content="the radical left, the marxists, the anarchists, the agitators, the looters,">

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://besties.house/">
    <meta property="og:title" content="besties">
    <meta property="og:description" content="the radical left, the marxists, the anarchists, the agitators, the looters,">
    <meta property="og:image" content="https://besties.house/besties-thumb.png">

    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://besties.house/">
    <meta property="twitter:title" content="besties">
    <meta property="twitter:description" content="the radical left, the marxists, the anarchists, the agitators, the looters,">
    <meta property="twitter:image" content="https://besties.house/besties-thumb.png">
</svelte:head>

<FakeDiscordApp {members} {channel} {channels}></FakeDiscordApp>