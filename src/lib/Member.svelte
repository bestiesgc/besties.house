<script>
    export let member
    let urlText
    if (member.url) {
        let urlObj = new URL(member.url)
        urlText = urlObj.hostname
        if (urlObj.pathname!=='/') urlText += urlObj.pathname
    }
</script>

<div class="member">
    <div class="member-heading dot-bg">
        <p class="member-name">{member.name}</p>
        {#if member.socials}
            <p class="member-socials">
                {#if member.socials.twitter}
                    <a href="https://twitter.com/intent/user?user_id={member.socials?.twitter}">
                        <svg class="member-social-icon" alt="Twitter" role="img" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 248 204">
                            <path fill="currentColor" d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07 7.57 1.46 15.37 1.16 22.8-.87-23.56-4.76-40.51-25.46-40.51-49.5v-.64c7.02 3.91 14.88 6.08 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71c25.64 31.55 63.47 50.73 104.08 52.76-4.07-17.54 1.49-35.92 14.61-48.25 20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26-3.77 11.69-11.66 21.62-22.2 27.93 10.01-1.18 19.79-3.86 29-7.95-6.78 10.16-15.32 19.01-25.2 26.16z"/>
                        </svg>
                    </a>
                {/if}
                {#if member.socials.mastodon}
                    <a href="{member.socials.mastodon}">
                        <svg class="member-social-icon" alt="Mastodon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 216.4144 232.00976">
                            <mask id="m-mask">
                                <rect fill="#fff" width="240" height="240" />
                                <path fill="#000" d="M177.50984 80.077v60.94125h-24.14375v-59.15c0-12.46875-5.24625-18.7975-15.74-18.7975-11.6025 0-17.4175 7.5075-17.4175 22.3525v32.37625H96.20734V85.42325c0-14.845-5.81625-22.3525-17.41875-22.3525-10.49375 0-15.74 6.32875-15.74 18.7975v59.15H38.90484V80.077c0-12.455 3.17125-22.3525 9.54125-29.675 6.56875-7.3225 15.17125-11.07625 25.85-11.07625 12.355 0 21.71125 4.74875 27.8975 14.2475l6.01375 10.08125 6.015-10.08125c6.185-9.49875 15.54125-14.2475 27.8975-14.2475 10.6775 0 19.28 3.75375 25.85 11.07625 6.36875 7.3225 9.54 17.22 9.54 29.675"/>
                            </mask>
                            <path mask="url(#m-mask)" fill="currentColor" d="M211.80734 139.0875c-3.18125 16.36625-28.4925 34.2775-57.5625 37.74875-15.15875 1.80875-30.08375 3.47125-45.99875 2.74125-26.0275-1.1925-46.565-6.2125-46.565-6.2125 0 2.53375.15625 4.94625.46875 7.2025 3.38375 25.68625 25.47 27.225 46.39125 27.9425 21.11625.7225 39.91875-5.20625 39.91875-5.20625l.8675 19.09s-14.77 7.93125-41.08125 9.39c-14.50875.7975-32.52375-.365-53.50625-5.91875C9.23234 213.82 1.40609 165.31125.20859 116.09125c-.365-14.61375-.14-28.39375-.14-39.91875 0-50.33 32.97625-65.0825 32.97625-65.0825C49.67234 3.45375 78.20359.2425 107.86484 0h.72875c29.66125.2425 58.21125 3.45375 74.8375 11.09 0 0 32.975 14.7525 32.975 65.0825 0 0 .41375 37.13375-4.59875 62.915"/>
                        </svg>
                    </a>
                {/if}
                {#if member.socials.github}
                    <a href="https://github.com/{member.socials.github}">
                        <svg class="member-social-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="1.4 1.4 33.2 33.2" enable-background="new 0 0 36 36" xml:space="preserve">
                            <path fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M18,1.4C9,1.4,1.7,8.7,1.7,17.7c0,7.2,4.7,13.3,11.1,15.5  c0.8,0.1,1.1-0.4,1.1-0.8c0-0.4,0-1.4,0-2.8c-4.5,1-5.5-2.2-5.5-2.2c-0.7-1.9-1.8-2.4-1.8-2.4c-1.5-1,0.1-1,0.1-1  c1.6,0.1,2.5,1.7,2.5,1.7c1.5,2.5,3.8,1.8,4.7,1.4c0.1-1.1,0.6-1.8,1-2.2c-3.6-0.4-7.4-1.8-7.4-8.1c0-1.8,0.6-3.2,1.7-4.4  c-0.2-0.4-0.7-2.1,0.2-4.3c0,0,1.4-0.4,4.5,1.7c1.3-0.4,2.7-0.5,4.1-0.5c1.4,0,2.8,0.2,4.1,0.5c3.1-2.1,4.5-1.7,4.5-1.7  c0.9,2.2,0.3,3.9,0.2,4.3c1,1.1,1.7,2.6,1.7,4.4c0,6.3-3.8,7.6-7.4,8c0.6,0.5,1.1,1.5,1.1,3c0,2.2,0,3.9,0,4.5  c0,0.4,0.3,0.9,1.1,0.8c6.5-2.2,11.1-8.3,11.1-15.5C34.3,8.7,27,1.4,18,1.4z"/>
                        </svg>
                    </a>
                {/if}
                {#if member.socials.lastfm}
                    <a href="https://last.fm/user/{member.socials.lastfm}">
                        <svg class="member-social-icon" alt="Last.fm" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M225.8 367.1l-18.8-51s-30.5 34-76.2 34c-40.5 0-69.2-35.2-69.2-91.5 0-72.1 36.4-97.9 72.1-97.9 66.5 0 74.8 53.3 100.9 134.9 18.8 56.9 54 102.6 155.4 102.6 72.7 0 122-22.3 122-80.9 0-72.9-62.7-80.6-115-92.1-25.8-5.9-33.4-16.4-33.4-34 0-19.9 15.8-31.7 41.6-31.7 28.2 0 43.4 10.6 45.7 35.8l58.6-7c-4.7-52.8-41.1-74.5-100.9-74.5-52.8 0-104.4 19.9-104.4 83.9 0 39.9 19.4 65.1 68 76.8 44.9 10.6 79.8 13.8 79.8 45.7 0 21.7-21.1 30.5-61 30.5-59.2 0-83.9-31.1-97.9-73.9-32-96.8-43.6-163-161.3-163C45.7 113.8 0 168.3 0 261c0 89.1 45.7 137.2 127.9 137.2 66.2 0 97.9-31.1 97.9-31.1z"/></svg>
                    </a>
                {/if}
            </p>
        {/if}
    </div>
    <div class="member-meta">
        <p class="member-meta-item-list">
            {#if member.url}
                <a class="member-meta-item member-link" href="{member.url}">
                    <span class="material-icons">
                        launch
                    </span> {urlText}
                </a>
            {/if}
            {#if member.email}
                <a class="member-meta-item member-email" href="mailto:{member.email}">
                    <span class="material-icons">
                        mail
                    </span> {member.email}
                </a>
            {/if}
            {#if member.pronouns}
                <p class="member-meta-item member-pronouns">
                    <span class="material-icons">
                        person
                    </span> {member.pronouns}
                </p>
            {/if}
        </p>
        {#if member.bio}
            <p class="member-bio">
                {member.bio}
                <span class="member-bio-icon material-icons">
                    format_quote
                </span>
            </p>
        {/if}
    </div>
</div>