<script>
    import GlitchyBg from '$lib/GlitchyBg.svelte'
    import MemberGroup from '$lib/MemberGroup.svelte'
    import RandomMessage from '$lib/RandomMessage.svelte'
    const memberGroups = [
        {
            name: 'teen bible study',
            members: [
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
                }
            ]
        },
        {
            name: 'childrens church',
            style: `font-family: 'Comic Sans MS', var(--font-family);`,
            subtitles: [
                `Gamers Against Ninja`,
                `Left Twix > Right Twix`,
                `Hazy is a Dictator please help`,
                `Jesus isn’t real`,
                `i’m silly i’m silly i’m silly`,
                `my head hurts`,
                `oh my god just shut the fuck up`,
                `Middle Schoolers`,
                `7th graders are dumb`,
                `IM NORMAL IM NORMAL IM NORMAL IM NORMAL IM NORMAL IM NORMAL IM NORMAL `,
                `80k reddit karma and counting`,
                `:( `,
                `the fuck are you doing?`,
                `We live in misery…`,
                `god is dead and i killed him`,
                `skill issue`,
                `no comment`,
                `The Funny Ones`,
                `Teen Bible Study, more like, uhh, DUMB.`,
                `Besties is a terrible group chat name. I don’t like it.`,
                `:3`,
                `Nya!~`,
                `i’m doing the best i can`,
                `Hazy filtered out all the funny subtitles :(`,
                `They are holding us in cages in Antarctica`,
                `Interact with caution`,
                `Who is Cup?`,
                `Thats a subtitle its funny dont delete it hazy (this is also a subtitle)`,
                `We love Jesus`,
                `h is a bad letter`,
                `reduce your expectations to zero`,
                `Geoff Keighley from The Game Awards is in your walls`,
                `Oops! I ruined my life`,
                `I AM THE ANTICHRIST I AM THE ANTICHRIST I AM THE ANTICHRIST`,
                `loud != funny`,
                `Hazy is the antichrist (SOS, PLEASE SEND HELP)`,
                `We do not stand with Kanye West, at all, but he does have a few bangers`,
                `Cool Person#0001 on discord wants money please send her money`,
                `We do not stand with Kanye West, at all, but he made Graduation`,
                `“Gay” /pos`,
                `“Straight” /neg`,
                `i love taking advantage of my drunken father`,
                `My parents hide the weed from me`
            ],
            members: [
                {
                    name: 'cup',
                    socials: {
                        twitter: '1576737284992409601',
                        mastodon: 'https://fuckgov.org/web/@cup'
                    },
                    email: 'cuptwt@gmail.com',
                    pronouns: 'she/her',
                    bio: '13 year old andrew tate fangirl... interact with caution...'
                },
                {
                    name: 'ultra',
                    socials: {
                        twitter: '1580957316077215750'
                    },
                    pronouns: 'he/him',
                    bio: '(probably) breathing right now'
                }
            ]
        }
    ]
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
            <RandomMessage on:update-message={handleRandomMessageUpdate} class="besties-splash" messages={splashes}></RandomMessage>
        </div>

        <div class="members">
            <div class="member-list-wrapper">
                {#each memberGroups as group}
                    <MemberGroup {group}></MemberGroup>
                {/each}
            </div>
        </div>
    </div>

</div>
