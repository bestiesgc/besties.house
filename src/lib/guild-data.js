export const members = [
	{
		name: 'hazycora',
		socials: {
			twitter: '1021804959703212034'
		},
		// style: 'background-image: radial-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url("/noise.gif"); background-attachment: fixed;',
		group: 'teen bible study',
		avatar: '/avatars/hazycora.webp',
		color: '#ff36ed',
		pronouns: 'she/her',
		email: 'hazy@besties.house',
		url: 'https://hazy.gay',
		bio: 'im cute'
	},
	{
		name: 'quinn',
		socials: {
			twitter: '1528596604940341250'
		},
		group: 'teen bible study',
		avatar: '/avatars/quinn.webp',
		color: '#2ecc71',
		pronouns: 'she/they',
		email: 'quinn@besties.house',
		bio: 'fucked up loser'
	},
	{
		name: 'aria',
		socials: {
			twitter: '1450703231642972161',
			mastodon: 'https://fuckgov.org/web/@a',
			lastfm: 'tacohitbox'
		},
		group: 'teen bible study',
		avatar: '/avatars/aria.webp',
		color: '#33b2e7',
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
		group: 'teen bible study',
		avatar: '/avatars/luna.webp',
		color: '#71368a',
		pronouns: 'she/her',
		bio: 'hamburger'
	},
	{
		name: 'the proletariat',
		group: 'childrens church',
		avatar: '/avatars/proletariat.webp',
		color: '#71368a',
		pronouns: 'she/her',
		bio: `hello 👋



		goodbye 👋`
	},
	{
		name: 'ultra',
		socials: {
			twitter: '1580957316077215750'
		},
		group: 'childrens church',
		avatar: '/avatars/ultra.webp',
		color: '#206694',
		pronouns: 'he/him',
		bio: '(probably) breathing right now'
	},
	{
		name: 'cup',
		socials: {
			twitter: '1576737284992409601'
		},
		group: 'purgatory',
		avatar: '/avatars/cup.webp',
		color: '#e74c3c',
		pronouns: 'nor/mal',
		bio: [
			'Loser',
			'Cool'
		]
	}
]
export const channels = [
	{
		name: 'codeofconduct',
		path: '/codeofconduct',
	},
	{
		name: 'about',
		path: '/'
	},
	{
		name: 'text channels',
		group: true,
		channels: [
			{
				name: 'genderal',
				path: '/genderal',
			}
		]
	}
]
export function makeChannelObj(name) {
	let messages = []
	return {
		name: name,
		messages: messages,
		addMessage: function (message) {
			message = Object.assign({}, message)
			if (typeof(message.author)=='string') message.author = members.find(e => e.name===message.author)??{
				name: message.author,
				color: '#ffffff'
			}
			if (!message.time) message.time = Date.now()
			messages[messages.length] = message
		}
	}
}