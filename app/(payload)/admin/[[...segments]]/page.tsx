import type { Metadata } from 'next'
import type { ImportMap } from 'payload'
import configPromise from '@payload-config'
import { RootPage, generatePageMetadata } from '@payloadcms/next/views'

type Args = {
  params: Promise<{ segments?: string[] }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const importMap: ImportMap = {}

export async function generateMetadata({ params, searchParams }: Args): Promise<Metadata> {
  const routeParams = params.then((p) => ({ segments: p.segments ?? [] }))
  return generatePageMetadata({
    config: configPromise,
    params: routeParams,
    searchParams: searchParams as Promise<Record<string, string | string[]>>,
  })
}

export default function AdminPage({ params, searchParams }: Args) {
  const routeParams = params.then((p) => ({ segments: p.segments ?? [] }))
  return RootPage({
    config: configPromise,
    importMap,
    params: routeParams,
    searchParams: searchParams as Promise<Record<string, string | string[]>>,
  })
}
