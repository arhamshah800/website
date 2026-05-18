import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

// ── Auth check endpoint ──
// Used by the frontend admin bar to determine if the current visitor
// is logged into Payload CMS (has a valid auth token cookie).

export async function GET() {
  try {
    const headersList = await headers()
    const cookie = headersList.get('cookie') ?? ''

    // Payload stores the auth token in the payload-token cookie
    const hasPayloadToken = cookie.includes('payload-token=')

    return NextResponse.json({ loggedIn: hasPayloadToken })
  } catch {
    return NextResponse.json({ loggedIn: false })
  }
}
