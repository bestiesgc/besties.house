<script>
    export let member
    import MemberPopout from '$lib/MemberPopout.svelte'
    let popoutOpen = false
    function onMemberClick() {
        popoutOpen = !popoutOpen
    }
    let fromElement
</script>

<button on:click={onMemberClick} bind:this={fromElement} class="member-item-wrapper" style={member.style||null}>
    <div class="member-item">
        <div style:background-color={member.color} class="member-avatar" aria-hidden="true">
            {#if member.avatar}
                <img src="{member.avatar}" alt="">
            {/if}
        </div>
        <div class="member-content">
            <div class="member-name" style:color={member.color}>{member.name}</div>
            {#if member.status}
                <div class="member-status">{member.status}</div>
            {/if}
        </div>
    </div>
    {#if popoutOpen}
        <MemberPopout {member} on:clickout={e=>popoutOpen=false} dontClickOut={fromElement}></MemberPopout>
    {/if}
</button>