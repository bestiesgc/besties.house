<svelte:head>
    <title>besties lore</title>
    
    <meta name="title" content="besties lore">
    <meta name="description" content="the sacred texts">

    <meta property="og:type" content="website">
    <meta property="og:url" content="https://besties.house/">
    <meta property="og:title" content="besties lore">
    <meta property="og:description" content="the sacred texts">
    <meta property="og:image" content="https://besties.house/besties-thumb.png">

    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://besties.house/">
    <meta property="twitter:title" content="besties lore">
    <meta property="twitter:description" content="the sacred texts">
    <meta property="twitter:image" content="https://besties.house/besties-thumb.png">
</svelte:head>

<div class="page">
    <nav>
        <div class="nav-inner">
            <a href="/">
                <p class="besties-heading">besties</p>
            </a>
        </div>
    </nav>

    <div class="section">
        <div class="section-inner real-paragraphs">
            <h2>besties lore</h2>
            <p>
                Besties' origins are in a group chat from mid-to-late 2020. The members had met in a Discord
                server, and it was suggested that a group chat could be made, as this way they would receive
                notifications for the messages sent more easily.
                This group chat was renamed multiple times, but the longest running name was Teen Bible Study.
                In early 2021, due to drama, the group chat was broken off into another.
                Soon after, though, this new group chat regained all the members of the original.
                In March of 2021, this group chat was renamed "besties".
            </p>
            <p>
                Though the group switched between different chats over time, on multiple platforms,
                the group kept <em>most</em> of the original members through this time.
                In September of 2021, Besties was moved to a Discord server.
                In November of 2021, Discord's CEO
                <a href="https://twitter.com/jasoncitron/status/1457841222995693570">announced in a Tweet</a>
                an integration with the Ethereum cryptocurrency used for NFTs. Besties,
                opposed to NFTs for their impact on the environment and for their use in
                scamming people who don't understand the technology, moved to the federated
                <a href="https://matrix.org/">Matrix messaging protocol</a>.
            </p>
            <p>
                Discord cancelled the integration soon after, but the group remained on Matrix for
                the privacy benefits of the encrypted, decentralised platform. Eventually, though,
                Hazy was forced to stop hosting her Matrix server, giving her no choice but to abandon
                her Matrix account. Quickly after, the group moved back to Discord. Hazy moved to a public Matrix server
                rather than her own so that she could continue to use Matrix, but as everyone had
                moved away from Matrix, she didn't get much use out of this new account. A Discord
                bot was used for some time to bridge the Discord server to Matrix, and the Matrix
                chat to the Discord server.
            </p>
            <p>
                For most of 2022, the group remained in the Discord server. In the second half of the
                year, some tension had started with another member due to their disrespect of others.
                This came to a peak in October, when Hazy left the server to no longer have to interact
                with the person, as they were making the group feel uncomfortable to participate in.
                That day, Quinn suggested to Hazy that the group start fresh with a new server, with no
                tolerance for the toxicity that had become so normal by the end of the previous Besties server.
                This new server would exclude the member who had caused the tension in the previous one.
                The act of making this new server to replace the old one is referred to by Hazy as the hostile takeover,
                to make light of the situation, as it was genuinely upsetting to need to start fresh.
            </p>
            <p>
                In search of a name for the new group, Quinn suggested UCB, standing for the United Coalition of Besties.
                The UCB includes a few of the members from the previous generations of Besties, along with
                multiple additions.
            </p>
        </div>
    </div>

</div>

<style>
    @keyframes blur {
        0% {
            background-color: black;
            /* rotateZ(-20deg) */
            transform: rotate3d(1, 1, -1, 80deg);
            filter: blur(10px) brightness(5) hue-rotate(-43deg);
        }

        50% {
            background-color: black;
            /* rotateZ(-20deg) */
            filter: blur(12px) brightness(8) hue-rotate(-21deg);
        }
        100% {
            background-color: transparent;
        }
    }
    .section-inner {
        background-color: black;
        overflow: hidden;
        animation: 4s blur forwards ease-in-out;
    }
</style>