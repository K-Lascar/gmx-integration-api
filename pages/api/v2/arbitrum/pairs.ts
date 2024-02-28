import { NextApiRequest, NextApiResponse } from 'next'
import { ARBITRUM } from '../../../../config/constants'
import { getPerpetualMetadata } from '../../../../utils/synthetics/getPerpetualMetadata'

async function handleRequest(req: NextApiRequest, res: NextApiResponse) {
  const currentNetwork = ARBITRUM
  try {
    const perpetualPairs = await getPerpetualMetadata(currentNetwork)

    // @ts-ignore
    res.status(200).json(perpetualPairs)
  } catch (error) {
    console.error('GraphQL request failed:', error)
    res.status(500).json({ error: 'An error occurred while fetching data' })
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    await handleRequest(req, res)
  } else {
    res.status(405).end('Method not allowed')
  }
}
