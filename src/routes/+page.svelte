<script>
    import GlitchyBg from '$lib/GlitchyBg.svelte'
    import Member from '$lib/Member.svelte'
    import RandomMessage from '$lib/RandomMessage.svelte'
    const members = [
        {
            name: 'quinn',
            socials: {
                twitter: '1528596604940341250'
            },
            pronouns: 'she/they',
            email: 'quinn@besties.house',
            bio: 'fucked up loser'
        },
        {
            name: 'hazycora',
            socials: {
                twitter: '1021804959703212034'
            },
            pronouns: 'she/her',
            email: 'hazy@besties.house',
            url: 'https://hazy.gay',
            bio: 'im cute'
        },
        {
            name: 'aria',
            socials: {
                twitter: '1450703231642972161',
                mastodon: 'https://fuckgov.org/web/@a',
                lastfm: 'tacohitbox'
            },
            pronouns: 'she/it',
            email: 'aria@besties.house',
            url: 'https://tacohitbox.com',
            bio: 'weezer enjoyer, bad webdev'
        },
        {
            name: 'luna',
            socials: {
                twitter: '765711397820989440'
            },
            pronouns: 'she/her',
            bio: 'hamburger'
        },
        {
            name: 'cup',
            socials: {
                twitter: '1576737284992409601',
                mastodon: 'https://fuckgov.org/web/@cup'
            },
            email: 'cuptwt@gmail.com',
            pronouns: 'she/her',
            bio: '13 year old andrew tate fangirl... interact with caution...'
        }
    ]
    let splashes = [
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
        'talking to strangers online was the best decision i ever made'
    ]
    function handleRandomMessageUpdate(e) {
        document.title = `besties - ${e.detail.text}`
    }
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

<div class="page">
    <div class="main-wrapper">
    <div class="hero">
        <GlitchyBg></GlitchyBg>
        <h1 class="besties-heading">besties</h1>
        <RandomMessage class="besties-splash" messages={splashes} on:update-message={handleRandomMessageUpdate}></RandomMessage>
    </div>
    
    <div class="members">
        <div class="member-list-wrapper">
            <div class="member-list">
                {#each members as member}
                    <Member {member}></Member>
                {/each}
                </div>
            </div>
        </div>
    </div>

</div>