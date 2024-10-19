<script>
	import members from '$lib/data/members.js'
	import roles from '$lib/data/roles.js'
	import MemberGroup from '$lib/MemberGroup.svelte'

	function separateGroups() {
		let groups = {}
		let others = []
		for (const member of members) {
			let highestSeparateRole
			for (const role of member.roles) {
				if (!roles[role]?.showSeparately) continue
				highestSeparateRole = role
				break
			}
			if (!highestSeparateRole) {
				others.push(member)
				continue
			}
			if (!groups[highestSeparateRole]) {
				groups[highestSeparateRole] = {
					...roles[highestSeparateRole],
					members: []
				}
			}
			groups[highestSeparateRole].members.push(member)
		}
		return [others, groups]
	}
	let [others, memberGroups] = separateGroups()
</script>

<div class="member-list-wrapper">
	<MemberGroup group={{ hideName: true, members: others }} />
	{#each Object.values(memberGroups) as group}
		<MemberGroup {group} />
	{/each}
</div>

<style lang="postcss">
	.member-list-wrapper {
		width: 100%;
		display: grid;
		gap: 2rem;
		overflow-y: hidden;
	}
</style>
