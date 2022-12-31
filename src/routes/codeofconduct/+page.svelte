<script>
    import { members, channels, makeChannelObj } from '$lib/guild-data.js'
    import FakeDiscordApp from '$lib/FakeDiscordApp.svelte'
    import { onMount } from 'svelte'
    let channel = makeChannelObj('codeofconduct')
    channel.messages = channel.messages
	channel.addMessage({
		author: 'hazycora',
		content: 'this channel is 100% serious',
		time: 1666060380630
	})
	channel.addMessage({
		author: 'cup',
		content: 'ok leaving channel then',
		time: 1666060380630
	})
	channel.addMessage({
		author: 'hazycora',
		content: 'rule #1: gay',
		time: 1666060380630
	})
	channel.addMessage({
		author: 'aria',
		content: 'rule #2: tranz',
		time: 1666060380630
	})
	channel.addMessage({
		author: 'hazycora',
		content: 'rule #3 if anyone suddenly dies under weird circumstances hazy didnt do anything hazy isnt involved please dont tell anyone that hazys a suspect hazy didnt do anything',
		time: 1666060490630
	})
	channel.addMessage({
		author: 'aria',
		content: 'rule #3b aria too :3',
		time: 1666060490630
	})
	channel.addMessage({
		author: 'hazycora',
		content: 'rule #4:\n:3',
		time: 1666060490630
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