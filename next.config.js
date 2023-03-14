
module.exports =  {
  reactStrictMode: true,
  env: {
    COM_PRIVATE_KEY: '2QJa67m69HScAviGaQ1jYDj1UP8JpZmHFpygRZhg8BGEPboKx6vLHqNeBAN4yF3cMKXw5Zxem4EeAzvjJiVRtStk',
    TABLE_1_REDIRECT : 'solana:GTeXq3V35wVvnyZVrewkY4gPWw6JgkrH7cEbCQgPuMXz?amount=1&label=RPS%3A+Table+-+1&message=Thanks+for+your+order'

  },
},

{
  async redirects() {
    return [
      {
        source: '/createQR',
        destination: 'solana:GTeXq3V35wVvnyZVrewkY4gPWw6JgkrH7cEbCQgPuMXz?amount=1&label=RPS%3A+Table+-+1&message=Thanks+for+your+order',
        permanent: true,
      },
    ]
  },
}
