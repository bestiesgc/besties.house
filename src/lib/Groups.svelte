<script>
	import { members, roles } from '$lib/data.js'
	import MemberGroup from '$lib/MemberGroup.svelte'
	let memberGroups = {}
	// a copy for editing
	let membersWork = members
	for (const roleId of Object.keys(roles)) {
		let theRest = []
		if (!roles[roleId].showSeparately) continue
		memberGroups[roleId] = {
			...roles[roleId],
			members: membersWork.filter(member => {
				if (!member.roles.includes(roleId)) {
					theRest.push(member)
					return false
				}
				return true
			})
		}
		membersWork = theRest
	}
	memberGroups = memberGroups
</script>

<div class="member-list-wrapper">
	<MemberGroup group={{ hideName: true, members: membersWork }} />
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
