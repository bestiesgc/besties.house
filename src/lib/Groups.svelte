<script>
	import { members, roles } from '$lib/data.js'
	import MemberGroup from '$lib/MemberGroup.svelte'
	let memberGroups = {}
	for (const roleId of Object.keys(roles)) {
		if (!roles[roleId].showSeparately) continue
		memberGroups[roleId] = {
			...roles[roleId],
			members: members.filter(member => member.roles.includes(roleId))
		}
	}
	memberGroups = memberGroups
</script>

<div class="member-list-wrapper">
	{#each Object.values(memberGroups) as group}
		<MemberGroup {group} />
	{/each}
</div>

<style lang="postcss">
	.member-list-wrapper {
		width: 100%;
		min-height: var(--member-list-min-height);
		display: grid;
		gap: 2rem;
		overflow-y: hidden;
	}
</style>
