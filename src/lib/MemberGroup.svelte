<script>
    import Member from '$lib/Member.svelte'
    import RandomMessage from '$lib/RandomMessage.svelte'
    export let group
</script>

<div class="member-group" style="{group.style}">
    {#if !group.hideName}
        <h2 class="member-group-title">{group.name}</h2>
        {#if group.subtitles}
            <RandomMessage class="member-group-subtitles" messages={group.subtitles}></RandomMessage>
        {/if}
    {/if}
    <div class="member-list">
        {#each group.members as member}
            <Member {member}></Member>
        {/each}
    </div>
</div>