<script>
    import { members, channels, makeChannelObj } from '$lib/guild-data.js'
    import FakeDiscordApp from '$lib/FakeDiscordApp.svelte'
	const splashes = [
        'first unionised group chat of all time',
        'x3',
        'hope you like amateur web design',
        'Just a glimpse into my dark reality. A full stare would make most simply go insane lmao',
        'the radical left, the marxists, the anarchists, the agitators, the looters,',
        'reality surf x3',
        'if i post pics u gotta like it',
        'delete my fcking socials idc anymore',
        'world record for most brainrot',
        'def a little stupid. at least a little',
        'gluten-free antifa caramel',
        '"did you just try to ratio me?"',
        '"Is that why you\'re so weird and strange?"',
        'b*tch huh i love bugs',
        '"i want to block you for this message"',
        'i tested positive for being all tuckered out',
        'i know this pic can get 100 likes',
        'hyperpop on soundcloud',
        'talking to strangers online was the best decision i ever made',
        'comic sans is aweosme',
        'my clique got me for life'
    ]
    let channel = makeChannelObj('about', (newChannel => channel=newChannel))
    channel.addMessage({
        author: 'hazycora',
        content: ``,
        attachments: [
            {
                type: 'img',
                url: '/besties-thumb.png',
                alt: 'Thumbnail for Besties'
            }
        ],
        time: 1672415395766
    })
    channel.addMessage({
        author: 'hazycora',
        content: `**besties.house** - "${splashes[Math.round(Math.random()*(splashes.length-1))]}"\n` +
        `**Our Twitter:** https://twitter.com/twtbesties\n**Our services:**\nMastodon instance - https://fuckgov.org\nFile storage - https://files.gay\nGitea - https://git.gay`,
        time: 1672415395766
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