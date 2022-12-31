<script>
    import Member from '$lib/Member.svelte'
    export let members
    let groups = {}
    for (let member of members) {
        if (!groups[member.group]) {
            groups[member.group] = {
                name: member.group,
                members: []
            }
        }
        groups[member.group].members.push(member)
    }
</script>

{#each Object.keys(groups) as groupName}
    <div class="member-group">
        <ul aria-labelledby="member-group_{btoa(groupName)}">
            <h3 id="member-group_{btoa(groupName)}">
                <span class="screen-reader-only">{groupName} - {groups[groupName].members.length} members</span>
                <div class="member-group-label" aria-hidden="true">{groups[groupName].name} — {groups[groupName].members.length}</div>
            </h3>
            {#each groups[groupName].members as member}
                <Member {member}></Member>
            {/each}
        </ul>
    </div>
{/each}